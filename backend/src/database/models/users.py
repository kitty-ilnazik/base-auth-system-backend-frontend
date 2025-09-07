from os import urandom
from datetime import datetime
from base64 import urlsafe_b64encode

from sqlalchemy import DateTime, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.fernet import Fernet

from src.database.base import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[str] = mapped_column(String(32), nullable=False)

    username: Mapped[str] = mapped_column(String(32), nullable=False)
    first_name: Mapped[str] = mapped_column(String(32), nullable=False)
    last_name: Mapped[str] = mapped_column(String(32), nullable=True)

    phone_number: Mapped[str] = mapped_column(String(15), nullable=True)
    email: Mapped[str] = mapped_column(String(64), nullable=False)

    password: Mapped[str] = mapped_column(String(512), nullable=False)
    salt: Mapped[str] = mapped_column(String(64), nullable=False)

    photo_url: Mapped[str] = mapped_column(String(268), nullable=True)
    role: Mapped[str] = mapped_column(String(32), default="user", nullable=False)
    new_user: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    update_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, nullable=False)


    def _get_fernet(self, secret_key: bytes) -> Fernet:
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=self.salt.encode("utf-8"),
            iterations=390000,
            backend=default_backend()
        )
        key = urlsafe_b64encode(kdf.derive(secret_key))
        return Fernet(key)


    def set_password(self, password: str, secret_key: bytes) -> None:
        if not getattr(self, "salt", None):
            self.salt = urlsafe_b64encode(urandom(16)).decode("utf-8")

        f = self._get_fernet(secret_key)
        self.password = f.encrypt(password.encode("utf-8")).decode("utf-8")


    def get_password(self, secret_key: bytes) -> str:
        f = self._get_fernet(secret_key)
        return f.decrypt(self.password.encode("utf-8")).decode("utf-8")