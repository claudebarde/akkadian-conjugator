<script>
  import ConjugationBox from "../ConjugationBox.svelte";
  import state from "../../../state/state";
  import lexicon from "../../../lexicon/lexicon";
  import gPreteritePrefixes from "../../selectPrefixes";
  import contractLastVowels from "../../../settings/contractLastVowels";
  import addVentive from "../../../settings/addVentive";

  const vowel_2fs = "ī";
  const vowel_3mp = "ū";
  const vowel_3fp = "ā";
  const vowel_2cp = "ā";

  let conjugatedVerb = {};
  let verbInput = undefined;
  const assimilatingConsonants = ["d", "ṭ", "s", "ṣ", "z"];

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let thisRoot = [...$state.root];
    let { themeVowel, I_eVerb, type, durativeVowel, ventive } = $state;
    let verbType = undefined;
    let infix = "ta";

    // The vowel between R2 and R3 is the theme-vowel of the Durative
    if (durativeVowel) themeVowel = durativeVowel;

    // When the first radical of the root is d, †, s, ß, or z (but not ⇥),
    // the infixed -t- of the Perfect is assimilated completely to that consonant
    if (assimilatingConsonants.includes(thisRoot[0])) infix = thisRoot[0] + "a";

    // PHONOLOGICAL CHANGES
    // Verbs I–n
    if (thisRoot[0] === "n") thisRoot[0] = "t";
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
      type,
      durative: false
    });

    conjugatedVerb = {
      "3cs":
        thirdPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "2ms":
        secondPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "2fs":
        secondPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_2fs,
      "1cs":
        firstPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "3mp":
        thirdPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_3mp,
      "3fp":
        thirdPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_3fp,
      "2cp":
        secondPersonPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        vowel_2cp,
      "1cp":
        firstPersonPluralPrefix +
        thisRoot[0] +
        infix +
        thisRoot[1] +
        themeVowel +
        thisRoot[2]
    };

    // When a vocalic suffix (pl -ū, -ā, 2fs -ī, the Ventive -am,
    // Subordination marker -u [§19.2]) is added, the themevowel
    // between R2 and R3 drops out
    if (!thisRoot.includes("Ø") && ventive === false) {
      Object.keys(conjugatedVerb).forEach(ps => {
        if (ps === "2fs" || ps === "3mp" || ps === "3fp" || ps === "2cp") {
          conjugatedVerb[ps] =
            conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
        }
      });
    }

    state.updateVerb({ ...state, gPerfect: conjugatedVerb });
  }
</script>

{#if $state.gPerfect === undefined}
  <div />
{:else}
  <ConjugationBox
    verb={$state.gPerfect}
    title="G Perfect"
    conjugation="gPerfect" />
{/if}
