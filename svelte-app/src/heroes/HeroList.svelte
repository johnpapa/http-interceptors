<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ButtonFooter, CardContent } from '../components';
  import { Hero } from '../models';

  const dispatch = createEventDispatcher();
  export let heroes: Hero[] = [];
  export let errorMessage = '';

  function deleteHero(hero: Hero) {
    dispatch('deleted', hero);
  }

  function selectHero(hero: Hero) {
    dispatch('selected', hero);
  }

  const deleteOptions = {
    className: 'delete-item',
    label: 'Delete',
    iconClasses: 'fas fa-trash',
  };

  const editOptions = {
    className: 'edit-item',
    label: 'Edit',
    iconClasses: 'fas fa-edit',
  };
</script>

<div>
  {#if errorMessage}
    <div>{errorMessage}</div>
  {/if}
  {#if !heroes.length && !errorMessage}
    <div>Loading data ...</div>
  {/if}
  <ul class="list">
    {#each heroes as { id, name, description }, i (id)}
      <li role="presentation">
        <div class="card">
          <CardContent {name} {description} />
          <footer class="card-footer">
            <ButtonFooter
              {...deleteOptions}
              dataId={id}
              dataIndex={i}
              item={heroes[i]}
              on:clicked={() => deleteHero(heroes[i])}
            />
            <ButtonFooter
              {...editOptions}
              dataId={id}
              dataIndex={i}
              item={heroes[i]}
              on:clicked={() => selectHero(heroes[i])}
            />
          </footer>
        </div>
      </li>
    {/each}
  </ul>
</div>
