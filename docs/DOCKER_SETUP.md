# Docker Setup (API + Admin + Frontend + MySQL)

This setup runs the entire system with Docker Compose:
- Laravel API (`:8000`)
- Vue Admin (`:5173`)
- Next.js Frontend (`:3000`)
- MySQL (`:3306`)

## 1) Prepare environment

From project root:

```bash
cp .env.docker.example .env.docker
```

You can edit `.env.docker` if needed (DB password, APP_KEY, etc.).

## 2) Start all services

```bash
docker compose --env-file .env.docker up -d --build
```

## 3) Open apps

- API: `http://localhost:8000`
- API Docs: `http://localhost:8000/api-docs`
- Website API Docs: `http://localhost:8000/api-docs/frontend`
- Admin: `http://localhost:5173`
- Frontend: `http://localhost:3000`

## 4) Useful commands

### View logs
```bash
docker compose --env-file .env.docker logs -f
```

### Rebuild one service
```bash
docker compose --env-file .env.docker up -d --build api
```

### Stop everything
```bash
docker compose --env-file .env.docker down
```

### Stop and remove DB volume (full reset)
```bash
docker compose --env-file .env.docker down -v
```

## Notes

- API container runs migrations automatically on startup and seeds RBAC defaults.
- Frontend container uses:
  - `NEXT_PUBLIC_API_BASE_URL` for browser calls
  - `API_BASE_URL_INTERNAL=http://api:8000` for server-side calls inside Docker network.
