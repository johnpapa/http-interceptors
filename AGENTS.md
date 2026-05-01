# AI Agent Guide — http-interceptors

## Project Overview

This is a **comparison monorepo** that implements the same "Tour of Heroes" application using different front-end frameworks, each demonstrating HTTP interceptor patterns. The goal is to show how the same cross-cutting concerns (auth, CSRF, logging, busy indicators, SSL enforcement) are implemented with different HTTP client libraries.

All apps share the same UI (Bulma CSS, Font Awesome), the same backend (`json-server-auth`), and the same feature set — only the framework and HTTP interceptor mechanism differ.

## Repository Structure

```
http-interceptors/
├── angular-app/                    # Angular + HttpClient interceptors
│   ├── src/app/core/interceptors/  # 8 interceptors (class-based, DI-provided)
│   ├── src/app/heroes/             # Heroes CRUD (requires auth)
│   ├── src/app/villains/           # Villains CRUD (requires auth)
│   ├── src/app/movies/             # Movies read-only (no auth)
│   ├── db.json                     # json-server database
│   └── package.json                # Angular 14, RxJS, NgRx
│
├── angular-http-hard-way/          # Angular WITHOUT interceptors (manual approach)
│   ├── src/app/                    # Same features, headers/auth/busy done inline
│   ├── db.json
│   └── package.json                # Angular 14, no interceptor registration
│
├── svelte-app/                     # Svelte + Axios interceptors
│   ├── src/interceptors/           # 8 interceptors (function-based, Axios API)
│   ├── src/heroes/                 # Heroes CRUD (requires auth)
│   ├── src/villains/               # Villains CRUD (requires auth)
│   ├── src/store/                  # Svelte stores for state management
│   ├── db.json                     # json-server database
│   └── package.json                # Svelte 3, Vite, Axios
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

## Tech Stack

| App | Framework | HTTP Client | Interceptor Mechanism | State Management | Build Tool |
|-----|-----------|-------------|----------------------|------------------|------------|
| `angular-app` | Angular 14 | `@angular/common/http` (HttpClient) | `HttpInterceptor` interface + DI (`HTTP_INTERCEPTORS` multi-provider) | NgRx (Store, Effects, Entity, Data) | Angular CLI |
| `angular-http-hard-way` | Angular 14 | HttpClient (no interceptors) | None — manual inline handling | None (services only) | Angular CLI |
| `svelte-app` | Svelte 3 | Axios | `axios.interceptors.request.use()` / `axios.interceptors.response.use()` | Svelte stores | Vite |

## The 8 Interceptors

Each interceptor app (`angular-app` and `svelte-app`) implements 8 interceptors in this execution order:

| # | Interceptor | Purpose |
|---|-------------|---------|
| 1 | `log-http` | Logs all HTTP traffic (first in, last out) |
| 2 | `read-only` | Blocks POST/PUT/DELETE for unauthorized users |
| 3 | `ensure-ssl` | Rewrites `http://` → `https://` |
| 4 | `auth` | Adds `Authorization: Bearer` header |
| 5 | `csrf` | Adds CSRF token header |
| 6 | `log-headers` | Logs all request headers (after auth/csrf are added) |
| 7 | `busy` | Increments/decrements busy counter for UI indicators |
| 8 | `transform` | Transforms response shape for easier consumption |

**Key difference:** Angular interceptors flow in declared order (A→B→C for requests, C→B→A for responses). Axios interceptors flow in _reverse_ declared order, so the Svelte app reverses the array before applying them to achieve the same logical order.

## Build & Run

Each app is independent. There is no root `package.json` or workspace.

```bash
# Pick an app
cd angular-app    # or svelte-app, or angular-http-hard-way

# Install dependencies
npm install

# Run full-stack (app + json-server backend)
npm run full-stack
```

| App | Dev Port | API Port |
|-----|----------|----------|
| `angular-app` | 4202 | 4302 |
| `angular-http-hard-way` | 4201 | 4301 |
| `svelte-app` | 5173 (Vite default) | 5001 |

## Testing

```bash
# Angular apps only
cd angular-app && npm test    # Karma + Jasmine
cd angular-http-hard-way && npm test

# Svelte app has no test suite
cd svelte-app && npm run check    # svelte-check (type checking only)
```

## Key Patterns and Conventions

### Interceptor Pattern — Angular

Each interceptor is a class implementing `HttpInterceptor`:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(authReq);
  }
}
```

Registered via multi-provider in `angular-app/src/app/core/interceptors/index.ts`.

### Interceptor Pattern — Svelte/Axios

Each interceptor is a function that registers request/response handlers on the global `axios` instance:

```typescript
export function authInterceptor() {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  axios.interceptors.response.use(
    (response) => response,
    (error) => { /* handle 401 */ }
  );
}
```

Applied via `applyHttpInterceptors()` in `svelte-app/src/interceptors/index.ts`.

### Shared Conventions

- **Logging helpers** — both apps use a shared `logMessage()` utility with emoji-prefixed console output
- **Consistent naming** — interceptor filenames match 1:1 between `angular-app` and `svelte-app`
- **Same backend** — all apps use `json-server-auth` with identical `db.json` and `routes.json`
- **Bulma CSS** — all apps share the same visual design

## Adding a New Framework Implementation

To add a new framework (e.g., React, Vue, SolidJS):

1. **Create a new directory** at the repo root: `<framework>-app/`
2. **Scaffold the app** using the framework's CLI tool
3. **Implement the same 8 interceptors** in `<framework>-app/src/interceptors/` (or the framework's conventional path)
4. **Mirror the feature set** — Home, Movies (read-only), Heroes, Villains (CRUD with auth)
5. **Use the same backend** — copy `db.json`, `routes.json`, and `proxy.conf.json` from an existing app; pick a unique port pair
6. **Add `full-stack` script** to `package.json` using `concurrently` to run the app and `json-server-auth`
7. **Match the UI** — use Bulma CSS and Font Awesome for visual consistency
8. **Document interceptor ordering** — explain how the framework's HTTP client handles interceptor sequencing
9. **Update the root `README.md`** — add the new app to the apps table and interceptor flow section

### Interceptor Checklist for New Implementations

Each interceptor must handle the same concern as its counterpart in other apps:

- [ ] `auth` — Add Bearer token header; handle 401 responses (redirect to sign-in)
- [ ] `busy` — Increment counter on request, decrement on response/error
- [ ] `csrf` — Add CSRF token header from cookie
- [ ] `ensure-ssl` — Rewrite HTTP URLs to HTTPS
- [ ] `log-headers` — Log all request headers to console
- [ ] `log-http` — Log request method/URL and response status
- [ ] `read-only` — Block mutating requests for unauthorized users
- [ ] `transform` — Normalize response data shape

## Common Pitfalls

- **Interceptor order matters** — Angular and Axios handle ordering differently. Always verify the actual execution sequence, not just the declaration order.
- **Port conflicts** — each app uses different ports. When adding a new app, pick unused ports and update proxy config.
- **json-server-auth quirks** — the `movies` route is public (no auth), but `heroes` and `villains` require authentication. Match this in your interceptor tests.
- **Angular-http-hard-way is intentionally messy** — it exists to show _why_ interceptors are valuable. Don't refactor it to use interceptors.
