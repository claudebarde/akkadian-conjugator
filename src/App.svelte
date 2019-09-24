<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import state from "./state/state";

  import Navbar from "./Navbar/Navbar.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";
  import GPreteriteBox from "./conjugations/components/Gstem/GPreteriteBox.svelte";
  import GDurativeBox from "./conjugations/components/Gstem/GDurativeBox.svelte";
  import GPrecativeBox from "./conjugations/components/Gstem/GPrecativeBox.svelte";
  import VerbalAdjectiveBox from "./conjugations/components/VerbalAdjectiveBox.svelte";
  import GImperativeBox from "./conjugations/components/Gstem/GImperativeBox.svelte";
  import settings from "./settings/settings.js";
  import highlightRoot from "./settings/highlightRoot.js";

  import lexicon from "./lexicon/lexicon.js";

  let verbInput = "";

  const validateVerb = verb => {
    const entries = Object.keys(lexicon);
    if (entries.includes(verbInput))
      state.updateVerb({
        ...lexicon[verbInput],
        infinitive: verbInput
      });
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

  .conjugatorOptions {
    text-align: center;
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
          validateVerb(verb);
        }} />
    </div>
    {#if !verbInput}
      <div class="column is-10 welcome">
        Select a verb in the left panel to start.
      </div>
    {/if}
    <div class="column is-10">
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
        <div class="columns">
          <div class="column is-3 is-offset-3 conjugatorOptions">
            <label class="checkbox">
              <input
                type="checkbox"
                checked={$state.rootHighlight}
                on:change={state.toggleRootHighlighting} />
              Root highlighting
            </label>
          </div>
          <div class="column is-3 conjugatorOptions">
            <label class="checkbox">
              <input
                type="checkbox"
                checked={$state.ventive}
                on:change={state.toggleVentive} />
              Ventive
            </label>
          </div>
        </div>
      {/if}
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
  </div>
</main>
