<script lang="ts">
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import HeroList from './HeroList.svelte';
  import HeroDetail from './HeroDetail.svelte';
  import {
    state,
    getHeroesAction,
    deleteHeroAction,
    addHeroAction,
    updateHeroAction,
  } from '../store';
  import { Hero } from '../models';
  import { logRouteLocation } from '../config';

  const { heroes } = state;

  export let location: Object = {};
  logRouteLocation(location);

  let selectedHero: Hero = undefined;
  let routePath = '/heroes';
  let title = 'Heroes';
  let heroToDelete: Hero = null;
  let message = '';
  let showModal = false;
  let errorMessage = '';

  onMount(async () => await getHeroes());

  function enableAddMode() {
    selectedHero = null;
  }

  function askToDelete({ detail: hero }) {
    heroToDelete = hero;
    showModal = true;
    if (heroToDelete.name) {
      message = `Would you like to delete ${heroToDelete.name}?`;
    }
  }

  function clear() {
    selectedHero = null;
  }

  function closeModal() {
    showModal = false;
  }

  async function deleteHero() {
    closeModal();
    if (heroToDelete) {
      console.log(`You said you want to delete ${heroToDelete.name}`);
      await deleteHeroAction(heroToDelete);
    }
    clear();
  }

  async function getHeroes() {
    errorMessage = undefined;
    try {
      await getHeroesAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }

  async function save({ detail: hero }) {
    console.log('hero changed', hero);
    if (hero.id) {
      await updateHeroAction(hero);
    } else {
      await addHeroAction(hero);
    }
  }

  function selectHero({ detail: hero }) {
    selectedHero = hero;
    console.log(`selected ${hero.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    on:add={enableAddMode}
    on:refresh={getHeroes}
  />
  <div class="columns is-multiline is-variable">
    {#if heroes}
      <div class="column is-8">
        {#if !selectedHero}
          <HeroList
            {errorMessage}
            heroes={$heroes}
            on:deleted={askToDelete}
            on:selected={selectHero}
          />
        {:else}
          <HeroDetail hero={selectedHero} on:unselect={clear} on:save={save} />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteHero}
  />
</div>
