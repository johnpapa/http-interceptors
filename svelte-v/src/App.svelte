<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Heroes from './heroes/Heroes.svelte';
  import Home from './Home.svelte';
  import Movies from './Movies.svelte';
  import Villains from './villains/Villains.svelte';
  import { state } from './store';

  import {
    AuthFailed,
    HeaderBar,
    NavBar,
    PageNotFound,
    Redirect,
    SignIn,
  } from './components';

  import { applyHttpInterceptors } from './interceptors';

  const { busy } = state;

  applyHttpInterceptors();

  export let url: string = '';
</script>

<HeaderBar />
<div class="section columns">
  <Router {url}>
    <NavBar />
    <main class="column">
      <div hidden={!$busy.isBusy}>
        <progress class="progress is-medium is-info" max="100"> 45% </progress>
      </div>
      <div hidden={$busy.isBusy}>
        <Route path="/">
          <Redirect path="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/movies" component={Movies} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/signin" component={SignIn} />
        <Route path="/authfailed" component={AuthFailed} />
        <Route path="/villains" component={Villains} />
        <Route path="**" component={PageNotFound} />
      </div>
    </main>
  </Router>
</div>
