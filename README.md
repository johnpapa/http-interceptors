# Tour of Heroes - Http Interceptors Demo

The Web apps in this monorepo make HTTP requests and require uniform consistency in how they are executed and handled.

This monorepo demonstrates the same app written with Angular and with Svelte. Each app uses HTTP interceptors. The Angular app uses HttpClient and its interceptors while the Svelte app uses Axios and its interceptors.

by [John Papa](http://twitter.com/john_papa)

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/johnpapa/http-interceptors.git tour
   cd tour
   ```

1. Choose your app

   ```bash
   cd angular-app
   # or
   cd svelte-app
   ```

1. Install the npm packages

   ```bash
   npm install
   ```

1. Run the app

   ```bash
   npm run full-stack
   ```

## What's in the App

Here is a list of the features in this app:

- [x] Pages for home, list of movies, heroes and villains
- [x] Client side routing
  - [x] Handles an erroneous route, leading to a PageNotFound component
  - [x] Active route is highlighted in the nav menu
  - [x] Routing should use html5 mode, not hash routes
  - [x] HTTP Interceptors
- [x] API
  - [x] JSON server as a backend
  - [x] App served on one port which can access API on another port proxy or CORS)
  - [x] HTTP - Uses most common client http libraries for each framework
  - [x] API routes are restricted to those who sign in except `movies`
  - [x] API route `movies` is readonly to all (no sign in required)
- [x] Auth
  - [x] Sign in and sign out with json-server-auth
- [x] Styling
  - [x] Bulma
  - [x] SASS
  - [x] Font Awesome
  - [x] Same css in each app
- [x] Editing - Heroes and Villains will be editable (add, update, delete)
- [x] State/Store - Uses a store for state management
- [x] Web development server handles fallback routing
- [x] Generic components
  - [x] Modal
  - [x] Button Tool
  - [x] Card
  - [x] Header bar
  - [x] List header
  - [x] Nav bar
- [x] Props in and emit events out
- [x] Environment variable for the API location

### Why JSON Server?

The app uses a JSON server for a backend by default. This allows you to run the code without needing any database engines or cloud accounts. It also supports authorized routes, which this app takes advantage of. Enjoy!

### Interceptors

Sequence is super important with interceptors. They flow in sequence for requests, and then in the opposite order for responses.

The flow for Axios Interceptors and for Angulars Http Interceptors is different.

#### Angular Http Interceptor Flow

Angular's interceptors flow in the order you provide them. If you provide interceptors A, then B, then C, then requests will flow in A->B->C and responses will flow out C->B->A.

```typescript
export const httpInterceptorProviders = [
  /**
   *  Log Http:
   *    This logs all HTTP traffic.
   *    Do this first so it can log the Http call happening in and out (last).
   */
  addInterceptor(LogHttpInterceptor),
  /**
   * ReadOnly:
   *    This makes sure that HTTP POST, PUT and DELETE are not allowed if the
   *    user does not have permission. If they do not, then it cancels the request.
   *    Do this early, before we add headers, get busy, or execute the request.
   */
  addInterceptor(ReadOnlyInterceptor),
  /**
   SSL:
   *    Ensure SSL by making calls that use http instead use https.
   */
  addInterceptor(EnsureSSLInterceptor),
  /**
   * Auth:
   *    Add the authentication headers.
   */
  addInterceptor(AuthInterceptor),
  /**
   * CSRF:
   *    Add the CSRF headers.
   */
  addInterceptor(CSRFInterceptor),
  /**
   *  Log headers:
   *    Log all headers.
   *    Must come after the headers are stuffed and before the request is made.
   */
  addInterceptor(LogHeadersInterceptor),
  /**
   *  Busy:
   *    Enable and increment the count of HTTP requests, which can be used to show a busy indicator.
   *    Also decrement the count when responses are received, to eventually turn off the busy indicator.
   *    This must happen once it is certain a request will be made,
   *    and right after the response is received.
   */
  addInterceptor(BusyInterceptor),
  /**
   * Transform Response:
   *    Transform the response, making it easier to consume.
   *    This could happen anywhere in this particular stream,
   *    as it operates on the response.
   */
  addInterceptor(TransformInterceptor),
];

function addInterceptor<T>(interceptor: T) {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: interceptor,
    multi: true,
  };
}
```

#### Axios Interceptor Flow

Axios's interceptors flow in the reverse of the order you provide them. If you provide interceptors A, then B, then C, then requests will flow in C->b->A and responses will flow out A->B->C.

Therefore, it is important to add them in the reverse of the order you want them to execute.

```typescript
export function applyHttpInterceptors() {
  globalHeaders();

  /**
   * Transform Response:
   *    Transform the response, making it easier to consume.
   *    This could happen anywhere in this particular stream,
   *    as it operates on the response.
   */
  transformInterceptor();
  /**
   *  Busy:
   *    Enable and increment the count of HTTP requests, which can be used to show a busy indicator.
   *    Also decrement the count when responses are received, to eventually turn off the busy indicator.
   *    This must happen once it is certain a request will be made,
   *    and right after the response is received.
   */
  busyInterceptor();
  /**
   *  Log headers:
   *    Log all headers.
   *    Must come after the headers are stuffed and before the request is made.
   */
  logHeadersInterceptor();
  /**
   * CSRF:
   *    Add the CSRF headers.
   */
  csrfInterceptor();
  /**
   * Auth:
   *    Add the authentication headers.
   */
  authInterceptor();
  /**
   SSL:
   *    Ensure SSL by making calls that use http instead use https.
   */
  ensureSSLInterceptor();
  /**
   * ReadOnly:
   *    This makes sure that HTTP POST, PUT and DELETE are not allowed if the
   *    user does not have permission. If they do not, then it cancels the request.
   *    Do this early, before we add headers, get busy, or execute the request.
   */
  readOnlyInterceptor();
  /**
   *  Log Http:
   *    This logs all HTTP traffic.
   *    Do this first so it can log the Http call happening in and out (last).
   */
  logHttpInterceptor();
}
```

## Problems or Suggestions

[Open an issue here](/issues)

## Resources

- [VS Code](https://code.visualstudio.com/?WT.mc_id=javascript-0000-jopapa)
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=javascript-0000-jopapa)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=javascript-0000-jopapa)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode?WT.mc_id=javascript-0000-jopapa)
- [VS Code - macOS keys](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf?WT.mc_id=javascript-0000-jopapa)
- [VS Code - Windows keys](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf?WT.mc_id=javascript-0000-jopapa)
- [Debugging Angular in VS Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial?WT.mc_id=javascript-0000-jopapa)
