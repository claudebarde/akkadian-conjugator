<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  import Navbar from "./Navbar/Navbar.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";
  import ConjugationBox from "./conjugations/ConjugationBox.svelte";
  import settings from "./settings/settings.js";
  import highlightRoot from "./settings/highlightRoot.js";

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
  $: rootHighlight = true;

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
    const entries = Object.keys(lexicon);
    if (entries.includes(verbInput)) {
      themeVowel = lexicon[verb].themeVowel;
      gPreterite = gPreteriteGenerator(verbInput);
      gVerbalAdjective = gVerbalAdjectiveGenerator(verbInput);
      gDurative = gDurativeGenerator(verbInput);
    }
  };
</script>

<style>
  main {
    padding: 0px 20px;
    height: 100%;
  }

  .welcome {
    text-align: center;
    padding-top: 50px;
  }

  .verbTitle {
    text-align: center;
    padding-top: 50px;
  }

  .tables {
    margin-top: 20px;
    overflow: auto;
  }

  .lastColumns {
    padding-bottom: 50px;
  }
</style>

<Navbar />
<main>
  <div class="columns">
    <div class="column is-hidden-mobile is-2">
      <Sidebar
        on:selectVerb={event => {
          const verb = event.detail;
          verbInput = verb.verb;
          themeVowel = verb.details.themeVowel;
          validateVerb(verb, 13);
        }} />
    </div>
    {#if !verbInput}
      <div class="column is-10 welcome">
        Select a verb in the left panel to start.
      </div>
    {/if}
    <div class="column">
      {#if verbInput}
        <div class="columns">
          <div class="column is-6 is-offset-3 verbTitle">
            <article class="message is-primary">
              <div class="message-body">
                <p>
                  <strong>{verbInput.toUpperCase()}</strong>
                </p>
                <p>{lexicon[verbInput].meaning}</p>
              </div>
            </article>
          </div>
        </div>
      {/if}
      <div class="columns tables">
        <div class="column is-one-third">
          {#if gPreterite && lexicon[verbInput]}
            <ConjugationBox
              verb={gPreterite}
              title="G Preterite"
              root={lexicon[verbInput].root}
              conjugation="gPreterite"
              {rootHighlight}
              infinitive={verbInput} />
          {/if}
        </div>
        <div class="column is-one-third">
          {#if gDurative && lexicon[verbInput]}
            <ConjugationBox
              verb={gDurative}
              title="G Durative"
              root={lexicon[verbInput].root}
              conjugation="gDurative"
              {rootHighlight}
              infinitive={verbInput} />
          {/if}
        </div>
      </div>
      <div class="columns lastColumns">
        <div class="column is-one-third">
          {#if gVerbalAdjective && lexicon[verbInput]}
            <div
              class="message is-primary"
              transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
              <div class="message-header">
                <p>Non-finite forms</p>
              </div>
              <div class="message-body">
                <p>
                  <strong>Verbal Adjective:</strong>
                </p>
                <p class="verbal-adjective">
                  {#if rootHighlight}
                    <span>
                      {@html highlightRoot({
                        verb: gVerbalAdjective[0],
                        root: lexicon[verbInput].root,
                        conjugation: 'verbalAdjective',
                        ps: 'masculin',
                        infinitive: verbInput
                      })}
                    </span>
                  {:else}
                    <span>
                      {@html gVerbalAdjective[0]}
                    </span>
                  {/if}
                  /
                  {#if rootHighlight}
                    <span>
                      {@html highlightRoot({
                        verb: gVerbalAdjective[1],
                        root: lexicon[verbInput].root,
                        conjugation: 'verbalAdjective',
                        ps: 'feminin',
                        infinitive: verbInput
                      })}
                    </span>
                  {:else}
                    <span>
                      {@html gVerbalAdjective[1]}
                    </span>
                  {/if}
                  (
                  {#if rootHighlight}
                    <span>
                      {@html highlightRoot({
                        verb: gVerbalAdjective[2],
                        root: lexicon[verbInput].root,
                        conjugation: 'verbalAdjective',
                        ps: 'feminin',
                        infinitive: verbInput
                      })}
                    </span>
                  {:else}
                    <span>
                      {@html gVerbalAdjective[2]}
                    </span>
                  {/if}
                  )
                </p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>
