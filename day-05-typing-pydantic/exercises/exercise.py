from typing import TypeVar, Generic
from pydantic import BaseModel, Field, field_validator

T = TypeVar("T")
E = TypeVar("E")

class Result(Generic[T, E]):
    # TODO: Implement Result
    def __init__(self, value: T | None = None, error: E | None = None, is_ok: bool = True):
        self.value = value
        self.error = error
        self.is_ok = is_ok

    @classmethod
    def ok(cls, value: T) -> "Result[T, E]":
        return cls(value=value, is_ok=True)

    @classmethod
    def err(cls, error: E) -> "Result[T, E]":
        return cls(error=error, is_ok=False)

    def unwrap(self) -> T:
        if not self.is_ok:
            raise ValueError(f"Unwrap failed: {self.error}")
        return self.value  # type: ignore

    def unwrap_err(self) -> E:
        if self.is_ok:
            raise ValueError("Called unwrap_err on Ok")
        return self.error  # type: ignore


class UserRegisterSchema(BaseModel):
    # TODO: Implement schema
    username: str = Field(min_length=3, max_length=20)
    email: str = Field(min_length=5)
    age: int = Field(ge=18, le=120)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email address")
        return v.lower()
