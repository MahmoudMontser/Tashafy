# Frontend CMS Audit and Control Map

This audit maps the current frontend implementation to the admin/API modules required for full control.

## 1) Current Frontend Coverage

Pages under `apps/frontend/app/[locale]`:
- Home: `page.tsx`
- About: `about-us/page.tsx`
- Contact: `contact/page.tsx`
- Free consultation: `free-consultation/page.tsx`
- Rehabilitation list: `rehabilitation/page.tsx`
- Rehabilitation detail (care center style): `rehabilitation/[id]/page.tsx`
- Wellness list: `wellness/page.tsx`
- Wellness detail (care center style): `wellness/[id]/page.tsx`
- Programs list: `tashafy-programs/page.tsx`
- Program detail: `tashafy-programs/[id]/page.tsx`
- Blog list: `blog/page.tsx`
- Blog detail: `blog/[id]/page.tsx`
- Search results: `search-results/page.tsx`

Data sources currently used:
- Static composition in `apps/frontend/data/*.ts`
- i18n labels in `apps/frontend/public/locales/{ar,en}/common.json`
- Partial CMS override now exists for several sections/pages.

## 2) Modules Needed for Full Admin Control

### 2.1 Core CMS Modules
- Pages
- Page Sections (ordered, enabled/disabled, JSON content)
- Navigation items (header/footer)
- Global settings (contact links, CTA defaults, brand settings)
- Media library (image/file management)

### 2.2 Business Modules
- Providers (already exists)
- Provider packages/pricing and reservation options (missing)
- Doctors
- Programs
- Testimonials
- FAQ
- Partners/Accreditations
- Leads/Reservations

### 2.3 Blog Modules
- Blog posts (implemented)
- Blog categories/tags (still needed for full editorial workflow)

## 3) Page-by-Page Control Requirements

## Home (`/[locale]`)
- Sections observed:
  - hero, services, our story, medical centers, consultations doctors, programs, destinations, specialties, partners, doctors, journey plan, testimonials, certifications, features, why choose, articles, faq, cta journey
- Needed control:
  - section order/toggle
  - text/media for each section
  - linked entities (centers, doctors, programs, articles)

## About (`/[locale]/about-us`)
- Sections:
  - hero, vision, mission, core values, ceo message, services, doctors, journey
- Needed control:
  - content blocks, bullets, image assets, CTA targets

## Contact (`/[locale]/contact`)
- Sections:
  - hero, contact form labels/options, contact details, branches, WhatsApp CTA, result states, journey
- Needed control:
  - form schema/options
  - branch entries (country/address/marker)
  - success/failure messages
  - contact channels

## Free Consultation (`/[locale]/free-consultation`)
- Sections:
  - hero and multi-step wizard (step1..step8 + otp + success)
- Needed control:
  - step questions/options
  - validation labels/messages
  - final CTA flows

## Rehabilitation List (`/[locale]/rehabilitation`)
- Sections:
  - hero, services, medical centers list, doctors, testimonials, faq, journey
- Needed control:
  - hero copy
  - service cards
  - data source for center cards (should come from provider module + filters)

## Rehabilitation Detail (`/[locale]/rehabilitation/[id]`) - care center style
- Sections:
  - hero gallery
  - sidebar with reservation actions
  - center about/specialties/facilities
  - packages/pricing plans
  - testimonials/faq
  - similar centers
  - journey
- Critical missing data modules:
  - center gallery assets
  - center facilities
  - center specialties
  - reservation options with price per plan
  - plan duration, sessions count, included items
  - direct booking CTA routes

## Wellness List (`/[locale]/wellness`)
- Sections:
  - hero, achievements, services, centers, start journey, testimonials, partners, journey
- Needed control:
  - section content and order
  - center cards from provider data

## Wellness Detail (`/[locale]/wellness/[id]`) - care center style
- Sections:
  - hero gallery
  - sidebar reservation/price CTA
  - about, specialties, facilities
  - services + exclusive features
  - package plans/pricing
  - testimonials/faq, similar centers, journey
- Critical missing data modules:
  - package plans with prices
  - reservation options by center/program
  - feature lists and facility catalog per center

## Programs List (`/[locale]/tashafy-programs`)
- Sections:
  - hero, why important, program cards, journey plan, start journey, partners, testimonials, faq, journey
- Needed control:
  - program cards and pricing
  - hero stats and visuals

## Program Detail (`/[locale]/tashafy-programs/[id]`)
- Sections:
  - program detail body with sidebar price/reservation
  - package features
  - tests/analyses and labs
  - testimonials/faq and journey
- Needed control:
  - detailed package and diagnostics data model
  - reservation options and CTA routing

## Blog List + Detail
- Blog list/detail API has been implemented
- Still needed:
  - categories/tags module
  - editorial states (reviewed/approved) if required

## Search Results (`/[locale]/search-results`)
- Sections:
  - search experience + result cards + journey
- Needed control:
  - ranking/filter config from admin
  - result card schema and badges

## 4) Required Data Models for Reservation and Pricing

To support "reservation options with price" per center, add:

### 4.1 Provider Packages
- `provider_packages`
  - `provider_id`
  - `name` (ar/en)
  - `description` (ar/en)
  - `price`
  - `currency`
  - `duration_label` (ar/en)
  - `sessions_count`
  - `is_highlighted`
  - `status`
  - `sort_order`

### 4.2 Package Inclusions
- `provider_package_items`
  - `provider_package_id`
  - `label` (ar/en)
  - `sort_order`

### 4.3 Reservation Options
- `reservation_options`
  - `provider_id`
  - `title` (ar/en)
  - `type` (consultation/package/direct_booking)
  - `base_price`
  - `currency`
  - `cta_type` (internal/external/whatsapp)
  - `cta_target`
  - `is_enabled`
  - `sort_order`

### 4.4 Provider Media
- `provider_media`
  - `provider_id`
  - `kind` (gallery/cover/logo)
  - `url`
  - `alt` (ar/en)
  - `sort_order`

## 5) API Endpoints Needed Next

Admin:
- `/api/admin/providers/{id}/packages`
- `/api/admin/providers/{id}/reservation-options`
- `/api/admin/providers/{id}/media`
- `/api/admin/providers/{id}/facilities`
- `/api/admin/providers/{id}/specialties`

Public:
- `/api/public/providers/{slug}`
- `/api/public/providers/{slug}/packages`
- `/api/public/providers/{slug}/reservation-options`
- `/api/public/providers/{slug}/media`

## 6) Implementation Priority (Recommended)

1. Provider package/reservation/media modules
2. Replace rehab/wellness/program detail static structures with provider-driven API
3. Add doctors/testimonials/faq entities (if not provider-level)
4. Add search indexing/filter config
5. Add blog categories/tags + editorial workflow

## 7) Result

After implementing these modules, admin can fully control:
- page sections and copy
- center detail content
- reservation options and pricing
- media galleries
- blog and navigation

This is the required baseline for a market-ready content operations workflow.
