# Copilot Instructions — http-interceptors

## Project Overview

This is a **multi-app comparison repo** (not a monorepo) demonstrating HTTP interceptors in Angular and Svelte. Each app directory is independent — no shared workspace, no shared `node_modules`.

## Code Conventions

### TypeScript

- Use strict TypeScript — all files use `.ts` or `.svelte` extensions
- Prefer explicit type annotations on function parameters and return types
- Use `type` imports for type-only imports (`import type { ... }`)

### Angular Apps

- Interceptors are **classes** implementing `HttpInterceptor` interface
- Register interceptors as `HTTP_INTERCEPTORS` multi-providers in the core module
- Use `@Injectable()` decorator on all interceptor classes
- Feature modules (heroes, villains) are lazy-loaded with their own routing
- State management: `angular-app` uses NgRx, `angular-http-hard-way` uses plain services
- Use `logMessage()` helper from `./log.ts` for interceptor logging — don't use `console.log` directly

### Svelte App

- Interceptors are **plain functions** that register Axios request/response interceptors
- Apply all interceptors via `applyHttpInterceptors()` in `interceptors/index.ts`
- Interceptor order in the array is the **logical** order — the function reverses it for Axios
- Use Svelte stores (`writable`, `derived`) for reactive state
- Components use `.svelte` extension, logic files use `.ts`

### Shared Patterns (both frameworks)

- Interceptor files follow naming: `<purpose>.interceptor.ts`
- Config lives in `http-config.ts` (API URL prefix, logging prefixes)
- Mock backend uses `json-server-auth` with `db.json` and `routes.json`
- Styling uses Bulma CSS framework + SCSS

## File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Interceptor | `<name>.interceptor.ts` | `auth.interceptor.ts` |
| Angular component | `<name>.component.ts` | `hero-detail.component.ts` |
| Angular module | `<name>.module.ts` | `heroes.module.ts` |
| Angular service | `<name>.service.ts` | `hero.service.ts` |
| Svelte component | `<Name>.svelte` | `HeroDetail.svelte` |
| Store/service | `<name>-data.ts` or `<name>.service.ts` | `hero-data.ts` |
| Model/interface | `<name>.ts` in `model/` or `models/` | `hero.ts` |

## Adding a New Interceptor

1. Create `<name>.interceptor.ts` in the interceptors directory
2. **Angular**: create a class implementing `HttpInterceptor`, add to core module providers
3. **Svelte**: create an exported function, add it to the array in `interceptors/index.ts`
4. Add interceptor logging using the `logMessage()` helper and `prefixReq`/`prefixRes` constants
5. Update both Angular and Svelte apps to keep them in sync — this is a comparison repo

## Maintenance Matrix

| When this changes... | Also update... |
|---|---|
| An interceptor in `angular-app` | Mirror the change in `svelte-app` interceptors (and vice versa) |
| An interceptor in `angular-app` | Check if `angular-http-hard-way` needs the same update |
| `db.json` schema | Update all three `db.json` files to stay consistent |
| `routes.json` | Update in all app directories that have it |
| Angular dependencies | Update in both `angular-app` and `angular-http-hard-way` |
| Port numbers | Update `proxy.conf.json`, `package.json` scripts, and `README.md` |
| New entity (beyond heroes/villains/movies) | Add model, service, component, and routes in all apps |
| `README.md` setup instructions | Verify commands still work for all three apps |

## What NOT to Do

- **Don't add a root `package.json`** — these are intentionally independent apps
- **Don't mix interceptor patterns** — Angular uses class-based, Svelte uses function-based
- **Don't remove `db.json`** — it's the mock database, not a build artifact
- **Don't upgrade Angular without testing** — these apps are on Angular 14 with specific RxJS/NgRx versions
