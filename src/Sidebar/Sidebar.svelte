<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { slide } from "svelte/transition";
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
    "I",
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
    "U",
    "W",
    "Z"
  ];
  let verbs = {};
  let verbsDropdown = false;
  $: verbType = "allverbs";

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

  const showVerbsDropdown = () => {
    verbsDropdown = !verbsDropdown;
  };

  const selectVerbType = newVerbType => {
    verbType = newVerbType;
    verbsDropdown = false;
    verbs = { ...createVerbsList() };
  };

  const createVerbsList = () => {
    let verbs = {};
    let newList = [];
    if (verbType === "allverbs") {
      newList = Object.keys(lexicon);
    } else if (verbType === "Iweak") {
      newList = Object.keys(lexicon).filter(el => lexicon[el].root[0] === "Ø");
    } else if (verbType === "IIweak") {
      newList = Object.keys(lexicon).filter(el => lexicon[el].root[1] === "Ø");
    } else if (verbType === "IIIweak") {
      newList = Object.keys(lexicon).filter(el => lexicon[el].root[2] === "Ø");
    }

    newList.forEach(verb => {
      const initial = verb[0].toUpperCase();
      let str = `${verb} <span class="is-size-7">(${
        lexicon[verb].durativeVowel ? lexicon[verb].durativeVowel + " - " : ""
      }${lexicon[verb].themeVowel || "-"})</span>`;
      if (!verbs.hasOwnProperty(initial)) {
        verbs[initial] = [str];
      } else {
        str = verbs[initial] = [...verbs[initial], str];
      }
    });

    return verbs;
  };

  onMount(() => {
    verbs = createVerbsList(lexicon);
  });
</script>

<style>
  .mainMenu {
    padding-top: 20px;
    box-shadow: 0.4rem 0 0.5rem -0.4rem rgba(0, 0, 0, 0.7);
  }

  .verbs-menu {
    height: 90vh;
    padding-bottom: 50px;
    overflow: auto;
  }

  .verbs-menu a {
    text-decoration: none;
  }

  .menuItem {
    margin: 0px 10px;
  }

  .link-sidebar {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .link-sidebar-bottom {
    margin-bottom: 10px;
  }

  .link-sidebar-icon {
    vertical-align: top;
    width: 15px;
    margin-right: 5px;
  }
</style>

<div class="mainMenu">
  <p class="is-size-7 is-hidden-desktop link-sidebar">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSerY00WPuuPj0CNWZkdF3bfFn-0rlFnQkB5K8BiLlmckcjOCQ/viewform?usp=sf_link"
      target="_blank"
      rel="noopener noreferrer">
      <img src="images/list.svg" alt="contact-form" class="link-sidebar-icon" />
      Contact Form
    </a>
  </p>
  <p class="is-size-7 is-hidden-desktop link-sidebar link-sidebar-bottom">
    <a
      href="https://github.com/claudebarde/akkadian-conjugator"
      target="_blank"
      rel="noopener noreferrer">
      <img src="images/github.svg" alt="github" class="link-sidebar-icon" />
      Github Repo
    </a>
  </p>
  <aside class="menu">
    <div class="menu-label">
      <div class="dropdown" class:is-active={verbsDropdown}>
        <div class="dropdown-trigger" on:click={showVerbsDropdown}>
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu">
            <span>Verbs ({Object.keys(lexicon).length})</span>
            <span class="icon is-small">
              <img src="images/chevron-down.svg" alt="chevron down" />
            </span>
          </button>
        </div>
        {#if verbsDropdown}
          <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu"
            transition:slide={{ y: 20, duration: 200 }}>
            <div class="dropdown-content">
              <a
                href="#"
                class={`dropdown-item is-size-7 ${verbType === 'allverbs' && 'is-active'}`}
                on:click={() => selectVerbType('allverbs')}>
                All verbs
              </a>
              <a
                href="#"
                class={`dropdown-item is-size-7 ${verbType === 'Iweak' && 'is-active'}`}
                on:click={() => selectVerbType('Iweak')}>
                I-weak verbs
              </a>
              <a
                href="#"
                class={`dropdown-item is-size-7 ${verbType === 'IIweak' && 'is-active'}`}
                on:click={() => selectVerbType('IIweak')}>
                II-weak verbs
              </a>
              <a
                href="#"
                class={`dropdown-item is-size-7 ${verbType === 'IIIweak' && 'is-active'}`}
                on:click={() => selectVerbType('IIIweak')}>
                III-weak verbs
              </a>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <ul class="menu-list verbs-menu">
      {#each alphabet as letter}
        {#if verbs[letter]}
          <li class="has-text-grey-light">{letter}</li>
        {/if}
        {#if verbs[letter]}
          {#each verbs[letter].sort(Intl.Collator().compare) as verb}
            <li
              on:click={() => selectNewVerb(verb.split(' ')[0])}
              class="menuItem">
              <a href="#" id={verb.split(' ')[0]}>
                {@html verb}
              </a>
            </li>
          {/each}
        {/if}
      {/each}
    </ul>
  </aside>
</div>
