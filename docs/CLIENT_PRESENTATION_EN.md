# Tashafy - Client Meeting Presentation (High Level)

## 1) Vision and Outcome
- Build a scalable digital healthcare platform with two products:
  - Admin platform for operations and content
  - Public frontend for patients and visitors
- Start fast with web, then extend smoothly to mobile apps (iOS/Android) in a later phase.
- Deliver business value in controlled phases with clear scope, timeline, and budget.

## 2) High-Level Architecture
- **Monorepo structure**
  - `apps/api` - Laravel API (core business logic, auth, data)
  - `apps/admin` - Vue 3 Admin Panel
  - `apps/frontend` - Next.js public website
- **Shared API-first approach**
  - All clients (web now, mobile later) consume the same backend APIs.
- **Localization ready**
  - Arabic + English, RTL/LTR support from day one.

## 3) Why This Structure Is Scalable
- **Separation of concerns**: API, Admin, Frontend are independent apps.
- **Horizontal growth**: each app can scale independently based on traffic.
- **Maintainability**: clear boundaries reduce risk and speed up future changes.
- **Extensibility**: new modules (booking, leads, payments, reviews) can be added safely.

## 4) Mobile-Readiness (Future Phase)
- Current architecture is designed for mobile expansion:
  - API-first contracts
  - Token-based auth
  - Reusable domain models
  - Language-ready content layer
- Later, mobile app can be built in Flutter or React Native with minimal backend rework.

## 5) Delivery Phases, Time Slots, and Price

> Currency: USD (you can replace with your preferred local currency before sharing).

| Phase | Scope | Slot (Duration) | Estimated Price |
|---|---|---|---|
| Phase 1 - Foundation | Core architecture, project setup, auth, provider base model, admin baseline, frontend baseline | Week 1-2 | $4,500 |
| Phase 2 - Core Features | Provider CRUD full flow, multilingual content, search/listing basics, roles/permissions hardening | Week 3-5 | $7,500 |
| Phase 3 - Public Experience | Public pages, SEO basics, performance pass, analytics hooks, content workflows | Week 6-7 | $4,000 |
| Phase 4 - Stabilization & Launch | QA cycle, bug fixing, deployment, documentation, handover | Week 8 | $2,500 |
| Phase 5 - Mobile Preparation (Optional) | API optimization for mobile, endpoint audit, mobile technical design, backlog definition | Week 9 | $2,000 |

**Total (Phases 1-4): $18,500**  
**Total (Phases 1-5): $20,500**

## 6) Commercial Notes
- Prices are estimates for planning and can be finalized after a short discovery workshop.
- Change requests outside approved scope are handled in a separate mini-scope.
- Payment can be milestone-based per phase approval.

## 7) Suggested Payment Milestones
- 30% at project kickoff
- 25% after Phase 2 delivery
- 25% after Phase 3 delivery
- 20% at launch handover

## 8) Risks and Mitigation (High-Level)
- **Risk**: Scope growth  
  **Mitigation**: phased backlog and sign-off per phase.
- **Risk**: Late content/input from business team  
  **Mitigation**: content checklist and owner per stream.
- **Risk**: Performance under growth  
  **Mitigation**: caching strategy, DB indexing, and monitoring baseline.

## 9) Closing Message for Client
- We are not only building features; we are building a scalable digital platform.
- The proposed structure reduces long-term cost and accelerates future products.
- Mobile app readiness is built into the architecture from the start.
