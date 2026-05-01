# Copilot Instructions — http-interceptors

## Project Context

This is a comparison monorepo demonstrating HTTP interceptor patterns across frameworks. The same app ("Tour of Heroes, the Movie Edition") is implemented in Angular and Svelte, each using its framework's native HTTP interceptor mechanism.

## Code Style

- **TypeScript** in all apps — use strict types, avoid `any` where possible
- **Angular** — follow Angular style guide (one class per file, barrel exports via `index.ts`, services with `@Injectable`)
- **Svelte** — use TypeScript with `<script lang="ts">`, Svelte stores for state
- **Interceptors** — one interceptor per file, named `<concern>.interceptor.ts`
- **Logging** — use the shared `logMessage()` helper with emoji prefixes (`🔑`, `🛡️`, `📃`, etc.)

## Angular HttpClient Interceptors

Angular interceptors are **class-based** and use dependency injection:

- Implement the `HttpInterceptor` interface from `@angular/common/http`
- Clone the immutable `HttpRequest` to modify it (`req.clone({ setHeaders: ... })`)
- Call `next.handle(modifiedReq)` and pipe RxJS operators for response handling
- Register via `HTTP_INTERCEPTORS` multi-provider in `core/interceptors/index.ts`
- **Order is declaration order** — interceptors A, B, C process requests A→B→C and responses C→B→A

## Svelte / Axios Interceptors

Svelte interceptors are **function-based** and register directly on the global Axios instance:

- Each interceptor is a function that calls `axios.interceptors.request.use()` and/or `axios.interceptors.response.use()`
- Modify the `AxiosRequestConfig` directly (no cloning needed)
- Return `config` from request interceptors, return `response` or `Promise.reject(error)` from response interceptors
- **Order is reversed** — Axios applies interceptors in reverse declaration order, so the codebase reverses the array before applying to achieve logical ordering
- Applied via `applyHttpInterceptors()` in `interceptors/index.ts`

## Maintenance Matrix

This is a comparison project — changes to one app's interceptor logic should usually be mirrored in the other. Use this matrix to determine what else to update:

| When you change... | Also update... |
|---|---|
| An interceptor in `angular-app/src/app/core/interceptors/` | Mirror the same logic in `svelte-app/src/interceptors/` (adapt to Axios pattern) |
| An interceptor in `svelte-app/src/interceptors/` | Mirror the same logic in `angular-app/src/app/core/interceptors/` (adapt to HttpClient pattern) |
| A model in `angular-app/src/app/core/model/` | Update the matching model in `svelte-app/src/models/` |
| A model in `svelte-app/src/models/` | Update the matching model in `angular-app/src/app/core/model/` |
| `db.json` or `routes.json` in any app | Copy to all other apps — the backend data must be identical |
| Interceptor registration order | Verify both apps execute interceptors in the same logical sequence |
| README interceptor documentation | Ensure both Angular and Axios flow sections are consistent |
| Add a new interceptor | Add to **both** `angular-app` and `svelte-app` with matching filename and behavior |
| UI components (Bulma classes, layout) | Keep visual parity across all apps |

**Exception:** `angular-http-hard-way` is intentionally different — it demonstrates the _absence_ of interceptors. Do not add interceptors to it. Only update it if the shared models, backend data, or UI layout changes.

## Adding a New Interceptor

1. Create `<name>.interceptor.ts` in both `angular-app/src/app/core/interceptors/` and `svelte-app/src/interceptors/`
2. For Angular: implement `HttpInterceptor`, add to the `httpInterceptorProviders` array in `index.ts`
3. For Svelte: export a function, add to the `interceptors` array in `index.ts`
4. Place the interceptor in the correct position in both arrays (order matters)
5. Update `README.md` interceptor documentation

## Backend

All apps use `json-server-auth` as a mock backend:

- `db.json` — seed data for heroes, villains, movies, and users
- `routes.json` — route protection rules
- `movies` endpoint is public; `heroes` and `villains` require authentication
- Each app runs its backend on a unique port to avoid conflicts

## What NOT to Do

- Do not add interceptors to `angular-http-hard-way` — its purpose is to show manual HTTP handling
- Do not install a different HTTP client in existing apps (e.g., don't add `fetch` to the Angular app)
- Do not change backend ports without updating proxy configs and README
- Do not modify interceptor order without understanding the cascading effects on request/response flow
