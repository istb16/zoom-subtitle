<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const click = (e: MouseEvent) => {
    dispatch("click", e);
  };
  export let disabled: boolean = false;
</script>

<button on:click={click} {disabled}>
  <slot />
</button>
