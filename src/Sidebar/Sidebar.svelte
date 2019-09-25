<script>
  import { createEventDispatcher } from "svelte";
  import state from "../state/state";

  import lexicon from "../lexicon/lexicon.js";

  const dispatch = createEventDispatcher();

  const letters = [];

  const selectNewVerb = item => {
    if (item !== $state.infinitive) {
      dispatch("selectVerb", { verb: item, details: lexicon[item] });
      // removes all active elements
      const els = document.getElementsByClassName("is-active");
      while (els[0]) {
        els[0].classList.remove("is-active");
      }
      // adds new active element
      document.getElementById(item).className += " is-active";
    }
  };
</script>

<style>
  .mainMenu {
    padding-top: 20px;
  }

  .verbs-menu {
    height: 87vh;
    padding-bottom: 0px;
    overflow: auto;
  }

  .verbs-menu a {
    text-decoration: none;
  }

  .letter-order {
    display: none;
  }

  .menuItem {
    margin: 0px 10px;
  }
</style>

<div class="mainMenu">
  <aside class="menu">
    <p class="menu-label">Verbs ({Object.keys(lexicon).length})</p>
    <ul class="menu-list verbs-menu">
      {#each Object.keys(lexicon).sort(Intl.Collator().compare) as item}
        {#if !letters.includes(item[0].toUpperCase())}
          <span class="letter-order">
            {letters.push(item[0].toUpperCase())}
          </span>
          <p class="menu-label">{item[0].toUpperCase()}</p>
        {/if}
        <li on:click={() => selectNewVerb(item)} class="menuItem">
          <a id={item}>{item}</a>
        </li>
      {/each}
    </ul>
  </aside>
</div>
