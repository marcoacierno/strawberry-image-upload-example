from django.shortcuts import render


def avatars_view(request):
    return render(request, "avatars/avatars.html")

