from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from src.config import settings

from src.utils.exceptions import error_response, success_response
from src.utils.api_structure import build_api_structure
from src.utils.endpoints import get_endpoints_for_version
from src.utils.responses import custom_responses

router = APIRouter(tags=["common"])


@router.get(
    "/",
    summary="API Information",
    description="Returns complete API information",
    responses=custom_responses
)
async def get_api_info(request: Request) -> JSONResponse:
    try:
        api_structure = build_api_structure(request, request.app.routes)
        return success_response(
            data={"api_structure": api_structure},
            message="API structure successfully retrieved"
        )
    except Exception as e:
        return error_response(500, "Internal Server Error", str(e))


@router.get(
    '/versions',
    summary="API Versions",
    description="Returns information about all API versions with changes and endpoints",
    responses=custom_responses
)
async def get_versions_api(request: Request) -> JSONResponse:
    try:
        versions = settings.API_VERSIONS
        for version_info in versions:
            version = version_info["version"]
            version_info["endpoints"] = get_endpoints_for_version(
                request, request.app.routes, version
            )
        return success_response(
            data={"versions": versions},
            message="API versions successfully retrieved"
        )
    except Exception as e:
        return error_response(500, "Internal Server Error", str(e))