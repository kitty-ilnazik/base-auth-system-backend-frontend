from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.database.models import User


class UserSchema(BaseModel):
    username: str
    first_name: str
    last_name: str | None
    phone_number: str | None
    email: str
    photo_url: str | None
    role: str
    new_user: bool
    created_at: datetime
    update_at: datetime

    @classmethod
    def from_models(cls, user: User) -> "UserSchema":
        return cls(
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            phone_number=user.phone_number,
            email=user.email,
            photo_url=user.photo_url,
            role=user.role,
            new_user=user.new_user,
            created_at=user.created_at,
            update_at=user.update_at,
        ).model_dump()


class UserCreateSchema(BaseModel):
    username: str
    first_name: str
    last_name: Optional[str] = None
    email: str
    password: str
    phone_number: Optional[str] = None
    photo_url: Optional[str] = None