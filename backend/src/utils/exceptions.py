from fastapi import HTTPException
from fastapi.responses import JSONResponse


def unauthorized_exception() -> HTTPException:
    return HTTPException(
        status_code=401,
        detail={
            "error": "Unauthorized",
            "details": "Authentication required or invalid token"
        }
    )


def too_many_requests_exception(details: str = "Rate limit exceeded") -> JSONResponse:
    return JSONResponse(
        content={
            "error": "Too Many Requests",
            "details": details
        },
        status_code=429
    )


def error_response(status_code: int, error: str, details: str) -> JSONResponse:
    return JSONResponse(
        content={
            "error": error,
            "details": details
        },
        status_code=status_code
    )


def success_response(
    data: dict,
    message: str = "Successful response with API structure"
) -> JSONResponse:
    return JSONResponse(
        content={
            "data": data,
            "message": message
        },
        status_code=200
    )