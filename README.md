# Tashafy - Full-Stack Healthcare Platform

A comprehensive monorepo platform for managing and displaying healthcare providers including rehab centers, wellness centers, and medical tourism hospitals.

## Architecture

```
tashafy/
├── apps/
│   ├── api/          # Laravel API (admin + public)
│   ├── admin/        # Vue 3 Admin panel
│   └── web/          # Nuxt 3 Public website
└── docs/
    └── IMPLEMENTATION.md
```

## Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Admin Panel**: Vue 3 + Element Plus + Vue Router + Pinia + Vue I18n
- **Public Website**: Nuxt 3 + @nuxtjs/i18n
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Sanctum

## Quick Start

### Prerequisites

- PHP 8.2+
- Composer
- Node 18+
- MySQL/PostgreSQL

### 1. Database Setup

Create a database:

```sql
CREATE DATABASE tashafy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend (Laravel API)

```bash
cd apps/api

# Configure .env (update DB credentials)
# Then run:
php artisan key:generate
php artisan migrate

# Create admin user (via tinker)
php artisan tinker
# Then run:
$user = new \App\Models\User();
$user->name = "Admin";
$user->email = "admin@tashafy.com";
$user->password = \Illuminate\Support\Facades\Hash::make("Password123!");
$user->save();

# Start server
php artisan serve --port=8000
```

### 3. Admin Panel (Vue 3)

```bash
cd apps/admin
npm install
npm run dev -- --port 5173
```

Visit: http://localhost:5173

Default credentials:
- Email: `admin@tashafy.com`
- Password: `Password123!`

### 4. Public Website (Nuxt 3)

```bash
cd apps/web
npm install
npm run dev -- --port 3000
```

Visit: http://localhost:3000

## Features

### Current Implementation

- ✅ Admin authentication (Sanctum token-based)
- ✅ Provider CRUD (Rehab Centers, Wellness Centers, Medical Hospitals)
- ✅ Bilingual support (Arabic/English) with RTL/LTR
- ✅ Admin panel with Element Plus UI
- ✅ Provider management interface

### Planned Features

- Public provider listings
- Media uploads and galleries
- Packages management
- Reviews and ratings
- Leads/booking system
- Location management (countries, cities)
- Taxonomies (specialties, amenities)

## API Endpoints

### Admin (Protected)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current user
- `POST /api/admin/logout` - Logout
- `GET /api/admin/providers` - List providers
- `POST /api/admin/providers` - Create provider
- `GET /api/admin/providers/{id}` - Get provider
- `PUT /api/admin/providers/{id}` - Update provider
- `DELETE /api/admin/providers/{id}` - Delete provider

### Public (Coming Soon)

- `GET /api/public/providers?lang=ar&type=...`
- `GET /api/public/providers/{slug}?lang=en`

## Development

### Running All Services

```bash
# Terminal 1: API
cd apps/api && php artisan serve --port=8000

# Terminal 2: Admin
cd apps/admin && npm run dev -- --port 5173

# Terminal 3: Website
cd apps/web && npm run dev -- --port 3000
```

## Translation Convention

All translatable fields are stored as JSON:

```json
{
  "ar": "النص بالعربية",
  "en": "Text in English"
}
```

The admin panel allows editing both languages via tabs. The website uses the `lang` parameter to resolve the appropriate translation.

## License

Proprietary

