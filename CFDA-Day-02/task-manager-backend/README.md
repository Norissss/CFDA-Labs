# Task Manager Backend

Backend REST API untuk project Task Manager React/Vite, dibuat menggunakan:

- Node.js
- Express
- PostgreSQL
- `pg` connection pool
- CORS
- Helmet
- Morgan
- Docker Compose

## Struktur Project

```text
task-manager-backend/
├── database/
│   └── init.sql
├── frontend-integration/
│   ├── .env.example
│   ├── README.md
│   └── taskApi.js
├── scripts/
│   └── init-db.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── test/
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Cara Menjalankan: Database Docker, Backend Lokal

### 1. Jalankan PostgreSQL

```bash
docker compose up -d postgres
```

### 2. Buat file environment

Windows Command Prompt:

```bat
copy .env.example .env
```

PowerShell, Git Bash, Linux, atau macOS:

```bash
cp .env.example .env
```

### 3. Instal dependency

```bash
npm install
```

### 4. Buat tabel database

```bash
npm run db:init
```

### 5. Jalankan backend

```bash
npm run dev
```

API tersedia di:

```text
http://localhost:5000
```

Frontend Vite dapat berjalan di:

```text
http://localhost:5173
```

## Cara Menjalankan Seluruhnya dengan Docker

```bash
docker compose up --build
```

Backend:

```text
http://localhost:5000
```

PostgreSQL:

```text
localhost:5432
```

Untuk menghentikan container:

```bash
docker compose down
```

Untuk menghapus container beserta volume database:

```bash
docker compose down -v
```

## Struktur Data Task

```json
{
  "id": 1,
  "title": "Belajar Express",
  "description": "Membuat REST API Task Manager",
  "completed": false,
  "priority": "high",
  "dueDate": "2026-07-31",
  "createdAt": "2026-07-23T04:00:00.000Z",
  "updatedAt": "2026-07-23T04:00:00.000Z"
}
```

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/health` | Memeriksa status API |
| GET | `/api/tasks` | Mengambil seluruh task |
| GET | `/api/tasks/stats` | Mengambil statistik task |
| GET | `/api/tasks/:id` | Mengambil satu task |
| POST | `/api/tasks` | Membuat task |
| PUT | `/api/tasks/:id` | Memperbarui task |
| PATCH | `/api/tasks/:id` | Memperbarui sebagian field |
| PATCH | `/api/tasks/:id/toggle` | Mengubah status selesai |
| DELETE | `/api/tasks/:id` | Menghapus task |

## Query Filter

Contoh mengambil task yang belum selesai:

```http
GET /api/tasks?completed=false
```

Filter berdasarkan priority:

```http
GET /api/tasks?priority=high
```

Pencarian title dan description:

```http
GET /api/tasks?search=node
```

Pengurutan:

```http
GET /api/tasks?sortBy=dueDate&order=asc
```

Filter dapat digabungkan:

```http
GET /api/tasks?completed=false&priority=high&sortBy=dueDate&order=asc
```

## Contoh Request

### Membuat Task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Integrasikan frontend",
  "description": "Hubungkan React dengan REST API",
  "priority": "high",
  "dueDate": "2026-07-31"
}
```

### Memperbarui Task

```http
PATCH /api/tasks/1
Content-Type: application/json
```

```json
{
  "title": "Integrasikan frontend React",
  "priority": "medium"
}
```

### Mengubah Status Task

```http
PATCH /api/tasks/1/toggle
```

### Response Berhasil

```json
{
  "success": true,
  "message": "Task berhasil dibuat.",
  "data": {
    "id": 1,
    "title": "Integrasikan frontend",
    "description": "Hubungkan React dengan REST API",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-07-31",
    "createdAt": "2026-07-23T04:00:00.000Z",
    "updatedAt": "2026-07-23T04:00:00.000Z"
  }
}
```

## Menjalankan Test

```bash
npm test
```

## Catatan Integrasi Frontend

Folder `frontend-integration` berisi:

- `taskApi.js`
- contoh `.env`
- contoh penggunaan pada React

Pastikan URL frontend terdaftar pada `FRONTEND_URL` di file `.env`.
