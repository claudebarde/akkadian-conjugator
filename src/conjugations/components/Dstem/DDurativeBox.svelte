<script>
  import ConjugationBox from "../ConjugationBox.svelte";
  import state from "../../../state/state";
  import lexicon from "../../../lexicon/lexicon";
  import gPreteritePrefixes from "../../selectPrefixes";
  import contractLastVowels from "../../../settings/contractLastVowels";
  import {
    contiguousVowels,
    allFlavorsOfVowels,
    shortenVowel,
    lengthenVowel
  } from "../../../settings/phonologicalRules";

  let conjugatedVerb = {};
  let verbInput = undefined;

  const personPrefixes = ["u", "tu", "nu"];
  const vowel_2fs = "ī";
  const vowel_3mp = "ū";
  const vowel_3fp = "ā";
  const vowel_2cp = "ā";

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let thisRoot = [...$state.root];
    let firstVowel = "a";
    let secondVowel = "a";

    let conjugatedVerb = {
      "3cs":
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "2ms":
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "2fs":
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2fs,
      "1cs":
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "3mp":
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3mp,
      "3fp":
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3fp,
      "2cp":
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2cp,
      "1cp":
        personPrefixes[2] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2]
    };

    state.updateVerb({ ...state, dDurative: conjugatedVerb });
  }
</script>

{#if $state.gDurative === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.dDurative}
    title="D Durative"
    conjugation="dDurative" />
{/if}
