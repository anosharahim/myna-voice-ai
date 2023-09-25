"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import TextSearchView, sign_up, login_handler, check_is_authenticated, logout_handler
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('search-view/', TextSearchView.as_view(), name='search-view'),
    path('sign-up/', sign_up, name='sign-up'),
    path("login/", login_handler, name="login"),
    path("logout/", logout_handler, name="logout"),
    path('check-is-authenticated/', check_is_authenticated,
         name='check-is-authenticated'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
