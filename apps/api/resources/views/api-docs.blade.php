<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tashafy API Docs</title>
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
        body {
            margin: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
        }
        .shell {
            max-width: 1120px;
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
        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
        }
        .chip {
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.32);
            color: #fff;
            border-radius: 999px;
            padding: 5px 12px;
            font-size: 12px;
            font-weight: 600;
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
        }
        .section-body {
            padding: 16px 18px 18px;
        }
        .kvs {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
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
        .method {
            display: inline-block;
            min-width: 60px;
            text-align: center;
            border-radius: 999px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid #dbe5f2;
        }
        .get { color: var(--ok); background: #ecfdf5; border-color: #b7edd9; }
        .post { color: #1e40af; background: #eff6ff; border-color: #bfdbfe; }
        .put { color: #b45309; background: #fffbeb; border-color: #fde68a; }
        .delete { color: #b91c1c; background: #fef2f2; border-color: #fecaca; }
        pre {
            margin: 0;
            background: #0b1220;
            color: #dbe7ff;
            border-radius: 10px;
            padding: 12px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
            border: 1px solid #1e2a42;
        }
        .note {
            margin-top: 12px;
            border: 1px solid #fcd34d;
            background: #fffbeb;
            color: #7c2d12;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 13px;
            line-height: 1.6;
        }
        .foot {
            margin-top: 10px;
            color: var(--muted);
            font-size: 13px;
        }
        @media (max-width: 900px) {
            .kvs { grid-template-columns: 1fr; }
            .hero h1 { font-size: 24px; }
        }
    </style>
</head>
<body>
    <main class="shell">
        <section class="hero">
            <h1>Tashafy API Documentation</h1>
            <p>
                Integration page for frontend developers. All contracts below reflect the current backend routes.
                Use this page as a quick browser reference while building admin and website integrations.
            </p>
            <div class="chips">
                <span class="chip">Sanctum Token Auth</span>
                <span class="chip">Spatie RBAC</span>
                <span class="chip">Laravel 12</span>
                <span class="chip">Base: /api</span>
            </div>
            <p class="links" style="margin-top:12px;">
                Website-only docs:
                <a href="/api-docs/frontend" style="color:#fff;text-decoration:underline;">/api-docs/frontend</a>
            </p>
        </section>

        <section class="section">
            <header class="section-head"><h2>Environment</h2></header>
            <div class="section-body">
                <div class="kvs">
                    <div class="kv"><small>API Base URL</small><code>http://localhost:8000/api</code></div>
                    <div class="kv"><small>Docs URL</small><code>http://localhost:8000/api-docs</code></div>
                    <div class="kv"><small>Admin URL</small><code>http://localhost:5173</code></div>
                    <div class="kv"><small>Website URL</small><code>http://localhost:3000</code></div>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Auth Flow (Admin)</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Auth</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="method post">POST</span></td>
                            <td><code>/admin/login</code></td>
                            <td>Public</td>
                            <td>Returns Sanctum token and user object with roles and permissions.</td>
                        </tr>
                        <tr>
                            <td><span class="method get">GET</span></td>
                            <td><code>/admin/me</code></td>
                            <td>Bearer</td>
                            <td>Returns current user payload (id, name, email, roles, permissions).</td>
                        </tr>
                        <tr>
                            <td><span class="method post">POST</span></td>
                            <td><code>/admin/logout</code></td>
                            <td>Bearer</td>
                            <td>Revokes current access token.</td>
                        </tr>
                    </tbody>
                </table>

                <div class="note">
                    For all protected endpoints send:
                    <code>Authorization: Bearer &lt;TOKEN&gt;</code>
                </div>

                <div style="margin-top: 14px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/login - Request Body</strong></p>
<pre>{
  "email": "admin@tashafy.com",
  "password": "Password123!"
}</pre>
                </div>

                <div style="margin-top: 12px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/login - Response (200)</strong></p>
<pre>{
  "token": "&lt;sanctum-token&gt;",
  "user": {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@tashafy.com",
    "roles": ["super-admin"],
    "permissions": ["dashboard.view", "providers.view"]
  }
}</pre>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>RBAC APIs</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Required Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><span class="method get">GET</span></td><td><code>/admin/rbac/permissions</code></td><td><code>roles.view</code></td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/admin/rbac/roles</code></td><td><code>roles.view</code></td></tr>
                        <tr><td><span class="method post">POST</span></td><td><code>/admin/rbac/roles</code></td><td><code>roles.create</code></td></tr>
                        <tr><td><span class="method put">PUT</span></td><td><code>/admin/rbac/roles/{role}</code></td><td><code>roles.update</code></td></tr>
                        <tr><td><span class="method delete">DELETE</span></td><td><code>/admin/rbac/roles/{role}</code></td><td><code>roles.delete</code></td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/admin/rbac/users</code></td><td><code>users.view</code></td></tr>
                        <tr><td><span class="method post">POST</span></td><td><code>/admin/rbac/users</code></td><td><code>users.create</code></td></tr>
                        <tr><td><span class="method put">PUT</span></td><td><code>/admin/rbac/users/{user}</code></td><td><code>users.update</code></td></tr>
                    </tbody>
                </table>

                <p class="foot">Super admin role has global allow through Gate override.</p>

                <div style="margin-top: 14px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/rbac/roles - Request Body</strong></p>
<pre>{
  "name": "content-manager",
  "permissions": ["content.blog.manage", "content.pages.manage"]
}</pre>
                </div>

                <div style="margin-top: 12px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/rbac/roles - Response (201)</strong></p>
<pre>{
  "data": {
    "id": 2,
    "name": "content-manager",
    "permissions": ["content.blog.manage", "content.pages.manage"]
  }
}</pre>
                </div>

                <div style="margin-top: 12px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/rbac/users - Request Body</strong></p>
<pre>{
  "name": "Editor User",
  "email": "editor@tashafy.com",
  "password": "Password123!",
  "roles": ["content-manager"]
}</pre>
                </div>

                <div style="margin-top: 12px;">
                    <p style="margin: 0 0 8px;"><strong>POST /admin/rbac/users - Response (201)</strong></p>
<pre>{
  "data": {
    "id": 5,
    "name": "Editor User",
    "email": "editor@tashafy.com",
    "roles": [{ "id": 2, "name": "content-manager" }],
    "permissions": []
  }
}</pre>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Public Website APIs</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Endpoint</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/content/page/{key}</code></td><td>CMS page content.</td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/content/navigation</code></td><td>Navigation items for website menu/footer.</td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/content/setting/{key}</code></td><td>Public settings (for example <code>app.frontend</code>).</td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/blog</code></td><td>Blog listing.</td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/blog/{slug}</code></td><td>Blog detail.</td></tr>
                        <tr><td><span class="method get">GET</span></td><td><code>/public/providers/{slug}</code></td><td>Provider detail page data.</td></tr>
                        <tr><td><span class="method post">POST</span></td><td><code>/public/reservation-attempts</code></td><td>Logs reservation attempt and returns WhatsApp data.</td></tr>
                    </tbody>
                </table>

                <div style="margin-top: 14px;">
                    <p style="margin: 0 0 8px;"><strong>POST /public/reservation-attempts - Request Body</strong></p>
<pre>{
  "provider_id": 1,
  "provider_package_id": 10,
  "source": "frontend.rehab.package.card",
  "locale": "ar",
  "reservation_type": "package",
  "item_name": "Premium Recovery Program",
  "provider_name": "XYZ Center"
}</pre>
                </div>

                <div style="margin-top: 12px;">
                    <p style="margin: 0 0 8px;"><strong>POST /public/reservation-attempts - Response (201)</strong></p>
<pre>{
  "success": true,
  "data": {
    "attempt": {
      "id": 12,
      "provider_id": 1,
      "provider_package_id": 10,
      "status": "new",
      "whatsapp_url": "https://wa.me/..."
    },
    "whatsapp_url": "https://wa.me/..."
  }
}</pre>
                </div>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Admin CMS APIs (Main Groups)</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Endpoints</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Providers</td>
                            <td><code>/admin/providers</code>, <code>/admin/providers/{provider}</code></td>
                        </tr>
                        <tr>
                            <td>Packages + Items</td>
                            <td><code>/admin/providers/{provider}/packages</code>, <code>/admin/provider-packages/{package}/items</code></td>
                        </tr>
                        <tr>
                            <td>Reservation Options</td>
                            <td><code>/admin/providers/{provider}/reservation-options</code></td>
                        </tr>
                        <tr>
                            <td>Media / Facilities / Doctors / Testimonials</td>
                            <td><code>/admin/providers/{provider}/media</code>, <code>/facilities</code>, <code>/doctors</code>, <code>/testimonials</code></td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td><code>/admin/blog-posts</code>, <code>/admin/pages</code>, <code>/admin/page-sections</code>, <code>/admin/navigation-items</code></td>
                        </tr>
                        <tr>
                            <td>Settings</td>
                            <td><code>/admin/settings</code>, <code>/admin/settings/{key}</code></td>
                        </tr>
                        <tr>
                            <td>Reservations (Admin)</td>
                            <td><code>/admin/reservation-attempts</code>, <code>/admin/reservation-attempts/{reservationAttempt}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Sample Login Request</h2></header>
            <div class="section-body">
<pre>curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tashafy.com","password":"Password123!"}'</pre>
            </div>
        </section>

        <section class="section">
            <header class="section-head"><h2>Error Handling</h2></header>
            <div class="section-body">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Meaning</th>
                            <th>Frontend Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>401</code></td><td>Unauthenticated / expired token</td><td>Clear session, redirect to login.</td></tr>
                        <tr><td><code>403</code></td><td>Permission denied</td><td>Redirect to unauthorized page.</td></tr>
                        <tr><td><code>422</code></td><td>Validation failed</td><td>Render field-level errors.</td></tr>
                    </tbody>
                </table>
                <p class="foot">
                    Full markdown integration document is available in repository:
                    <code>docs/FRONTEND_API_HANDOFF.md</code>
                </p>
            </div>
        </section>
    </main>
</body>
</html>
