import logging

from src.config import settings

logging.basicConfig(
    level=settings.LOG_LEVEL,
    format=settings.LOG_FORMAT,
    datefmt=settings.LOG_DATE_FORMAT,
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(settings.LOG_FILE, encoding='utf-8')
    ]
)


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(name)