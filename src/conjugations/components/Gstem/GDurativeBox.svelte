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

  const vowel_2fs = "ī";
  const vowel_3mp = "ū";
  const vowel_3fp = "ā";
  const vowel_2cp = "ā";

  let conjugatedVerb = {};
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let { root, themeVowel, I_eVerb, verbClass, durativeVowel } = $state;
    let thisRoot = [...root];
    let originalThemeVowel = themeVowel;
    let firstVowel = themeVowel === "e" ? "e" : "a";
    // irregular word babālum
    if (verbInput === "babālum") {
      thisRoot[0] = "w";
    }
    // replaces theme vowel with durative vowel if necessary
    if (durativeVowel) themeVowel = durativeVowel;
    // Person Prefixes
    let {
      firstPersonPrefix,
      secondPersonPrefix,
      thirdPersonPrefix,
      firstPersonPluralPrefix
    } = gPreteritePrefixes({
      root: thisRoot,
      themeVowel,
      I_eVerb,
      verbClass,
      durative: true
    });

    //Verbs I-a and I-e and I-w
    if (thisRoot[0] === "Ø" || thisRoot[0] === "w") {
      if (thisRoot[0] === "w") {
        if (thisRoot[1] !== "Ø") {
          thisRoot[0] = "";
          // first vowel disappears
          firstVowel = "";
        }
      } else {
        // we remove the missing radical
        thisRoot[0] = "";
        // first vowel disappears
        firstVowel = "";
      }
    }
    //Verbs II-weak
    if (thisRoot[1] === "Ø") {
      // we remove the missing radical
      thisRoot[1] = "";
      themeVowel = lengthenVowel(themeVowel);
      if (verbInput[1] === "i") {
        // these verbs come from the contraction of "-ay-"
        // they show special behavior in durative
        [themeVowel, firstVowel] = [firstVowel, themeVowel];
      } else {
        // the two vowels now in contact assimilate
        themeVowel = contiguousVowels(firstVowel, themeVowel);
        firstVowel = "";
      }
    }
    // Verbs III-weak
    if (thisRoot[2] === "Ø") {
      // we remove the missing radical
      thisRoot[2] = "";
      // In verbs III–e (thus, e-class), both the a
      // between R1 and R2 and the a of the prefixes of the second person forms
      // and the 1cs form usually, but not invariably, become e
      if (I_eVerb) firstVowel = "e";
    }

    let conjugatedVerb = {
      "3cs":
        thirdPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "2ms":
        secondPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "2fs":
        secondPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_2fs,
      "1cs":
        firstPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "3mp":
        thirdPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_3mp,
      "3fp":
        thirdPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_3fp,
      "2cp":
        secondPersonPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_2cp,
      "1cp":
        firstPersonPluralPrefix +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2]
    };

    // Verbs III-weak
    if (root[2] === "Ø") {
      // we contract the last 2 consecutive vowels
      conjugatedVerb = contractLastVowels(conjugatedVerb);
    }

    //Verbs II-weak
    if (root[1] === "Ø") {
      // When a vocalic ending does follow, the base of each type has a
      // short vowel, the short version of the long vowel of the Preterite,
      // and a doubled final radical
      Object.keys(conjugatedVerb).forEach(ps => {
        let verb = conjugatedVerb[ps];

        if (allFlavorsOfVowels.includes(verb.slice(-1))) {
          if (verb[0] === "i") {
            conjugatedVerb[ps] =
              "i" +
              root[0] +
              originalThemeVowel +
              root[2] +
              root[2] +
              verb.slice(-1);
          } else {
            conjugatedVerb[ps] =
              verb.slice(0, 2) +
              root[0] +
              originalThemeVowel +
              root[2] +
              root[2] +
              verb.slice(-1);
          }
        }
      });
    }

    state.updateVerb({ ...state, gDurative: conjugatedVerb });
  }
</script>

{#if $state.gDurative === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.gDurative}
    title="G Durative"
    conjugation="gDurative" />
{/if}
