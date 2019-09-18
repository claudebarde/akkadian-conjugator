<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import Navbar from "./Navbar/Navbar.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";
  import ConjugationBox from "./conjugations/ConjugationBox.svelte";

  import lexicon from "./lexicon/lexicon.js";
  import gPreteriteGenerator from "./conjugations/g-preterite.js";
  import gDurativeGenerator from "./conjugations/g-durative.js";
  import gVerbalAdjectiveGenerator from "./conjugations/g-verbal-adjective.js";

  let verbInput = "";
  let themeVowel = "";
  let gPreterite = undefined;
  let gVerbalAdjective = undefined;
  let gDurative = undefined;
  let resultsVisible = false;
  $: highlightRoot = true;

  $: if (resultsVisible) {
    if (document.getElementById("search-results"))
      document.getElementById("search-results").style.display = "block";
  } else {
    if (document.getElementById("search-results"))
      document.getElementById("search-results").style.display = "none";
  }

  $: if (verbInput.trim().length > 0) {
    // must be at least 2 letters
    if (
      verbInput.trim().length > 1 &&
      document.getElementById("infinitive-input") === document.activeElement
    ) {
      resultsVisible = true;
    } else {
      resultsVisible = false;
    }
    if (verbInput.toLowerCase().match(/[aeiu]_/g)) {
      // puts macrons on long vowels
      const matches = verbInput.trim().match(/[aeiu]_/g);
      matches.forEach(match => {
        switch (match[0]) {
          case "a":
            verbInput = verbInput.replace(match, "ā");
            break;
          case "e":
            verbInput = verbInput.replace(match, "ē");
            break;
          case "i":
            verbInput = verbInput.replace(match, "ī");
            break;
          case "u":
            verbInput = verbInput.replace(match, "ū");
            break;
          default:
            break;
        }
      });
      verbInput = verbInput.toLowerCase().trim();
    } else {
      verbInput = verbInput.toLowerCase().trim();
    }
  } else {
    resultsVisible = false;
    themeVowel = "";
  }

  const addConsonanttoInput = cons => {
    // adds consonants with diacritics after button is pressed
    switch (cons) {
      case "sz":
        verbInput = verbInput + "š";
        break;
      case "sj":
        verbInput = verbInput + "ṣ";
        break;
      case "tj":
        verbInput = verbInput + "ṭ";
        break;
      case "hj":
        verbInput = verbInput + "ḫ";
        break;
      default:
        verbInput = verbInput + "";
        break;
    }
    document.getElementById("infinitive-input").focus();
  };

  const validateVerb = (verb, keyCode) => {
    if (keyCode == 13) {
      const entries = Object.keys(lexicon);
      if (entries.includes(verbInput)) {
        gPreterite = gPreteriteGenerator(verbInput);
        gVerbalAdjective = gVerbalAdjectiveGenerator(verbInput);
        gDurative = gDurativeGenerator(verbInput);
      }
      resultsVisible = false;
    }
  };

  const selectVerb = verb => {
    verbInput = verb;
    if (lexicon[verb]) {
      themeVowel = lexicon[verb].themeVowel;
      validateVerb(verb, 13);
    }
  };

  const positionVerbResults = () => {
    // gets input position
    const searchInput = document.getElementById("infinitive-input");
    const pos = searchInput.getBoundingClientRect();
    const height = searchInput.offsetHeight;
    //console.log(pos.top, pos.left, height);
    // gets navbar height
    const navbarHeight = document.getElementById("navbar").offsetHeight;
    document.getElementById("search-results").style.top =
      pos.top - navbarHeight + height + "px";
    document.getElementById("search-results").style.left = pos.left - 10 + "px";
    document.getElementById("search-results").style.display = "none";
  };

  onMount(() => {
    positionVerbResults();
  });
</script>

<style>
  main {
    padding: 5px 20px;
  }

  .input-tools {
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .input-tools div {
    margin: 2px 10px;
  }

  .infinitive-input {
    width: 200px;
  }

  .search-results {
    width: 200px;
    position: absolute;
    z-index: 30;
    text-align: left;
    padding: 0px;
  }

  .search-results a {
    text-decoration: none;
    color: inherit;
  }

  .diacritic-inputs {
    display: block;
    font-weight: bold;
  }

  .verbal-adjective {
    margin-left: 15px;
  }
</style>

<Navbar />
<main>
  <div class="columns">
    <div class="column is-2">
      <Sidebar
        on:selectVerb={event => {
          const verb = event.detail;
          verbInput = verb.verb;
          themeVowel = verb.details.themeVowel;
          validateVerb(verb, 13);
        }} />
    </div>
    <div class="column">
      <div class="input-tools">
        <div>
          <div class="buttons are-small diacritic-inputs">
            <button class="button" on:click={() => addConsonanttoInput('sz')}>
              Š
            </button>
            <button class="button" on:click={() => addConsonanttoInput('sj')}>
              Ṣ
            </button>
            <button class="button" on:click={() => addConsonanttoInput('tj')}>
              Ṭ
            </button>
            <button class="button" on:click={() => addConsonanttoInput('hj')}>
              Ḫ
            </button>
          </div>
        </div>
        <div>
          <input
            id="infinitive-input"
            class="input infinitive-input"
            type="text"
            bind:value={verbInput}
            placeholder="Infinitive form"
            on:keydown={event => validateVerb(verbInput, event.keyCode)}
            on:blur={() => window.setTimeout(() => {
                resultsVisible = false;
              }, 150)}
            on:focus={() => (verbInput.trim().length > 0 ? (resultsVisible = true) : null)} />
          <div class="box search-results" id="search-results">
            {#if resultsVisible}
              <div class="menu">
                <ul class="menu-list" id="search-results-menu">
                  {#each Object.keys(lexicon)
                    .filter(item => item.includes(verbInput.trim()))
                    .sort() as item, i (item)}
                    <li on:click={() => selectVerb(item)}>
                      <a href="#">{item}</a>
                    </li>
                  {:else}
                    <li>
                      <a href="#">No result</a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>
        <div>
          <div class="select is-small">
            <select
              value={themeVowel}
              on:change={event => (themeVowel = event.target.value)}>
              <option value="">Theme Vowel</option>
              <option value="a">A</option>
              <option value="ā">Ā</option>
              <option value="e">E</option>
              <option value="ē">Ē</option>
              <option value="i">I</option>
              <option value="ī">Ī</option>
              <option value="u">U</option>
              <option value="ū">Ū</option>
            </select>
          </div>
        </div>
        <div>
          <label class="checkbox">
            <input type="checkbox" bind:checked={highlightRoot} />
            Highlight Root
          </label>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third">
          {#if gPreterite && lexicon[verbInput]}
            <ConjugationBox
              verb={gPreterite}
              title="G Preterite"
              root={lexicon[verbInput].root}
              conjugation="gPreterite"
              rootHighlight={highlightRoot} />
          {/if}
        </div>
        <div class="column is-one-third">
          {#if gDurative && lexicon[verbInput]}
            <ConjugationBox
              verb={gDurative}
              title="G Durative"
              root={lexicon[verbInput].root}
              conjugation="gDurative"
              rootHighlight={highlightRoot} />
          {/if}
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third">
          {#if gVerbalAdjective && lexicon[verbInput]}
            <div class="box">
              <p class="has-text-weight-bold">G Verbal Adjective:</p>
              <p class="verbal-adjective">
                {@html gVerbalAdjective[0]}
                /
                {@html gVerbalAdjective[1]}
                (
                {@html gVerbalAdjective[2]}
                )
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>
