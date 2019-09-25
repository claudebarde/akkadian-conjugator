<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import state from "./state/state";

  import Navbar from "./Navbar/Navbar.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";
  import GPreteriteBox from "./conjugations/components/Gstem/GPreteriteBox.svelte";
  import GDurativeBox from "./conjugations/components/Gstem/GDurativeBox.svelte";
  import GPrecativeBox from "./conjugations/components/Gstem/GPrecativeBox.svelte";
  import VerbalAdjectiveBox from "./conjugations/components/VerbalAdjectiveBox.svelte";
  import GImperativeBox from "./conjugations/components/Gstem/GImperativeBox.svelte";
  import GPerfectBox from "./conjugations/components/Gstem/GPerfectBox.svelte";
  import settings from "./settings/settings.js";
  import highlightRoot from "./settings/highlightRoot.js";

  import lexicon from "./lexicon/lexicon.js";

  let verbInput = "";
  let verbTag = false;
  let verbInfo = "";

  const validateVerb = verb => {
    const entries = Object.keys(lexicon);
    if (entries.includes(verbInput))
      state.setVerb({
        ...lexicon[verbInput],
        infinitive: verbInput
      });
    const { durativeVowel, themeVowel } = lexicon[verbInput];
    if (durativeVowel) {
      verbInfo = `( ${durativeVowel} - ${themeVowel} )`;
    } else {
      verbInfo = `( ${themeVowel} )`;
    }
  };

  const displayVerbTitle = event => {
    const verbTitle = document.getElementById("verbTitle");
    const verbTitlePos = verbTitle.getBoundingClientRect();
    if (verbTitlePos.top < 0) {
      verbTitle.style.visibility = "hidden";
      verbTag = true;
    } else {
      verbTitle.style.visibility = "visible";
      verbTag = false;
    }
  };
</script>

<style>
  main {
    padding: 0px 20px;
    height: 100%;
    overflow: hidden;
  }

  .welcome {
    text-align: center;
    margin-top: 50px;
  }

  #verbTitle {
    text-align: center;
    margin-top: 50px;
  }

  #scrolledTitle {
    position: fixed;
    margin-top: 10px;
    padding: 0px;
    /*border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;*/
    z-index: 99;
  }

  .tables {
    margin-top: 20px;
    overflow: auto;
  }

  .lastColumns {
    padding-bottom: 50px;
  }

  .conjugatorOptions {
    text-align: center;
  }

  .mainColumn {
    overflow-y: auto;
    overflow-x: hidden;
    height: 95vh;
  }

  .mainColumn::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
</style>

<Navbar
  on:selectVerb={event => {
    const verb = event.detail;
    verbInput = verb.verb;
    validateVerb(verb);
  }} />
<main>
  <div class="columns">
    <div class="column is-hidden-mobile is-2">
      <Sidebar
        on:selectVerb={event => {
          const verb = event.detail;
          verbInput = verb.verb;
          validateVerb(verb);
        }} />
    </div>
    {#if !verbInput}
      <div class="column is-10 welcome">
        Select a verb in the left panel to start.
      </div>
    {/if}
    <div class="column is-10">
      {#if verbTag}
        <div id="scrolledTitle" transition:fade>
          <div class="control">
            <div class="tags has-addons">
              <span class="tag is-dark">{verbInput.toUpperCase()}</span>
              <span class="tag is-info">{verbInfo}</span>
            </div>
          </div>
        </div>
      {/if}
      {#if verbInput}
        <div class="mainColumn" on:scroll={displayVerbTitle}>
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <article
                class="message is-primary"
                id="verbTitle"
                transition:fade>
                <div class="message-body">
                  <p>
                    <strong>{verbInput.toUpperCase()}</strong>
                  </p>
                  <p>{lexicon[verbInput].meaning}</p>
                </div>
              </article>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3 is-offset-3 conjugatorOptions">
              <label class="checkbox is-size-7-mobile">
                <input
                  type="checkbox"
                  checked={$state.rootHighlight}
                  on:change={state.toggleRootHighlighting} />
                Root highlighting
              </label>
            </div>
            <div class="column is-3 conjugatorOptions">
              <label class="checkbox is-size-7-mobile">
                <input
                  type="checkbox"
                  checked={$state.ventive}
                  on:change={state.toggleVentive} />
                Ventive
              </label>
            </div>
          </div>
          <div class="columns tables">
            <div class="column is-two-fifths is-offset-1">
              <GPreteriteBox />
            </div>
            <div class="column is-two-fifths">
              <GDurativeBox />
            </div>
          </div>
          <div class="columns">
            <div class="column is-two-fifths is-offset-1">
              <GPerfectBox />
            </div>
            <div class="column is-two-fifths">
              <GPreteriteBox vetitive={true} />
            </div>
          </div>
          <div class="columns">
            <div class="column is-3">
              <GImperativeBox />
            </div>
            <div class="column is-4">
              <GPrecativeBox />
            </div>
          </div>
          <div class="columns lastColumns">
            <div class="column is-one-third">
              <VerbalAdjectiveBox />
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
