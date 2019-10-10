<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gPerfect from "./Gstem/gPerfect";
  import dPerfect from "./Dstem/dPerfect";

  let verbInput = undefined;
  let conjugation = undefined;
  let previousView = undefined;

  $: if (
    $state.infinitive !== verbInput ||
    $state.activeView !== previousView
  ) {
    previousView = $state.activeView;
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gPerfect";
      conjugatedVerb = gPerfect({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        durativeVowel: $state.durativeVowel
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dPerfect";
      conjugatedVerb = dPerfect({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        durativeVowel: $state.durativeVowel
      });
    }

    state.updateVerb({ ...state, perfect: conjugatedVerb });
  }
</script>

{#if $state.perfect === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.perfect}
    title={`${$state.activeView[0].toUpperCase()} Perfect`}
    {conjugation} />
{/if}
