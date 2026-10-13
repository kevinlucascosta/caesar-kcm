import json
from django.test import Client, TestCase
from .views import caesar


class CaesarTests(TestCase):
    def test_encrypt_preserves_non_latin_characters(self):
        self.assertEqual(caesar("Ol\u00e1, Zebra! 123", 3), "Ro\u00e1, Cheud! 123")

    def test_decryption_uses_negative_shift(self):
        self.assertEqual(caesar("Rod", -3), "Ola")

    def test_all_main_pages_load(self):
        client = Client()
        for url in ["/", "/criptografar/", "/descriptografar/", "/desenvolvedores/"]:
            self.assertEqual(client.get(url).status_code, 200)

    def test_api_encrypts(self):
        response = self.client.post("/api/cifra-cesar/", data=json.dumps({"text": "Abc", "shift": 3, "mode": "encrypt"}), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["result"], "Def")
