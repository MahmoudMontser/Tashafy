<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tashafy System Docs</title>
    <style>
        :root {
            --bg: #f3f6fb;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #64748b;
            --line: #dbe5f2;
            --brand-a: #0b4ea2;
            --brand-b: #2563eb;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        .shell {
            max-width: 1200px;
            margin: 28px auto;
            padding: 0 16px 40px;
        }
        .hero {
            background: linear-gradient(130deg, var(--brand-a), var(--brand-b));
            color: #fff;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 14px 28px rgba(37, 99, 235, 0.24);
        }
        .hero h1 {
            margin: 0;
            font-size: 30px;
            line-height: 1.2;
        }
        .hero p {
            margin: 8px 0 0;
            color: rgba(255, 255, 255, 0.92);
            line-height: 1.7;
        }
        .quick-links {
            margin-top: 12px;
            font-size: 13px;
        }
        .quick-links a {
            color: #fff;
            text-decoration: underline;
            margin-right: 10px;
        }
        .section {
            margin-top: 16px;
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 14px;
            overflow: hidden;
        }
        .section-head {
            padding: 14px 18px;
            border-bottom: 1px solid var(--line);
            background: #f8fbff;
        }
        .section-head h2 {
            margin: 0;
            font-size: 18px;
            color: #0f376d;
        }
        .section-body {
            padding: 16px 18px 18px;
        }
        .kvs {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
        }
        .kv {
            border: 1px solid var(--line);
            border-radius: 10px;
            padding: 10px 12px;
            background: #fff;
        }
        .kv small {
            display: block;
            color: var(--muted);
            margin-bottom: 4px;
        }
        .kv code {
            font-size: 13px;
            font-weight: 600;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--line);
            border-radius: 10px;
            overflow: hidden;
            font-size: 14px;
        }
        th, td {
            border-bottom: 1px solid var(--line);
            padding: 10px 10px;
            vertical-align: top;
            text-align: left;
        }
        th {
            background: #f4f8ff;
            color: #1d4c8f;
            font-size: 12px;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }
        tr:last-child td { border-bottom: 0; }
        .hint {
            margin-top: 10px;
            color: var(--muted);
            font-size: 13px;
        }
        .mermaid-wrap {
            border: 1px solid var(--line);
            border-radius: 12px;
            background: #fff;
            padding: 8px;
            overflow-x: auto;
        }
        .mermaid {
            min-width: 760px;
        }
        @media (max-width: 1024px) {
            .kvs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
            .kvs { grid-template-columns: 1fr; }
            .hero h1 { font-size: 24px; }
        }
    </style>
</head>
<body>
    <main class="shell">
        <section class="hero">
            <h1>Tashafy System Architecture, Infrastructure, and ERD</h1>
            <p>
                Single-page technical documentation for the full system: public website, admin panel,
                Laravel API, runtime infrastructure, and core database entity relationships.
            </p>
            <div class="quick-links">
                <a href="/api-docs">API Docs</a>
                <a href="/api-docs/frontend">Frontend API Docs</a>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>System Overview</h2></header>
            <div class="section-body">
                <div class="kvs">
                    <div class="kv"><small>Public Website</small><code>apps/frontend (Next.js)</code></div>
                    <div class="kv"><small>Admin Panel</small><code>apps/admin (Vue + Element Plus)</code></div>
                    <div class="kv"><small>Backend API</small><code>apps/api (Laravel 12 + Sanctum + Spatie RBAC)</code></div>
                    <div class="kv"><small>Database</small><code>MySQL</code></div>
                    <div class="kv"><small>Auth</small><code>Sanctum bearer tokens</code></div>
                    <div class="kv"><small>Public API Prefix</small><code>/api/public/*</code></div>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Application Architecture</h2></header>
            <div class="section-body">
                <div class="mermaid-wrap">
<pre class="mermaid">flowchart LR
    U[Users] --> FE[Next.js Frontend]
    A[Admins] --> AD[Vue Admin]
    FE --> API[Laravel API]
    AD --> API
    API --> DB[(MySQL)]
    API --> RBAC[(Spatie RBAC tables)]
    API --> ST[(Settings key-value)]
    API --> RES[(Reservation attempts)]
</pre>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Infrastructure Topology</h2></header>
            <div class="section-body">
                <div class="mermaid-wrap">
<pre class="mermaid">flowchart TB
    Internet[Internet Users] --> CDN[CDN / Reverse Proxy]
    CDN --> FE[Frontend Container :3000]
    CDN --> AD[Admin Container :5173]
    FE --> API[API Container :8000]
    AD --> API
    API --> MYSQL[(MySQL Container :3306)]
    API --> Vol[(Persistent Volume)]
</pre>
                </div>
                <p class="hint">
                    This matches the Docker Compose runtime for local/staging environments.
                </p>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Core Database ERD</h2></header>
            <div class="section-body">
                <div class="mermaid-wrap">
<pre class="mermaid">erDiagram
    USERS ||--o{ PERSONAL_ACCESS_TOKENS : "has"
    USERS ||--o{ MODEL_HAS_ROLES : "assigned"
    ROLES ||--o{ MODEL_HAS_ROLES : "grants"
    ROLES ||--o{ ROLE_HAS_PERMISSIONS : "maps"
    PERMISSIONS ||--o{ ROLE_HAS_PERMISSIONS : "maps"
    USERS ||--o{ MODEL_HAS_PERMISSIONS : "assigned"
    PERMISSIONS ||--o{ MODEL_HAS_PERMISSIONS : "grants"

    PAGES ||--o{ PAGE_SECTIONS : "has many"
    PROVIDERS ||--o{ PROVIDER_PACKAGES : "has many"
    PROVIDER_PACKAGES ||--o{ PROVIDER_PACKAGE_ITEMS : "has many"
    PROVIDERS ||--o{ RESERVATION_OPTIONS : "has many"
    PROVIDERS ||--o{ PROVIDER_MEDIA : "has many"
    PROVIDERS ||--o{ PROVIDER_FACILITIES : "has many"
    PROVIDERS ||--o{ PROVIDER_DOCTORS : "has many"
    PROVIDERS ||--o{ PROVIDER_TESTIMONIALS : "has many"
    PROVIDERS ||--o{ RESERVATION_ATTEMPTS : "has many"
    PROVIDER_PACKAGES ||--o{ RESERVATION_ATTEMPTS : "has many"

    USERS {
      bigint id PK
      string name
      string email
    }
    ROLES {
      bigint id PK
      string name
      string guard_name
    }
    PERMISSIONS {
      bigint id PK
      string name
      string guard_name
    }
    PROVIDERS {
      bigint id PK
      string slug
      string type
      string status
      json name
    }
    PROVIDER_PACKAGES {
      bigint id PK
      bigint provider_id FK
      json name
      decimal price
      string status
    }
    PROVIDER_PACKAGE_ITEMS {
      bigint id PK
      bigint provider_package_id FK
      json label
      int sort_order
    }
    RESERVATION_OPTIONS {
      bigint id PK
      bigint provider_id FK
      json title
      string cta_type
    }
    PROVIDER_MEDIA {
      bigint id PK
      bigint provider_id FK
      string kind
      string url
    }
    PROVIDER_FACILITIES {
      bigint id PK
      bigint provider_id FK
      json title
    }
    PROVIDER_DOCTORS {
      bigint id PK
      bigint provider_id FK
      json name
    }
    PROVIDER_TESTIMONIALS {
      bigint id PK
      bigint provider_id FK
      json quote
    }
    RESERVATION_ATTEMPTS {
      bigint id PK
      bigint provider_id FK
      bigint provider_package_id FK
      string status
      string source
    }
    BLOG_POSTS {
      bigint id PK
      string slug
      string status
      json title
    }
    PAGES {
      bigint id PK
      string key
      string status
      json title
    }
    PAGE_SECTIONS {
      bigint id PK
      bigint page_id FK
      string key
      json content
    }
    NAVIGATION_ITEMS {
      bigint id PK
      string group
      json label
      string path
    }
    SETTINGS {
      bigint id PK
      string key
      json value
    }
</pre>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Main Database Modules</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>Primary Tables</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Identity + RBAC</td>
                            <td><code>users</code>, <code>roles</code>, <code>permissions</code>, pivots, <code>personal_access_tokens</code></td>
                            <td>Admin users, authentication, roles and permissions.</td>
                        </tr>
                        <tr>
                            <td>Providers Domain</td>
                            <td><code>providers</code>, <code>provider_packages</code>, <code>provider_package_items</code>, <code>reservation_options</code>, <code>provider_media</code>, <code>provider_facilities</code>, <code>provider_doctors</code>, <code>provider_testimonials</code></td>
                            <td>Medical/wellness/rehab catalog and provider details.</td>
                        </tr>
                        <tr>
                            <td>Reservations</td>
                            <td><code>reservation_attempts</code></td>
                            <td>WhatsApp reservation click tracking and admin follow-up workflow.</td>
                        </tr>
                        <tr>
                            <td>CMS</td>
                            <td><code>pages</code>, <code>page_sections</code>, <code>navigation_items</code>, <code>blog_posts</code></td>
                            <td>Website content blocks, navigation, and blog publishing.</td>
                        </tr>
                        <tr>
                            <td>Configuration</td>
                            <td><code>settings</code></td>
                            <td>Global app/frontend settings (branding, SEO, maintenance, domain).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'loose' });
    </script>
</body>
</html>
