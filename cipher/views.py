import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST


def caesar(text, shift):
    """Aplica a Cifra de César, preservando caracteres fora de A-Z/a-z."""
    normalized = shift % 26
    output = []
    for char in text:
        if "A" <= char <= "Z":
            output.append(chr((ord(char) - ord("A") + normalized) % 26 + ord("A")))
        elif "a" <= char <= "z":
            output.append(chr((ord(char) - ord("a") + normalized) % 26 + ord("a")))
        else:
            output.append(char)
    return "".join(output)


def home(request):
    return render(request, "cipher/home.html")


def encrypt(request):
    return render(request, "cipher/transform.html", {"mode": "encrypt"})


def decrypt(request):
    return render(request, "cipher/transform.html", {"mode": "decrypt"})


def developers(request):
    return render(request, "cipher/developers.html")


@require_POST
def caesar_api(request):
    try:
        data = json.loads(request.body)
        text = str(data.get("text", ""))
        shift = int(data.get("shift", 3))
        mode = data.get("mode", "encrypt")
    except (json.JSONDecodeError, TypeError, ValueError):
        return JsonResponse({"error": "Dados inválidos."}, status=400)
    if not 1 <= shift <= 25 or mode not in {"encrypt", "decrypt"}:
        return JsonResponse({"error": "Chave ou operação inválida."}, status=400)
    return JsonResponse({"result": caesar(text, -shift if mode == "decrypt" else shift)})
