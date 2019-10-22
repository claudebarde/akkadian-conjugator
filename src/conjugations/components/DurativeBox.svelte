<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gDurative from "./Gstem/gDurative";
  import dDurative from "./Dstem/dDurative";
  import shDurative from "./SHstem/shDurative";

  let verbInput = undefined;
  let conjugation = undefined;
  let previousView = undefined;
  let title = "";

  $: if (
    $state.infinitive !== verbInput ||
    $state.activeView !== previousView
  ) {
    previousView = $state.activeView;
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gDurative";
      title = "G Durative";
      conjugatedVerb = gDurative({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        durativeVowel: $state.durativeVowel,
        onlyDstem: $state.onlyDstem
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dDurative";
      title = "D Durative";
      conjugatedVerb = dDurative({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        durativeVowel: $state.durativeVowel
      });
    } else if ($state.activeView === "shstem") {
      conjugation = "shDurative";
      title = "Š Durative";
      conjugatedVerb = shDurative({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        durativeVowel: $state.durativeVowel
      });
    }

    state.updateVerb({ ...state, durative: conjugatedVerb });
  }
</script>

{#if $state.durative === undefined}
  <div />
{:else}
  <ConjugationBox verb={$state.durative} {title} {conjugation} />
{/if}
