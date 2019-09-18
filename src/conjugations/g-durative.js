import lexicon from "../lexicon/lexicon";
import gPreteritePrefixes from "./selectPrefixes";
import contractLastVowels from "../settings/contractLastVowels";

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
  let firstVowel = themeVowel === "e" ? "e" : "a";

  // Verbs III-weak
  if (root[2] === "Ø") {
    // we remove the missing radical
    root[2] = "";
  }

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

  // Verbs III-weak
  if (root[2] === "") {
    // we contract the last 2 consecutive vowels
    conjugatedVerb = contractLastVowels(conjugatedVerb);
  }

  return conjugatedVerb;
};

export default gDurativeGenerator;
