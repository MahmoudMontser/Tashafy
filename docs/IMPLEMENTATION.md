# Tashafy Full-Stack Implementation (Option A)
**Monorepo: Laravel API + Vue 3 Admin (Element Plus) + Next.js Website**  
**Languages: Arabic + English (RTL/LTR)**

> This guide is designed to be complete and copy/paste friendly.

> Frontend integration handoff (latest contracts): see `docs/FRONTEND_API_HANDOFF.md`.
> Full Docker stack setup: see `docs/DOCKER_SETUP.md`.

---

## 0) Prerequisites

Make sure you have:
- **PHP 8.2+**, Composer
- **Node 18+**, npm
- MySQL (or PostgreSQL — steps below assume MySQL)
- Git

Optional but recommended:
- Docker (for DB + local consistency)

---

## 1) Project Architecture

We use a monorepo:

```
tashafy/
apps/
api/          # Laravel API (admin + public)
admin/        # Vue 3 Admin panel
frontend/     # Next.js Public website
docs/
IMPLEMENTATION.md
README.md
```

Core data model supports 3 verticals:
- Rehab (rehab centers)
- Wellness (wellness centers + programs)
- Medical tourism (hospitals + doctors + accreditations + medical packages)

We unify them under **Provider** with `type`:
- `rehab_center`
- `wellness_center`
- `medical_hospital`

---

## 2) Setup Repo

### 2.1 Create folders
```bash
mkdir tashafy && cd tashafy
mkdir -p apps docs
```

---

## 3) Backend: Laravel API (apps/api)

### 3.1 Create Laravel project

```bash
cd apps
composer create-project laravel/laravel api
cd api
```

### 3.2 Configure `.env`

Edit `apps/api/.env`:

```env
APP_NAME=Tashafy
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tashafy
DB_USERNAME=root
DB_PASSWORD=
```

Create DB:

```sql
CREATE DATABASE tashafy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Generate key + migrate:

```bash
php artisan key:generate
php artisan migrate
```

---

## 4) Laravel Packages

### 4.1 Install Sanctum + Spatie Permission

```bash
composer require laravel/sanctum spatie/laravel-permission
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

---

## 5) Database Schema (Core Tables)

### 5.1 Providers table

The migration has been created at:
`database/migrations/*create_providers_table.php`

Run:

```bash
php artisan migrate
```

---

## 6) Laravel Models

### 6.1 Provider model

The model is located at `app/Models/Provider.php` with all necessary fillable fields and casts.

---

## 7) Laravel API (Admin Auth + Providers CRUD)

### 7.1 Admin Auth Controller (Token-based)

Located at: `app/Http/Controllers/Api/AdminAuthController.php`

### 7.2 Provider CRUD Controller

Located at: `app/Http/Controllers/Api/ProviderController.php`

### 7.3 API Routes

Located at: `routes/api.php`

---

## 8) Create Admin User

```bash
php artisan tinker
```

Inside tinker:

```php
$user = new \App\Models\User();
$user->name = "Admin";
$user->email = "admin@tashafy.com";
$user->password = \Illuminate\Support\Facades\Hash::make("Password123!");
$user->save();
```

Start API:

```bash
php artisan serve --port=8000
```

Test login:

```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tashafy.com","password":"Password123!"}'
```

---

## 9) Admin Panel: Vue 3 (apps/admin)

### 9.1 Create Vue app

```bash
cd ../../
cd apps
npm create vite@latest admin -- --template vue
cd admin
npm i
npm i element-plus axios vue-router@4 pinia vue-i18n@9 @vueuse/core
```

### 9.2 Setup main entry

Located at: `src/main.js`

### 9.3 i18n (Arabic/English)

Located at: `src/i18n.js`

### 9.4 Router

Located at: `src/router/index.js`

### 9.5 Axios client

Located at: `src/api/http.js`

### 9.6 Login Page

Located at: `src/views/Login.vue`

### 9.7 Admin Layout with RTL/LTR toggle

Located at: `src/views/AdminLayout.vue`

### 9.8 Providers List

Located at: `src/views/providers/ProvidersList.vue`

### 9.9 Provider Form (Create/Edit)

Located at: `src/views/providers/ProviderForm.vue`

### 9.10 Start Admin

```bash
npm run dev -- --port 5173
```

Admin URL:

* [http://localhost:5173](http://localhost:5173)

---

## 10) Website: Next.js (apps/frontend)

### 10.1 Create Next.js app

```bash
cd ../
npx create-next-app@latest frontend
cd frontend
npm i
```

### 10.2 Configure i18n

Located at: `next.config.ts`

---

## 11) Run Everything

### API

```bash
cd ../../apps/api
php artisan serve --port=8000
```

### Admin

```bash
cd ../admin
npm run dev -- --port 5173
```

### Web

```bash
cd ../frontend
npm run dev -- --port 3000
```

---

## 12) Next Steps Roadmap (After this base)

### 12.1 Public endpoints (no auth)

Add:

* `GET /api/public/providers?lang=ar&type=...`
* `GET /api/public/providers/{slug}?lang=en`

Backend resolves JSON translations into strings based on `lang`.

### 12.2 Add core modules (in this order)

1. Locations (countries, cities)
2. Media upload + gallery per provider
3. Packages:

   * Rehab/Wellness packages
   * Medical packages (hospitals)
4. Taxonomies:

   * Rehab specialties
   * Wellness programs
   * Medical specialties
   * Amenities
5. Reviews + moderation
6. Leads (consultation / booking requests)
7. Pages + sections builder (Home + landings)

---

## 13) Translation Convention (STRICT)

All translatable fields MUST be stored as:

```json
{ "ar": "...", "en": "..." }
```

Admin UI edits both languages with tabs.

Website uses `lang` to choose:

* Arabic => RTL
* English => LTR

---

## 14) Notes for Production

For production:

* Use HTTPS
* Use proper CORS
* Use DB backups
* Add rate limiting on admin endpoints
* Add role permissions for editors vs admins

---

## 15) Troubleshooting

### 15.1 CORS issues

Install Laravel CORS if needed:

```bash
composer require fruitcake/laravel-cors
```

Or configure `config/cors.php` to allow admin/web domains.

### 15.2 Sanctum token issues

Make sure `Authorization: Bearer <token>` is being sent from admin.

---

✅ If you want, I can generate the **next MD step** that implements:

* Media upload + Provider gallery
* Public providers endpoints (lang-resolved)
* Website listing + provider details page

Tell me: **"Next: Media + Public API"** and I'll extend this same file with full code.

