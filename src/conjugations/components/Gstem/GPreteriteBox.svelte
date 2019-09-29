<script>
  import ConjugationBox from "../ConjugationBox.svelte";
  import state from "../../../state/state";
  import lexicon from "../../../lexicon/lexicon";
  import gPreteritePrefixes from "../../selectPrefixes";
  import contractLastVowels from "../../../settings/contractLastVowels";
  import addVentive from "../../../settings/addVentive";
  import { lengthenVowel } from "../../../settings/phonologicalRules";

  export let vetitive = false;

  const vowel_2fs = "ī";
  const vowel_3mp = "ū";
  const vowel_3fp = "ā";
  const vowel_2cp = "ā";

  let conjugatedVerb = {};
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    // Irregular Verb alākum
    if (verbInput === "alākum") {
      conjugatedVerb = {
        "3cs": "illik",
        "2ms": "tallik",
        "2fs": "tallikī",
        "1cs": "allik",
        "3mp": "illukū",
        "3fp": "illukā",
        "2cp": "tallikā",
        "1cp": "nillik"
      };
    }
    // Irregular Verb babālum
    else if (verbInput === "babālum") {
      conjugatedVerb = {
        "3cs": "ubil",
        "2ms": "tubil",
        "2fs": "tublī/tubilī",
        "1cs": "ubil",
        "3mp": "ublū/ubilū",
        "3fp": "ublā/ubilā",
        "2cp": "tublā/tubilā",
        "1cp": "nubil"
      };
    } // Irregular Verb leˀûm
    else if (verbInput === "leˀûm") {
      conjugatedVerb = {
        "3cs": "ilˀe",
        "2ms": "telˀe",
        "2fs": "telˀê",
        "1cs": "elˀe",
        "3mp": "ilˀû",
        "3fp": "ilˀiā",
        "2cp": "telˀiā",
        "1cp": "nilˀe"
      };
    } else {
      let root = $state.root;
      let thisRoot = [...root];
      let { themeVowel, I_eVerb, verbClass } = $state;
      let verbType = undefined;

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
        durative: false
      });

      // PHONOLOGICAL CHANGES
      // Verbs I-a and I-e and I-w
      if (thisRoot[0] === "Ø" || thisRoot[0] === "w") {
        if (thisRoot[0] === "w") {
          verbType = "I-w";
          if (thisRoot[1] !== "Ø") thisRoot[0] = "";
        } else {
          thisRoot[0] = "";
        }
      }
      // Verbs II-weak
      if (thisRoot[1] === "Ø") {
        // we remove the missing radical
        thisRoot[1] = "";
        themeVowel = lengthenVowel(themeVowel);
      }
      // Verbs III-weak
      if (thisRoot[2] === "Ø") {
        // we remove the missing radical
        thisRoot[2] = "";
      }
      // Verbs I–n
      if (thisRoot[0] === "n" && root[1] !== "Ø") thisRoot[0] = thisRoot[1];

      conjugatedVerb = {
        "3cs":
          (vetitive ? "ayy" : "") +
          thirdPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2],
        "2ms":
          (vetitive ? "ē" : "") +
          secondPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2],
        "2fs":
          (vetitive ? "ē" : "") +
          secondPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          vowel_2fs,
        "1cs":
          (vetitive ? "ayy" : "") +
          firstPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2],
        "3mp":
          (vetitive ? "ayy" : "") +
          thirdPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          vowel_3mp,
        "3fp":
          (vetitive ? "ayy" : "") +
          thirdPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          vowel_3fp,
        "2cp":
          (vetitive ? "ē" : "") +
          secondPersonPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          vowel_2cp,
        "1cp":
          (vetitive ? "ē" : "") +
          firstPersonPluralPrefix +
          thisRoot[0] +
          thisRoot[1] +
          themeVowel +
          thisRoot[2]
      };

      // Verbs III-weak
      if (root[2] === "Ø") {
        // we contract the last 2 consecutive vowels
        conjugatedVerb = contractLastVowels(conjugatedVerb);
      }

      // Verbs I-w
      if (verbType === "I-w") {
        // when a vocalic ending (i.e., an ending beginning with a vowel) is added,
        // the theme-vowel i is lost through syncope
        Object.keys(conjugatedVerb).forEach(ps => {
          if (["ī", "ū", "ā"].includes(conjugatedVerb[ps].slice(-1))) {
            conjugatedVerb[ps] =
              conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
          }
        });
      }
    }

    if (vetitive) {
      state.updateVerb({ ...state, gVetitive: conjugatedVerb });
    } else {
      state.updateVerb({ ...state, gPreterite: conjugatedVerb });
    }
  }
</script>

{#if $state.gPreterite === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={vetitive ? $state.gVetitive : $state.gPreterite}
    title={vetitive ? 'G Vetitive' : 'G Preterite'}
    conjugation="gPreterite"
    {vetitive} />
{/if}
