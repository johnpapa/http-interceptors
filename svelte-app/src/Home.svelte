<script lang="ts">
  import { Link } from 'svelte-routing';
</script>

<div class="content-container">
  <div class="content-title-group">
    <h2 class="title">Tour of Movies</h2>
    <p>Manage your movies!</p>
    <p>Log in to start enjoying your benefits.</p>
    <br />
    <div class="button-group">
      <button class="button" aria-label="Heroes" tabindex="0">
        <Link to="/products"><i class="fas fa-clipboard-list" /> Heroes</Link>
      </button>
      <button class="button" aria-label="My Movies">
        <Link to="/movies">
          <i class="fas fa-money-bill-alt" />
          My Movies
        </Link>
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
    </div>
  </div>
</div>
