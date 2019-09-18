import lexicon from "../lexicon/lexicon";
import {
  allFlavorsOfVowels,
  contiguousVowels
} from "../settings/phonologicalRules";
import gPreteritePrefixes from "./selectPrefixes";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const gDurativeGenerator = verbInput => {
  let { root, themeVowel, I_eVerb, durativeVowel } = lexicon[verbInput];
  root = [...root];
  // replaces theme vowel with durative vowel if necessary
  if (durativeVowel) themeVowel = durativeVowel;
  // Person Prefixes
  let {
    firstPersonPrefix,
    secondPersonPrefix,
    thirdPersonPrefix,
    firstPersonPluralPrefix
  } = gPreteritePrefixes({ root, themeVowel, I_eVerb });
  let firstVowel = "a";

  let conjugatedVerb = {
    "3cs":
      thirdPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2],
    "2ms":
      secondPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2],
    "2fs":
      secondPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2] +
      vowel_2fs,
    "1cs":
      firstPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2],
    "3mp":
      thirdPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2] +
      vowel_3mp,
    "3fp":
      thirdPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2] +
      vowel_3fp,
    "2cp":
      secondPersonPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2] +
      vowel_2cp,
    "1cp":
      firstPersonPluralPrefix +
      root[0] +
      firstVowel +
      root[1] +
      root[1] +
      themeVowel +
      root[2]
  };

  return conjugatedVerb;
};

export default gDurativeGenerator;
