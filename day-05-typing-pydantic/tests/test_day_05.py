import os
import sys
from pathlib import Path
import pytest
from pydantic import ValidationError

TESTS_DIR = Path(__file__).resolve().parent
DAY_DIR = TESTS_DIR.parent

if os.environ.get("WINTER_ARC_TEST_SOLUTION") == "1":
    sys.path.insert(0, str(DAY_DIR / "solution"))
    from solution import Result, UserRegisterSchema
else:
    sys.path.insert(0, str(DAY_DIR / "exercises"))
    from exercise import Result, UserRegisterSchema

def test_result():
    r = Result.ok(100)
    assert r.is_ok is True
    assert r.unwrap() == 100

def test_pydantic_schema():
    u = UserRegisterSchema(username="hero", email="HERO@ACADEMY.COM", age=20)
    assert u.username == "hero"
    assert u.email == "hero@academy.com"

def test_pydantic_schema_invalid():
    with pytest.raises(ValidationError):
        UserRegisterSchema(username="x", email="bad", age=10)
