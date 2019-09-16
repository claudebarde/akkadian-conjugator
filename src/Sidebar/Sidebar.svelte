<script>
  import { createEventDispatcher } from "svelte";

  import lexicon from "../lexicon/lexicon.js";

  const dispatch = createEventDispatcher();

  const letters = [];
</script>

<style>
  .verbs-menu {
    height: 90vh;
    overflow: auto;
  }

  .verbs-menu a {
    text-decoration: none;
  }

  .letter-order {
    display: none;
  }
</style>

<div>
  <aside class="menu">
    <p class="menu-label">Verbs ({Object.keys(lexicon).length})</p>
    <ul class="menu-list verbs-menu">
      {#each Object.keys(lexicon).sort() as item}
        {#if !letters.includes(item[0].toUpperCase())}
          <span class="letter-order">
            {letters.push(item[0].toUpperCase())}
          </span>
          <p class="menu-label">{item[0].toUpperCase()}</p>
        {/if}
        <li
          on:click={() => dispatch('selectVerb', {
              verb: item,
              details: lexicon[item]
            })}>
          <a>{item}</a>
        </li>
      {/each}
    </ul>
  </aside>
</div>
