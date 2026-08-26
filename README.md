# Caloreme

Caloreme is a Django and Graphene-Django backend with a React, Vite, and Chakra UI frontend. The initial application verifies the full stack with a GraphQL health query.

## Prerequisites

- Python 3.12 or later
- Node.js 20 or later

## Install

From the repository root, create a local Python environment and install the backend:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -e backend
```

Install the frontend dependencies:

```bash
npm install --prefix frontend
```

Optional local configuration is documented in `backend/.env.example` and `frontend/.env.example`. Copy an example to `.env` in its respective workspace when you need to override a default.

## Run locally

Apply Django's built-in migrations once:

```bash
cd backend
../.venv/bin/python manage.py migrate
```

In one terminal, start the backend:

```bash
cd backend
../.venv/bin/python manage.py runserver
```

The GraphiQL interface is available at <http://localhost:8000/graphql>.

In a second terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open the Vite URL printed in the terminal (normally <http://localhost:5173>). It will request the GraphQL endpoint and show `API status: OK` when the backend is available.

## Verify the GraphQL endpoint

With the backend running, submit the health query directly:

```bash
curl -sS http://localhost:8000/graphql \
  -H 'Content-Type: application/json' \
  --data '{"query":"{ health }"}'
```

The response is:

```json
{"data":{"health":"OK"}}
```

## Test and build

Run the backend checks and tests:

```bash
cd backend
../.venv/bin/python manage.py check
../.venv/bin/python manage.py test
```

Run the frontend tests and create a production build:

```bash
cd frontend
npm run test:run
npm run build
```

## Development configuration

The backend permits the local Vite origin by default. Set `CORS_ALLOWED_ORIGINS` as a comma-separated list to allow a different development frontend origin. Set `VITE_GRAPHQL_URL` in `frontend/.env` to target a different GraphQL endpoint.
