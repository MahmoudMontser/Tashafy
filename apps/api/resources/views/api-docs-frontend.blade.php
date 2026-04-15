<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tashafy Frontend Website APIs</title>
    <style>
        :root {
            --bg: #f3f6fb;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #64748b;
            --line: #dbe5f2;
            --brand-a: #0b4ea2;
            --brand-b: #2563eb;
            --ok: #0f766e;
            --warn: #b45309;
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); }
        .shell { max-width: 1080px; margin: 28px auto; padding: 0 16px 40px; }
        .hero { background: linear-gradient(130deg, var(--brand-a), var(--brand-b)); color: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24); }
        .hero h1 { margin: 0; font-size: 30px; line-height: 1.2; }
        .hero p { margin: 8px 0 0; color: rgba(255,255,255,.92); line-height: 1.7; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .chip { background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.32); border-radius: 999px; padding: 5px 12px; font-size: 12px; font-weight: 600; }
        .section { margin-top: 16px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
        .section-head { padding: 14px 18px; border-bottom: 1px solid var(--line); background: #f8fbff; }
        .section-head h2 { margin: 0; font-size: 18px; }
        .section-body { padding: 16px 18px 18px; }
        table { width: 100%; border-collapse: collapse; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; font-size: 14px; }
        th, td { border-bottom: 1px solid var(--line); padding: 10px; vertical-align: top; text-align: left; }
        th { background: #f4f8ff; color: #1d4c8f; font-size: 12px; letter-spacing: .02em; text-transform: uppercase; }
        tr:last-child td { border-bottom: 0; }
        .method { display: inline-block; min-width: 60px; text-align: center; border-radius: 999px; padding: 4px 10px; font-size: 11px; font-weight: 700; border: 1px solid #dbe5f2; }
        .get { color: var(--ok); background: #ecfdf5; border-color: #b7edd9; }
        .post { color: #1e40af; background: #eff6ff; border-color: #bfdbfe; }
        .kvs { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
        .kv { border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; background: #fff; }
        .kv small { display:block; color:var(--muted); margin-bottom: 4px; }
        pre { margin:0; background:#0b1220; color:#dbe7ff; border-radius:10px; padding:12px; overflow-x:auto; font-size:13px; line-height:1.5; border:1px solid #1e2a42; }
        .note { margin-top:12px; border:1px solid #fcd34d; background:#fffbeb; color:#7c2d12; border-radius:10px; padding:10px 12px; font-size:13px; line-height:1.6; }
        .links { margin-top: 8px; font-size: 13px; color: var(--muted); }
        .links a { color: #1d4ed8; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
        @media (max-width:900px){ .kvs { grid-template-columns:1fr; } .hero h1{font-size:24px;} }
    </style>
</head>
<body>
<main class="shell">
    <section class="hero">
        <h1>Tashafy Website Frontend APIs</h1>
        <p>This page is dedicated to the public website integration only (Next.js frontend).</p>
        <div class="chips">
            <span class="chip">Public Endpoints</span>
            <span class="chip">No Auth Required</span>
            <span class="chip">Base: /api/public</span>
            <span class="chip">Laravel API Resources</span>
        </div>
        <div class="links">
            Full docs: <a href="/api-docs">/api-docs</a>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Environment</h2></header>
        <div class="section-body">
            <div class="kvs">
                <div class="kv"><small>Public API Base</small><code>http://localhost:8000/api/public</code></div>
                <div class="kv"><small>Frontend Env Var</small><code>NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api</code></div>
            </div>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Endpoints for Website</h2></header>
        <div class="section-body">
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><span class="method get">GET</span></td><td><code>/content/page/{key}</code></td><td>Fetch CMS page content by key.</td></tr>
                    <tr><td><span class="method get">GET</span></td><td><code>/content/navigation</code></td><td>Fetch navigation structure for header/footer.</td></tr>
                    <tr><td><span class="method get">GET</span></td><td><code>/content/setting/{key}</code></td><td>Fetch public setting key (for example <code>app.frontend</code>).</td></tr>
                    <tr><td><span class="method get">GET</span></td><td><code>/blog</code></td><td>Blog list used by listing page.</td></tr>
                    <tr><td><span class="method get">GET</span></td><td><code>/blog/{slug}</code></td><td>Single blog detail.</td></tr>
                    <tr><td><span class="method get">GET</span></td><td><code>/providers/{slug}</code></td><td>Provider detail page data.</td></tr>
                    <tr><td><span class="method post">POST</span></td><td><code>/reservation-attempts</code></td><td>Log reservation click and return WhatsApp-ready data.</td></tr>
                </tbody>
            </table>

            <div style="margin-top: 14px;">
                <p style="margin: 0 0 8px;"><strong>GET /blog - Response (200)</strong></p>
<pre>{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "post-slug",
      "title": "Post title",
      "excerpt": "Post excerpt",
      "category": "wellness",
      "cover_image": "https://...",
      "published_at": "2026-04-15T12:00:00+00:00"
    }
  ],
  "meta": {
    "total": 20,
    "current_page": 1,
    "last_page": 2
  }
}</pre>
            </div>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Consistent Response Contract</h2></header>
        <div class="section-body">
<pre>{
  "success": true,
  "data": { ... },
  "meta": { ... } // present on paginated endpoints only
}</pre>
            <div class="note">
                Public website endpoints are now returned through Laravel API Resources to keep response shape consistent.
            </div>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Request Validation (Public APIs)</h2></header>
        <div class="section-body">
            <table>
                <thead>
                    <tr><th>Endpoint</th><th>Validated Inputs</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>GET /content/page/{key}</code></td><td><code>lang</code>: <code>ar|en</code> (optional, default: <code>ar</code>)</td></tr>
                    <tr><td><code>GET /content/navigation</code></td><td><code>lang</code>: <code>ar|en</code>, <code>group</code>: string max 60</td></tr>
                    <tr><td><code>GET /blog</code></td><td><code>lang</code>: <code>ar|en</code>, <code>per_page</code>: integer 1..100</td></tr>
                    <tr><td><code>GET /blog/{slug}</code></td><td><code>lang</code>: <code>ar|en</code></td></tr>
                    <tr><td><code>GET /providers/{slug}</code></td><td><code>lang</code>: <code>ar|en</code></td></tr>
                    <tr><td><code>POST /reservation-attempts</code></td><td>Validated body fields for provider/package IDs, source, locale, type, item/provider names, customer fields, message, whatsapp number, metadata.</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Important Setting Keys</h2></header>
        <div class="section-body">
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Used For</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>app.frontend</code></td><td>Branding, logos, contacts, SEO defaults, maintenance mode, site domain.</td></tr>
                    <tr><td><code>reservation.whatsapp</code></td><td>Default WhatsApp number/template for reservation flow.</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Reservation Attempt Example</h2></header>
        <div class="section-body">
            <p><strong>Request payload:</strong></p>
<pre>curl -X POST http://localhost:8000/api/public/reservation-attempts \
  -H "Content-Type: application/json" \
  -d '{
    "provider_id": 1,
    "provider_package_id": 10,
    "source": "frontend.rehab.package.card",
    "reservation_type": "package",
    "item_name": "Premium Recovery Program",
    "provider_name": "XYZ Center",
    "locale": "ar"
  }'</pre>
            <p style="margin:12px 0 8px;"><strong>Response payload (201):</strong></p>
<pre>{
  "success": true,
  "data": {
    "attempt": {
      "id": 12,
      "provider_id": 1,
      "provider_package_id": 10,
      "source": "frontend.rehab.package.card",
      "locale": "ar",
      "reservation_type": "package",
      "item_name": "Premium Recovery Program",
      "provider_name": "XYZ Center",
      "status": "new",
      "message": "Hello, I want to reserve...",
      "whatsapp_number": "9665XXXXXXX",
      "whatsapp_url": "https://wa.me/...",
      "metadata": null,
      "provider": { "id": 1, "slug": "provider-slug", "name": { "ar": "...", "en": "..." } },
      "package": { "id": 10, "provider_id": 1, "name": { "ar": "...", "en": "..." }, "price": 1000, "currency": "SAR" },
      "created_at": "2026-04-15T12:00:00+00:00"
    },
    "whatsapp_url": "https://wa.me/..."
  }
}</pre>
            <div class="note">
                Website integration flow: first call <code>POST /reservation-attempts</code>, then open returned WhatsApp URL (or fallback URL).
            </div>
        </div>
    </section>

    <section class="section">
        <header class="section-head"><h2>Error Handling</h2></header>
        <div class="section-body">
            <table>
                <thead>
                    <tr><th>Status</th><th>Meaning</th><th>Frontend Action</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>200/201</code></td><td>Success</td><td>Continue render/redirect flow.</td></tr>
                    <tr><td><code>422</code></td><td>Validation error</td><td>Show fallback UX and log client-side error context.</td></tr>
                    <tr><td><code>500</code></td><td>Server error</td><td>Fallback gracefully and avoid blocking page render.</td></tr>
                </tbody>
            </table>
        </div>
    </section>
</main>
</body>
</html>
