<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let item: object = undefined;
  export let className = '';
  export let label = '';
  export let dataIndex = 0;
  export let dataId: number = 0;
  export let iconClasses = '';

  function handleClick() {
    dispatch('clicked', item);
  }
</script>

<button
  class="link card-footer-item {className}"
  aria-label={label}
  tabindex="0"
  on:click={handleClick}
  data-index={dataIndex}
  data-id={dataId}
>
  <i class={iconClasses} />
  <span>{label}</span>
</button>
