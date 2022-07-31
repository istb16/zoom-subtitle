<script lang="ts">
  export let input: HTMLElement = this;
  export let value: string;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const blur = (e: FocusEvent) => {
    dispatch("blur", e);
  };
</script>

<input type="text" bind:this={input} bind:value on:blur={blur} />
