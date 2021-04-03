<script lang="ts">
  import './styles.scss';
  import { Router, Route } from 'svelte-routing';
  import Home from './Home.svelte';
  import Heroes from './heroes/Heroes.svelte';
  import Movies from './Movies.svelte';

  import {
    AuthFailed,
    HeaderBar,
    NavBar,
    PageNotFound,
    Redirect,
    SignIn,
  } from './components';

  export let url: string = '';
</script>

<HeaderBar />
<div class="section columns">
  <Router {url}>
    <NavBar />
    <main class="column">
      <div>
        <Route path="/">
          <Redirect path="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/movies" component={Movies} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/signin" component={SignIn} />
        <Route path="/authfailed" component={AuthFailed} />
        <!-- <Route path="/villains" component={Villains} /> -->
        <Route path="**" component={PageNotFound} />
      </div>
    </main>
  </Router>
</div>
