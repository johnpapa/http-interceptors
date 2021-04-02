<script lang="ts">
  import { ListHeader } from './components';

  import { onMount } from 'svelte';
  import { state, getMoviesAction } from './store';

  export const location: Object = {};

  let errorMessage: string = '';
  let { movies } = state;

  onMount(async () => await getMovies());

  async function getMovies() {
    errorMessage = '';
    try {
      await getMoviesAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }
  let showAdd: boolean = false;
</script>

<div class="content-container">
  <ListHeader title="My Movies" on:refresh={getMovies} {showAdd} />
  <div>
    {#if errorMessage}
      <div>{errorMessage}</div>
    {/if}
    {#if !$movies.length && !errorMessage}
      <div>Loading data ...</div>
    {/if}
    <ul class="list">
      {#each $movies as { id, name, year, length }, _i (id)}
        <li role="presentation">
          <div class="card">
            <div class="card-content">
              <div class="content movie-grid">
                <span class="label">Name:</span>
                <span>{name}</span>
                <span class="label">Year:</span>
                <span>{year}</span>
                <span class="label">Length:</span>
                <span>{length}</span>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
