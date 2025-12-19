from django.http import JsonResponse
from django.views.decorators.http import require_POST
from fileguard import validate_upload

@require_POST
def upload_file(request):
    uploaded = request.FILES.get("file")
    if not uploaded:
        return JsonResponse({"error": "No file provided"}, status=400)
    
    content = uploaded.read()
    result = validate_upload(content, context="django-upload")
    
    if not result.allowed:
        return JsonResponse({"error": result.reason}, status=400)
    
    return JsonResponse({"status": "accepted", "type": result.detected_type})
