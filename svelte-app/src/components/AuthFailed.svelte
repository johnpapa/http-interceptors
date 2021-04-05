<script lang="ts">
  import { Link } from 'svelte-routing';

  function getProps({ href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'router-link-active' };
    }
    return {};
  }
</script>

<div class="content-container">
  <div class="content-title-group">
    <h2 class="title">Auth Failed</h2>
    <div>
      <p>Authorization Failed</p>
      <Link to="/signin" {getProps} class="button button-primary"
        ><span>Try to log in</span></Link
      >
    </div>
  </div>
</div>
