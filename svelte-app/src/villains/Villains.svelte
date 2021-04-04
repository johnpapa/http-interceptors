<script lang="ts">
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import VillainList from './VillainList.svelte';
  import VillainDetail from './VillainDetail.svelte';
  import {
    state,
    getVillainsAction,
    deleteVillainAction,
    addVillainAction,
    updateVillainAction,
  } from '../store';
  import { Villain } from '../models';
  import { logRouteLocation } from '../config';

  const { villains } = state;

  export let location: Object = {};
  logRouteLocation(location);

  let selectedVillain: Villain = undefined;
  let routePath = '/villains';
  let title = 'Villains';
  let villainToDelete: Villain = null;
  let message = '';
  let showModal = false;
  let errorMessage = '';

  onMount(async () => await getVillains());

  function enableAddMode() {
    selectedVillain = null;
  }

  function askToDelete({ detail: villain }) {
    villainToDelete = villain;
    showModal = true;
    if (villainToDelete.name) {
      message = `Would you like to delete ${villainToDelete.name}?`;
    }
  }

  function clear() {
    selectedVillain = null;
  }

  function closeModal() {
    showModal = false;
  }

  async function deleteVillain() {
    closeModal();
    if (villainToDelete) {
      console.log(`You said you want to delete ${villainToDelete.name}`);
      await deleteVillainAction(villainToDelete);
    }
    clear();
  }

  async function getVillains() {
    errorMessage = undefined;
    try {
      await getVillainsAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }

  async function save({ detail: villain }) {
    console.log('villain changed', villain);
    if (villain.id) {
      await updateVillainAction(villain);
    } else {
      await addVillainAction(villain);
    }
  }

  function selectVillain({ detail: villain }) {
    selectedVillain = villain;
    console.log(`selected ${villain.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    on:add={enableAddMode}
    on:refresh={getVillains}
  />
  <div class="columns is-multiline is-variable">
    {#if villains}
      <div class="column is-8">
        {#if !selectedVillain}
          <VillainList
            {errorMessage}
            villains={$villains}
            on:deleted={askToDelete}
            on:selected={selectVillain}
          />
        {:else}
          <VillainDetail
            villain={selectedVillain}
            on:unselect={clear}
            on:save={save}
          />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteVillain}
  />
</div>
