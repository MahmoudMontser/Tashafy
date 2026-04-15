# Frontend API Handoff

This document is the integration handoff for frontend developers (admin + public website).

It covers:
- Environment and base URLs
- Authentication flow
- RBAC behavior and permission usage
- Public content APIs
- Reservation/WhatsApp tracking APIs
- Admin CMS APIs used by Vue admin
- Integration checklist and common pitfalls

---

## 1) Environments and Base URLs

- Local API base URL: `http://localhost:8000/api`
- Admin frontend base URL: `http://localhost:5173`
- Public website base URL: `http://localhost:3000`
- Swagger file for website frontend APIs: `docs/frontend-website-api.swagger.yaml`

Set frontend env vars:

```env
# apps/admin/.env (Vite)
VITE_API_BASE_URL=http://localhost:8000/api

# apps/frontend/.env.local (Next.js)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

---

## 2) Authentication (Admin)

### 2.1 Login

- **Endpoint:** `POST /admin/login`
- **Auth:** Public
- **Body:**

```json
{
  "email": "admin@tashafy.com",
  "password": "Password123!"
}
```

- **Success response (200):**

```json
{
  "token": "<sanctum-token>",
  "user": {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@tashafy.com",
    "roles": ["super-admin"],
    "permissions": ["dashboard.view", "providers.view"]
  }
}
```

### 2.2 Current User

- **Endpoint:** `GET /admin/me`
- **Auth:** `Authorization: Bearer <token>`
- Returns same `user` shape as login.

### 2.3 Logout

- **Endpoint:** `POST /admin/logout`
- **Auth:** Bearer token

---

## 3) RBAC and Super Admin Behavior

Spatie Permission is enabled with `sanctum` guard.

### 3.1 Permission Enforcement

- Backend routes are protected by middleware like:
  - `permission:providers.view`
  - `permission:content.blog.manage`
  - `permission:roles.view`
- Unauthorized access returns **403**.

### 3.2 Super Admin Override

- `super-admin` role has global bypass via `Gate::before`.
- A super-admin user can access all protected endpoints.

### 3.3 Frontend Guarding

Use `user.permissions` from `/admin/login` or `/admin/me` to:
- Hide inaccessible menu items/pages
- Redirect to unauthorized page for blocked routes
- Disable action buttons when missing permissions

---

## 4) RBAC Endpoints (Admin)

All endpoints below require Bearer token and relevant permissions.

### 4.1 Permissions

- `GET /admin/rbac/permissions`
- Permission required: `roles.view`
- Response:

```json
{
  "data": [
    { "id": 1, "name": "dashboard.view" },
    { "id": 2, "name": "providers.view" }
  ]
}
```

### 4.2 Roles

- `GET /admin/rbac/roles` (needs `roles.view`)
- `POST /admin/rbac/roles` (needs `roles.create`)
- `PUT /admin/rbac/roles/{role}` (needs `roles.update`)
- `DELETE /admin/rbac/roles/{role}` (needs `roles.delete`)

Create/Update body:

```json
{
  "name": "content-manager",
  "permissions": ["content.blog.manage", "content.pages.manage"]
}
```

### 4.3 Admin Users

- `GET /admin/rbac/users?search=&per_page=50` (needs `users.view`)
- `POST /admin/rbac/users` (needs `users.create`)
- `PUT /admin/rbac/users/{user}` (needs `users.update`)

Create body:

```json
{
  "name": "Editor User",
  "email": "editor@tashafy.com",
  "password": "Password123!",
  "roles": ["content-manager"]
}
```

Update body:

```json
{
  "name": "Editor User",
  "email": "editor@tashafy.com",
  "password": "optional-new-password",
  "roles": ["content-manager"]
}
```

---

## 5) Public Website APIs

These are no-auth endpoints used by Next.js website.

### 5.0 Response Format (Consistent)

Public endpoints now use Laravel API Resources and return a consistent envelope:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

- `meta` is included only for paginated endpoints (e.g. blog list).
- Validation errors still use Laravel standard `422` error shape.

### 5.1 Content and Settings

- `GET /public/content/page/{key}`
- `GET /public/content/navigation`
- `GET /public/content/setting/{key}`

Important key used in website:
- `app.frontend` (site name, logos, contacts, maintenance mode, domain)

### 5.2 Blog

- `GET /public/blog`
- `GET /public/blog/{slug}`

### 5.3 Provider Detail

- `GET /public/providers/{slug}`

### 5.4 Reservation Attempt Logging

- `POST /public/reservation-attempts`
- Used before redirecting/opening WhatsApp link.

Suggested body (current frontend usage):

```json
{
  "provider_id": 1,
  "provider_package_id": 10,
  "source": "frontend.rehab.package.card",
  "reservation_type": "package",
  "item_name": "Premium Recovery Program",
  "provider_name": "XYZ Center",
  "locale": "ar",
  "customer_name": null,
  "customer_phone": null,
  "message": null
}
```

The API records metadata and returns the persisted attempt with generated `whatsapp_url` when possible.

Response shape:

```json
{
  "success": true,
  "data": {
    "attempt": {},
    "whatsapp_url": "https://wa.me/..."
  }
}
```

---

## 6) Admin CMS APIs (Current Route Map)

All endpoints under `/admin/*` require Bearer token + permission.

### 6.1 Providers

- `GET /admin/providers`
- `GET /admin/providers/{provider}`
- `POST /admin/providers`
- `PUT /admin/providers/{provider}`
- `DELETE /admin/providers/{provider}`

### 6.2 Provider Commerce and Content

- Packages:
  - `GET|POST /admin/providers/{provider}/packages`
  - `PUT|DELETE /admin/providers/{provider}/packages/{package}`
- Package items:
  - `GET|POST /admin/provider-packages/{package}/items`
  - `PUT|DELETE /admin/provider-packages/{package}/items/{item}`
- Reservation options:
  - `GET|POST /admin/providers/{provider}/reservation-options`
  - `PUT|DELETE /admin/providers/{provider}/reservation-options/{option}`
- Media:
  - `GET|POST /admin/providers/{provider}/media`
  - `PUT|DELETE /admin/providers/{provider}/media/{medium}`
- Facilities:
  - `GET|POST /admin/providers/{provider}/facilities`
  - `PUT|DELETE /admin/providers/{provider}/facilities/{facility}`
- Doctors:
  - `GET|POST /admin/providers/{provider}/doctors`
  - `PUT|DELETE /admin/providers/{provider}/doctors/{doctor}`
- Testimonials:
  - `GET|POST /admin/providers/{provider}/testimonials`
  - `PUT|DELETE /admin/providers/{provider}/testimonials/{testimonial}`

### 6.3 Content Management

- Blog posts: `Route::apiResource('blog-posts')`
- Pages: `Route::apiResource('pages')`
- Page sections: `Route::apiResource('page-sections')`
- Navigation items: `Route::apiResource('navigation-items')`

### 6.4 Settings

- `GET /admin/settings`
- `POST /admin/settings` (upsert key/value)
- `GET /admin/settings/{key}`

Used keys include:
- `app.frontend`
- `reservation.whatsapp`

### 6.5 Reservation Attempts (Admin)

- `GET /admin/reservation-attempts`
- `PUT /admin/reservation-attempts/{reservationAttempt}`

---

## 7) Error Contract and Frontend Handling

### 7.1 Common Status Codes

- `200` success
- `201` created
- `401` invalid token / unauthenticated
- `403` permission denied
- `422` validation errors

### 7.2 Validation Error Shape (Laravel default)

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

Frontend handling recommendation:
- On `401`: clear token/session and redirect login
- On `403`: redirect unauthorized page
- On `422`: show field-level form messages

---

## 8) Release Checklist for Frontend Team

### Admin Team

- Store token in local storage/session
- Add `Authorization: Bearer <token>` in HTTP client
- Fetch `/admin/me` at app startup to sync roles/permissions
- Guard routes based on permissions
- Hide inaccessible menu/actions

### Public Website Team

- Use public endpoints only (`/public/*`)
- For reservation CTA:
  1) call `POST /public/reservation-attempts`
  2) open returned/fallback WhatsApp URL
- Read `app.frontend` from public setting to drive:
  - site branding
  - contacts/social
  - maintenance mode
  - website domain usage (preview links)

---

## 9) Quick cURL Smoke Tests

### Login

```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tashafy.com","password":"Password123!"}'
```

### Me

```bash
curl http://localhost:8000/api/admin/me \
  -H "Authorization: Bearer <TOKEN>"
```

### List roles

```bash
curl http://localhost:8000/api/admin/rbac/roles \
  -H "Authorization: Bearer <TOKEN>"
```

### Public blog

```bash
curl http://localhost:8000/api/public/blog
```

---

## 10) Notes

- If the frontend receives unexpected 403 responses after role changes, re-login or refresh `/admin/me` data.
- If using permission caches in long-running environments, clear cache after permission schema updates:

```bash
php artisan optimize:clear
php artisan permission:cache-reset
```

