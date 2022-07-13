from django.urls import path
from . import views
from .views import files_views

urlpatterns = [
    path('', views.index, name='index'),
    path('files_views', files_views, name='files_views')
]