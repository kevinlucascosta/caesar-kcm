# César KCM Projeto Educativo

Aplicação educativa sobre a Cifra de César, migrada de React/Vite para Django e Python.

## Executar localmente

1. Crie e ative um ambiente virtual: `python -m venv .venv`
2. Instale as dependências: `pip install -r requirements.txt`
3. Inicie o servidor: `python manage.py runserver`
4. Abra `http://127.0.0.1:8000/`

## Estrutura

- `cipher/views.py`: regras em Python, incluindo a Cifra de César.
- `templates/cipher/`: páginas Django preservando conteúdo e rotas originais.
- `static/`: estilos e a pequena camada de interação do navegador.
