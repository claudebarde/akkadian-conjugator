<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gPreterite from "./Gstem/gPreterite";
  import dPreterite from "./Dstem/dPreterite";

  let verbInput = undefined;
  let conjugation = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gPreterite";
      conjugatedVerb = gPreterite({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass,
        vetitive: true
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dPreterite";
      conjugatedVerb = dPreterite({
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
    title={`${$state.activeView[0].toUpperCase()} Vetitive`}
    {conjugation}
    vetitive={true} />
{/if}
