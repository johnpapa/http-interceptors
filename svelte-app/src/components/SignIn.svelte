<script lang="ts">
  import { navigate } from 'svelte-routing';
  import ButtonFooter from './ButtonFooter.svelte';
  import * as sessionService from '../store/session.service';
  import queryString from 'query-string';

  export let location: any;

  let queryParams;
  $: queryParams = queryString.parse(location.search);

  const captains = console;

  let email = 'john@contoso.com';
  let password = '1234';

  const cancelOptions = {
    className: 'card-footer-item cancel-button',
    label: 'Cancel',
    iconClasses: 'fas fa-undo',
  };

  const saveOptions = {
    className: 'card-footer-item save-button',
    label: 'Sign in',
    iconClasses: 'fas fa-sign-in-alt',
  };

  async function signin() {
    await sessionService.signin(email, password);
    const redirectTo = queryParams.redirectTo;
    if (sessionService.isLoggedIn()) {
      captains.info(`Successfully logged in`);
      const url = redirectTo ? redirectTo : '/home';
      navigate(url);
    }
  }

  function cancel() {
    navigate('/home');
  }
</script>

<div class="card signin">
  <header class="card-header">
    <p class="card-header-title">Sign In</p>
  </header>
  <div class="card-content">
    <div class="content">
      <div class="field">
        <label class="label" for="email"> email </label>
        <input
          name="email"
          class="input"
          type="email"
          bind:value={email}
          placeholder="e.g. john@contoso.com"
        />
      </div>
      <div class="field">
        <label class="label" for="password"> Password </label>
        <input
          name="password"
          class="input"
          type="password"
          bind:value={password}
          placeholder="1234"
        />
      </div>
    </div>
  </div>
  <footer class="card-footer ">
    <ButtonFooter {...cancelOptions} on:clicked={cancel} />
    <ButtonFooter {...saveOptions} on:clicked={signin} />
  </footer>
</div>
