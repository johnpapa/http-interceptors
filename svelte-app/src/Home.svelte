<script lang="ts">
  import { Link } from 'svelte-routing';

  export let location: any;
  const noop = location; // TODO: exists only to make location wraning go away
</script>

<div class="content-container">
  <div class="content-title-group">
    <h2 class="title">Tour of Heroes</h2>
    <p>Manage your movies! Log in to manage the movies' heroes and villains.</p>
    <br />
    <div class="button-group">
      <button class="button" aria-label="My Movies">
        <Link to="/movies">
          <i class="fas fa-film" />
          My Movies
        </Link>
      </button>
      <button class="button" aria-label="Heroes" tabindex="0">
        <Link to="/heroes"><i class="fas fa-mask" /> Heroes</Link>
      </button>
      <button class="button" aria-label="Villains" tabindex="0">
        <Link to="/villains"><i class="fas fa-user-ninja" /> Villains</Link>
      </button>
      <button class="button" aria-label="My Movies">
        <a
          href="https://github.com/johnpapa/http-interceptors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-github" />
          Code in GitHub
        </a>
      </button>
      <button class="button" aria-label="Twitter">
        <a
          href="https://twitter.com/john_papa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fab fa-twitter" />
          John on Twitter
        </a>
      </button>
    </div>
  </div>
</div>
