from django.http import JsonResponse
from django.views.decorators.http import require_POST
from fileguard import validate_upload, InvalidFileError, InvalidConfigError

@require_POST
def upload_file(request):
    uploaded = request.FILES.get("file")
    if not uploaded:
        return JsonResponse({"error": "No file provided"}, status=400)
    
    try:
        content = uploaded.read()
        result = validate_upload(content, context="django-upload")
        
        if not result.allowed:
            return JsonResponse({"error": result.reason}, status=400)
        
        return JsonResponse({"status": "accepted", "type": result.detected_type})
    except InvalidFileError as e:
        return JsonResponse({"error": f"Invalid file: {e}"}, status=400)
    except InvalidConfigError as e:
        return JsonResponse({"error": f"Configuration error: {e}"}, status=500)
