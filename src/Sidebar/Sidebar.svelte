<script>
  import { createEventDispatcher, onMount } from "svelte";
  import state from "../state/state";

  import lexicon from "../lexicon/lexicon.js";

  const dispatch = createEventDispatcher();

  const letters = [];
  const alphabet = [
    "A",
    "B",
    "D",
    "E",
    "G",
    "Ḫ",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "Š",
    "Ṣ",
    "T",
    "Ṭ",
    "W",
    "Z"
  ];
  const verbs = {};

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

  onMount(() => {
    Object.keys(lexicon).forEach(verb => {
      const initial = verb[0].toUpperCase();
      if (!verbs.hasOwnProperty(initial)) {
        verbs[initial] = [verb];
      } else {
        verbs[initial] = [...verbs[initial], verb];
      }
    });
  });
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

  .menuItem {
    margin: 0px 10px;
  }
</style>

<div class="mainMenu">
  <aside class="menu">
    <p class="menu-label">Verbs ({Object.keys(lexicon).length})</p>
    <ul class="menu-list verbs-menu">
      {#each alphabet as letter}
        <li class="has-text-grey-light">{letter}</li>
        {#if verbs[letter]}
          {#each verbs[letter].sort(Intl.Collator().compare) as verb}
            <li on:click={() => selectNewVerb(verb)} class="menuItem">
              <a id={verb}>{verb}</a>
            </li>
          {/each}
        {/if}
      {/each}
    </ul>
  </aside>
</div>
