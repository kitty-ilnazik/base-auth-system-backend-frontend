custom_responses = {
    200: {
        "description": "Successful response with API structure",
        "content": {
            "application/json": {
                "example": {
                    "data": {
                        "...": { "...": "..." }
                    },
                    "message": "Successful response with API structure"
                }
            }
        },
    },
    400: {
        "description": "Bad request — invalid or missing parameters",
        "content": {
            "application/json": {
                "example": {
                    "error": "Bad Request",
                    "details": "Invalid or missing parameters"
                }
            }
        },
    },
    401: {
        "description": "Unauthorized — authentication required or invalid token",
        "content": {
            "application/json": {
                "example": {
                    "error": "Unauthorized",
                    "details": "Authentication required or invalid token"
                }
            }
        },
    },
    404: {
        "description": "Not found — the requested resource does not exist",
        "content": {
            "application/json": {
                "example": {
                    "error": "Not Found",
                    "details": "The requested resource does not exist"
                }
            }
        },
    },
    429: {
        "description": "Too Many Requests — rate limit exceeded",
        "content": {
            "application/json": {
                "example": {
                    "error": "Too Many Requests",
                    "details": "Rate limit exceeded. You are banned for 30 minutes."
                }
            }
        },
    },
    500: {
        "description": "Internal server error",
        "content": {
            "application/json": {
                "example": {
                    "error": "Internal Server Error",
                    "details": "An unexpected error occurred"
                }
            }
        },
    },
}