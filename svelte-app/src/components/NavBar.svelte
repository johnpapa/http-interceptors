<script lang="ts">
  import { onMount } from 'svelte';
  import { Link, navigate } from 'svelte-routing';
  import * as sessionService from '../store/session.service';
  import { state } from '../store';

  const captains = console;

  const { session } = state;

  // const { activeRoute } = getContext(ROUTER);
  // let message = '';
  // let loggedIn = false;

  onMount(async () => await getUserInfo());

  async function getUserInfo() {
    // loggedIn = sessionService.isLoggedIn();
    // this.message = state.message;
    // this.loggedIn = state.loggedIn;
  }

  function getProps({ href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'router-link-active' };
    }
    return {};
  }

  function signout() {
    sessionService.logout();
    captains.info(`Successfully logged out`);
    navigate('/home');
  }
</script>

<div class="column is-2">
  <nav class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <Link to="/home" {getProps}>Home</Link>
      <Link to="/movies" {getProps}>My Movies</Link>
      <Link to="/heroes" {getProps}>Heroes</Link>
      <!-- <Link to="/villains" {getProps}>Villains</Link> -->
    </ul>
  </nav>
  <nav class="menu auth">
    <p class="menu-label">Auth</p>
    <div class="menu-list auth">
      {#if !$session.loggedIn}
        <Link to="/signin" {getProps}><span>Sign in</span></Link>
      {/if}
      {#if $session.loggedIn}
        <div class="auth-link" on:click={signout}>
          <span>Sign Out</span>
        </div>
      {/if}
    </div>
  </nav>
  <div class="user">
    <p>{$session.message}</p>
  </div>
</div>
