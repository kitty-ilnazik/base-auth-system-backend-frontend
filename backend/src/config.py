from datetime import datetime
from pathlib import Path

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).parent.parent
ENV_FILE = ROOT_DIR / "src" / ".env"
LOGS_DIR = ROOT_DIR / "logs"

now = datetime.now().replace(microsecond=0)
log_filename_time = now.strftime("%Y-%m-%d_%H-%M-%S")

if not ENV_FILE.exists():
    raise FileNotFoundError(f".env file not found at: {ENV_FILE}")

if not LOGS_DIR.exists():
    LOGS_DIR.mkdir(parents=True, exist_ok=True)


class Settings(BaseSettings):
    SECRET_KEY_PASSWORD: SecretStr
    SECRET_KEY_JWT: SecretStr

    DB_URL: SecretStr

    REDS_HOST: str = "localhost"
    REDS_PORT: int = 6379

    WEBHOOK_URL: str = "https://qxv6w4-178-206-178-202.ru.tuna.am"
    WEBAPP_URL: str = "https://qxv6w4-178-206-178-202.ru.tuna.am"

    APP_HOST: str = "127.0.0.1"
    APP_PORT: int = 8000
    APP_RELOAD: bool = False

    API_TITLE: str = "Cloud-BuildX Backend API"
    API_DESCRIPTION: str = "Cloud-BuildX Backend is an asynchronous service that builds projects in the cloud and deploys them to a server or hosting."
    API_VERSION: str = "v0.1.0-beta"

    API_VERSIONS: list[dict] = [
        {
            "version": "v1",
            "status": "current",
            "release_date": "03.07.2025",
            "description": "Current stable version of the API",
            "changes": []
        }
    ]

    NAME_PROJECT: str = "Cloud BuildX"
    DEVELOPER_URL: str = "@Kitty_Ilnazik"
    GITHUB_URL: str = "https://github.com/Cloud-BuildX"

    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - [%(levelname)s] - %(name)s: %(message)s"
    LOG_DATE_FORMAT: str = "%d.%m.%Y %H:%M:%S"
    LOG_FILE: Path = LOGS_DIR / f"app_{log_filename_time}.log"

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8"
    )


settings = Settings()