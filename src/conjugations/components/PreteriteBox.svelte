<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gPreterite from "./Gstem/gPreterite";
  import dPreterite from "./Dstem/dPreterite";
  import shPreterite from "./Shstem/shPreterite";

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
      conjugation = "gPreterite";
      title = "G Preterite";
      conjugatedVerb = gPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: false,
        onlyDstem: $state.onlyDstem
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dPreterite";
      title = "D Preterite";
      conjugatedVerb = dPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: false
      });
    } else if ($state.activeView === "shstem") {
      conjugation = "shPreterite";
      title = "Š Preterite";
      conjugatedVerb = shPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: false
      });
    }

    state.updateVerb({ ...state, preterite: conjugatedVerb });
  }
</script>

{#if $state.preterite === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.preterite}
    {title}
    {conjugation}
    vetitive={false} />
{/if}
