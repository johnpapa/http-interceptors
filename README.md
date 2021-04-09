# Tour of Heroes, the Movie Edition - Http Interceptors Demo

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

## Apps in this Repository

There are several apps in this repository.

| Folder                | Description                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| angular-http-hard-way | Angular app using HttpClient directly. Adds headers, invokes a busy/progress indicator, and handles authentication errors without interceptors. |
| angular-app           | Angular app using Http Interceptors.                                                                                                            |
| svelte-app            | Svelte app using Axios Interceptors.                                                                                                            |

## What's in the App

Here is a list of the features in each app (other than the angular-http-hard-way app)

- [x] Pages for home, list of movies, heroes and villains
- [x] HTTP Interceptors
- [x] API
  - [x] json-server is a backend. No database needed.
  - [x] json-server-auth provides signin/out authentication and authorization routes.
  - [x] App served on one port which can access API on another port proxy or CORS)
  - [x] HTTP - Uses most common client http libraries for each framework
  - [x] API routes are restricted to those who sign in except `movies`
  - [x] API route `movies` is readonly to all (no sign in required)
- [x] Viewing/Editing Pages
  - [x] Home and Movies pages are read-only, and require no authentication
  - [x] Heroes and Villains pages support editing, and require authenticatation
- [x] State/Store - Uses a store for state management
- [x] Styling with Bulma, same css in each app, and Font Awesome

## Interceptors

Sequence is super important with interceptors. They flow in sequence for requests, and then in the opposite order for responses.

The flow for Axios Interceptors and for Angulars Http Interceptors is different.

### Angular Http Interceptor Flow

Angular's interceptors flow in the order you provide them. If you provide interceptors A, then B, then C, then requests will flow in A->B->C and responses will flow out C->B->A.

```typescript
// Requests will flow in A->B->C and responses will flow out C->B->A.
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

### Axios Interceptor Flow

Axios's interceptors flow in the reverse of the order you provide them. If you provide interceptors A, then B, then C, then requests will flow in C->B->A and responses will flow out A->B->C.

Therefore, it is important to add them in the reverse of the order you want them to execute.

... but ...

This might make the code confusing to read, since we think of the order that we add them as being how they are applied.
So we:

1. add the functions that apply the interceptors to an array in the order we want them to be applied
2. reverse the array, to get them how Axios interceptors wants them
3. execute the functions that apply the interceptors

```typescript
export function applyHttpInterceptors() {
  globalHeaders();

  const interceptors = [
    /**
     *  Log Http:
     *    This logs all HTTP traffic.
     *    Do this first so it can log the Http call happening in and out (last).
     */
    logHttpInterceptor,
    /**
     * ReadOnly:
     *    This makes sure that HTTP POST, PUT and DELETE are not allowed if the
     *    user does not have permission. If they do not, then it cancels the request.
     *    Do this early, before we add headers, get busy, or execute the request.
     */
    readOnlyInterceptor,
    /**
       SSL:
     *    Ensure SSL by making calls that use http instead use https.
     */
    ensureSSLInterceptor,
    /**
     * Auth:
     *    Add the authentication headers.
     */
    authInterceptor,
    /**
     * CSRF:
     *    Add the CSRF headers.
     */
    csrfInterceptor,
    /**
     *  Log headers:
     *    Log all headers.
     *    Must come after the headers are stuffed and before the request is made.
     */
    logHeadersInterceptor,
    /**
     *  Busy:
     *    Enable and increment the count of HTTP requests, which can be used to show a busy indicator.
     *    Also decrement the count when responses are received, to eventually turn off the busy indicator.
     *    This must happen once it is certain a request will be made,
     *    and right after the response is received.
     */
    busyInterceptor,
    /**
     * Transform Response:
     *    Transform the response, making it easier to consume.
     *    This could happen anywhere in this particular stream,
     *    as it operates on the response.
     */
    transformInterceptor,
  ];

  interceptors.reverse().forEach((f) => f());
}
```

## Problems or Suggestions

[Open an issue here](/issues)

## Resources

- [Angular Essentials for VS Code](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials&WT.mc_id=javascript-0000-jopapa)
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode&WT.mc_id=javascript-0000-jopapa)
- [Axios](https://github.com/axios/axios)
- [Axios Interceptors](https://github.com/axios/axios#interceptors)
- [Angular's HttpClient](https://angular.io/guide/http)
- [Angular HttpClient interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)
- [VS Code](https://code.visualstudio.com/?WT.mc_id=javascript-0000-jopapa)
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=javascript-0000-jopapa)
