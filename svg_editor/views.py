import os.path
from time import time

from django.http import JsonResponse
from django.shortcuts import render

from mysite.settings import BASE_DIR


def index(request):
    return render(request, 'svg_editor/index.html')


def files_save(request):
    if request.method == "POST" and 'text' in dict(request.POST).keys():
        path = os.path.join(BASE_DIR, 'svg_editor/media/svg_editor/svg')
        name = int(time())
        with open(path+'/'+str(name)+'.svg', 'w') as file:
            file.write(dict(request.POST)['text'][0])
    return JsonResponse({}, status=200)


def files_views(request):
    path = os.path.join(BASE_DIR, 'svg_editor/media/svg_editor/svg')
    svg_list = os.listdir(path)
    response = {
        'svgs': svg_list
    }
    return JsonResponse(response)