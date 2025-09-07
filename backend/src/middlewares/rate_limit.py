import time
import uuid

from fastapi import Request

from starlette.middleware.base import BaseHTTPMiddleware

from redis.asyncio import from_url

from src.config import settings
from src.utils.exceptions import too_many_requests_exception

IGNORED_PATHS = {"/", "/docs", "/versions", "/webhook", "/openapi.json"}


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(
        self, app,
        redis_url: str = f"redis://{settings.REDS_HOST}:{settings.REDS_PORT}",
        max_requests: int = 300,
        window_seconds: int = 600,
        ban_seconds: int = 1800
    ):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.ban_seconds = ban_seconds
        self.redis = from_url(redis_url, decode_responses=True)


    async def dispatch(self, request: Request, call_next):
        if request.url.path in IGNORED_PATHS:
            return await call_next(request)

        ip = request.client.host
        now = int(time.time())

        ban_key = f"ban:{ip}"
        requests_key = f"req:{ip}"

        ban_until = await self.redis.get(ban_key)
        if ban_until and int(ban_until) > now:
            return too_many_requests_exception(
                f"You are banned for {int(ban_until) - now} more seconds"
            )

        async with self.redis.pipeline(transaction=True) as pipe:
            pipe.zremrangebyscore(requests_key, 0, now - self.window_seconds)
            pipe.zcard(requests_key)
            _, count = await pipe.execute()

        await self.redis.zadd(requests_key, {f"{now}:{uuid.uuid4()}": now})
        await self.redis.expire(requests_key, self.window_seconds)

        if count + 1 > self.max_requests:
            await self.redis.set(ban_key, now + self.ban_seconds, ex=self.ban_seconds)
            await self.redis.delete(requests_key)
            return too_many_requests_exception(
                f"Rate limit exceeded. You are banned for {self.ban_seconds // 60} minutes."
            )
        return await call_next(request)


class SingleRequestMiddleware(BaseHTTPMiddleware):
    def __init__(
        self, app,
        redis_url: str = f"redis://{settings.REDS_HOST}:{settings.REDS_PORT}",
        short_window_seconds: int = 2
    ):
        super().__init__(app)
        self.short_window_seconds = short_window_seconds
        self.redis = from_url(redis_url, decode_responses=True)


    async def dispatch(self, request: Request, call_next):
        if request.url.path in IGNORED_PATHS:
            return await call_next(request)

        ip = request.client.host
        now = int(time.time())

        ban_key = f"ban:{ip}"
        key = f"req_once:{ip}:{request.url.path}:{str(request.query_params)}"

        ban_until = await self.redis.get(ban_key)
        if ban_until and int(ban_until) > now:
            return too_many_requests_exception(
                f"You are banned for {int(ban_until) - now} more seconds"
            )

        exists = await self.redis.get(key)
        if exists:
            return too_many_requests_exception(
                f"You can make this request only once every {self.short_window_seconds} seconds"
            )

        await self.redis.set(key, 1, ex=self.short_window_seconds)
        return await call_next(request)