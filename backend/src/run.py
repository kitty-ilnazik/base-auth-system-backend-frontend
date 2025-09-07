import uvicorn

from src.config import settings


def start() -> None:
    uvicorn.run(
        "src.app:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=settings.APP_RELOAD
    )

if __name__ == "__main__":
    start()