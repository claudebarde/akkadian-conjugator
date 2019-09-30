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
    "Ê",
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
      let str = `${verb} <span class="is-size-7">(${
        lexicon[verb].durativeVowel ? lexicon[verb].durativeVowel + " - " : ""
      }${lexicon[verb].themeVowel})</span>`;
      if (!verbs.hasOwnProperty(initial)) {
        verbs[initial] = [str];
      } else {
        str = verbs[initial] = [...verbs[initial], str];
      }
    });
  });
</script>

<style>
  .mainMenu {
    padding-top: 20px;
    box-shadow: 0.4rem 0 0.5rem -0.4rem rgba(0, 0, 0, 0.7);
  }

  .verbs-menu {
    height: 90vh;
    padding-bottom: 20px;
    overflow: auto;
  }

  .verbs-menu a {
    text-decoration: none;
  }

  .menuItem {
    margin: 0px 10px;
  }

  .github-sidebar {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }

  .github-sidebar-icon {
    vertical-align: bottom;
    width: 20px;
    margin-right: 10px;
  }
</style>

<div class="mainMenu">
  <p class="is-size-7 github-sidebar">
    <a
      href="https://github.com/claudebarde/akkadian-conjugator"
      target="_blank"
      rel="noopener noreferrer">
      <img src="images/github.svg" alt="github" class="github-sidebar-icon" />
      Github Repo
    </a>
  </p>
  <br />
  <aside class="menu">
    <p class="menu-label">Verbs ({Object.keys(lexicon).length})</p>
    <ul class="menu-list verbs-menu">
      {#each alphabet as letter}
        <li class="has-text-grey-light">{letter}</li>
        {#if verbs[letter]}
          {#each verbs[letter].sort(Intl.Collator().compare) as verb}
            <li
              on:click={() => selectNewVerb(verb.split(' ')[0])}
              class="menuItem">
              <a id={verb.split(' ')[0]}>
                {@html verb}
              </a>
            </li>
          {/each}
        {/if}
      {/each}
    </ul>
  </aside>
</div>
