import os.path

from django.http import JsonResponse
from django.shortcuts import render

from mysite.settings import BASE_DIR


def index(request):
    return render(request, 'svg_editor/index.html')


def files_views(request):
    path = os.path.join(BASE_DIR, 'svg_editor/media/svg_editor/svg')
    svgs_lists = os.listdir(path)
    response = {
        'svgs': svgs_lists
    }
    return JsonResponse(response)