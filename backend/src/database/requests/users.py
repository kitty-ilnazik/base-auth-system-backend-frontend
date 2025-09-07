from uuid import uuid4

from sqlalchemy import select

from src.database import async_session
from src.database.models import User
from src.database.schemas import UserCreateSchema

from src.config import settings


async def get_user(user_id: str) -> User:
    async with async_session() as session:
        return await session.scalar(select(User).where(User.user_id == user_id))


async def get_users() -> list[User]:
    async with async_session() as session:
        return await session.scalars(select(User))


async def create_user(user_data: UserCreateSchema) -> None:
    async with async_session() as session:
        user_dict = user_data.dict(exclude={"password"})
        user = User(user_id=str(uuid4()), **user_dict)
        user.set_password(user_data.password, settings.SECRET_KEY_PASSWORD.get_secret_value().encode('utf-8'))
        session.add(user)
        await session.commit()
        await session.refresh(user)


async def update_new_user_flag(user_id: str, new_user: bool = False) -> None:
    async with async_session() as session:
        user = await session.scalar(select(User).where(User.user_id == user_id))
        if user:
            user.new_user = new_user
            await session.commit()