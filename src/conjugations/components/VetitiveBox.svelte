<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gPreterite from "./Gstem/gPreterite";
  import dPreterite from "./Dstem/dPreterite";
  import shPreterite from "./SHstem/shPreterite";

  let verbInput = undefined;
  let conjugation = undefined;
  let title = "";

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gPreterite";
      title = "G Vetitive";
      conjugatedVerb = gPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: true,
        onlyDstem: $state.onlyDstem
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dPreterite";
      title = "D Vetitive";
      conjugatedVerb = dPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: true
      });
    } else if ($state.activeView === "shstem") {
      conjugation = "shPreterite";
      title = "Š Vetitive";
      conjugatedVerb = shPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: true
      });
    }

    state.updateVerb({ ...state, vetitive: conjugatedVerb });
  }
</script>

{#if $state.preterite === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.vetitive}
    {title}
    {conjugation}
    vetitive={true} />
{/if}
