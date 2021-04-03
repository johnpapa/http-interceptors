<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { ButtonFooter } from '../components';
  import { Hero } from '../models';

  const dispatch = createEventDispatcher();
  export let hero: Hero;
  let editingHero = { ...hero };

  onMount(() => watchHero());

  function clear() {
    dispatch('unselect');
  }

  function saveHero() {
    dispatch('save', editingHero);
    clear();
  }

  function watchHero() {
    if (hero && hero.id) {
      editingHero = { ...hero };
    } else {
      editingHero = { id: undefined, name: '', description: '' };
    }
  }

  const cancelOptions = {
    className: 'card-footer-item cancel-button',
    label: 'Cancel',
    iconClasses: 'fas fa-undo',
  };

  const saveOptions = {
    className: 'card-footer-item save-button',
    label: 'Save',
    iconClasses: 'fas fa-save',
  };
</script>

<div class="card edit-detail">
  <header class="card-header">
    <p class="card-header-title">{editingHero.name}</p>
  </header>
  <div class="card-content">
    <div class="content">
      {#if editingHero.id}
        <div class="field">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="99999"
            readonly
            type="text"
            bind:value={editingHero.id}
          />
        </div>
      {/if}
      <div class="field">
        <label class="label" for="name">name</label>
        <input
          class="input"
          name="name"
          placeholder="Oranges"
          type="text"
          bind:value={editingHero.name}
        />
      </div>
      <div class="field">
        <label class="label" for="description">description</label>
        <input
          class="input"
          name="description"
          placeholder="box"
          type="text"
          bind:value={editingHero.description}
        />
      </div>
    </div>
  </div>

  <footer class="card-footer">
    <ButtonFooter {...cancelOptions} item={editingHero} on:clicked={clear} />
    <ButtonFooter {...saveOptions} item={editingHero} on:clicked={saveHero} />
  </footer>
</div>
