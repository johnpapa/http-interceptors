<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ButtonFooter, CardContent } from '../components';
  import { Villain } from '../models';

  const dispatch = createEventDispatcher();
  export let villains: Villain[] = [];
  export let errorMessage = '';

  function deleteVillain(villain: Villain) {
    dispatch('deleted', villain);
  }

  function selectVillain(villain: Villain) {
    dispatch('selected', villain);
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
  {#if !villains.length && !errorMessage}
    <div>Loading data ...</div>
  {/if}
  {#if villains.length && !errorMessage}
    <ul class="list">
      {#each villains as { id, name, description }, i (id)}
        <li role="presentation">
          <div class="card">
            <CardContent {name} {description} />
            <footer class="card-footer">
              <ButtonFooter
                {...deleteOptions}
                dataId={id}
                dataIndex={i}
                item={villains[i]}
                on:clicked={() => deleteVillain(villains[i])}
              />
              <ButtonFooter
                {...editOptions}
                dataId={id}
                dataIndex={i}
                item={villains[i]}
                on:clicked={() => selectVillain(villains[i])}
              />
            </footer>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
