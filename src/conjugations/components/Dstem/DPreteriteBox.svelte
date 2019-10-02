<script>
  import ConjugationBox from "../ConjugationBox.svelte";
  import state from "../../../state/state";
  import lexicon from "../../../lexicon/lexicon";
  import gPreteritePrefixes from "../../selectPrefixes";
  import contractLastVowels from "../../../settings/contractLastVowels";
  import addVentive from "../../../settings/addVentive";
  import { lengthenVowel } from "../../../settings/phonologicalRules";

  export let vetitive = false;

  const personPrefixes = ["u", "tu", "nu"];
  const vowel_2fs = "ī";
  const vowel_3mp = "ū";
  const vowel_3fp = "ā";
  const vowel_2cp = "ā";

  let conjugatedVerb = {};
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let { root, I_eVerb } = $state;
    let thisRoot = [...root];
    let firstVowel = I_eVerb ? "e" : "a";
    // The vowels i and ī were apparently pronounced as e and ē,
    // respectively, when they occurred before the consonants r and ḫ.
    let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

    // III-weak
    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
    }

    conjugatedVerb = {
      "3cs":
        (vetitive ? "ayy" : "") +
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "2ms":
        (vetitive ? "ē" : "") +
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "2fs":
        (vetitive ? "ē" : "") +
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2fs,
      "1cs":
        (vetitive ? "ayy" : "") +
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "3mp":
        (vetitive ? "ayy" : "") +
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3mp,
      "3fp":
        (vetitive ? "ayy" : "") +
        personPrefixes[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3fp,
      "2cp":
        (vetitive ? "ē" : "") +
        personPrefixes[1] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2cp,
      "1cp":
        (vetitive ? "ē" : "") +
        personPrefixes[2] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2]
    };

    // III-weak
    if (root[2] === "Ø") {
      contractLastVowels(conjugatedVerb);
    }

    if (vetitive) {
      state.updateVerb({ ...state, dVetitive: conjugatedVerb });
    } else {
      state.updateVerb({ ...state, dPreterite: conjugatedVerb });
    }
  }
</script>

{#if $state.gPreterite === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={vetitive ? $state.dVetitive : $state.dPreterite}
    title={vetitive ? 'D Vetitive' : 'D Preterite'}
    conjugation="dPreterite"
    {vetitive} />
{/if}
