from typing import TypeVar, Generic
from pydantic import BaseModel, Field, field_validator

T = TypeVar("T")
E = TypeVar("E")

class Result(Generic[T, E]):
    def __init__(self, value: T | None = None, error: E | None = None, is_ok: bool = True):
        self._value = value
        self._error = error
        self._is_ok = is_ok

    @classmethod
    def ok(cls, value: T) -> "Result[T, E]":
        return cls(value=value, is_ok=True)

    @classmethod
    def err(cls, error: E) -> "Result[T, E]":
        return cls(error=error, is_ok=False)

    @property
    def is_ok(self) -> bool:
        return self._is_ok

    def unwrap(self) -> T:
        if not self._is_ok:
            raise ValueError(f"Unwrap failed: {self._error}")
        return self._value  # type: ignore

    def unwrap_err(self) -> E:
        if self._is_ok:
            raise ValueError("Called unwrap_err on Ok")
        return self._error  # type: ignore

class UserRegisterSchema(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    email: str = Field(min_length=5)
    age: int = Field(ge=18, le=120)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email format")
        return v.lower()
