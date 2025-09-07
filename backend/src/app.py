from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database import init_db, close_db

from src.api import setup_api_router
from src.config import settings


async def lifespan(app: FastAPI) -> AsyncGenerator:
    await init_db()
    yield
    await close_db()


app = FastAPI(
    lifespan=lifespan,
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION
)
api_router = setup_api_router()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)