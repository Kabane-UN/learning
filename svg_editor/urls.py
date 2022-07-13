from django.urls import path
from . import views
from .views import files_views, files_save

urlpatterns = [
    path('', views.index, name='index'),
    path('files_views', files_views, name='files_views'),
    path('files_save', files_save, name='files_save')
]