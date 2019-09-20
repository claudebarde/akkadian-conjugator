import lexicon from "../lexicon/lexicon";
import gPreteritePrefixes from "./selectPrefixes";
import contractLastVowels from "../settings/contractLastVowels";
import {
  contiguousVowels,
  allFlavorsOfVowels,
  shortenVowel
} from "../settings/phonologicalRules";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const gDurativeGenerator = verbInput => {
  let { root, themeVowel, I_eVerb, type, durativeVowel } = lexicon[verbInput];
  root = [...root];
  let originalThemeVowel = themeVowel;
  // replaces theme vowel with durative vowel if necessary
  if (durativeVowel) themeVowel = durativeVowel;
  // Person Prefixes
  let {
    firstPersonPrefix,
    secondPersonPrefix,
    thirdPersonPrefix,
    firstPersonPluralPrefix
  } = gPreteritePrefixes({ root, themeVowel, I_eVerb, type, durative: true });
  let firstVowel = themeVowel === "e" ? "e" : "a";

  //Verbs I-a and I-e and I-w
  if (root[0] === "Ø" || root[0] === "w") {
    // we remove the missing radical
    root[0] = "";
    // first vowel disappears
    firstVowel = "";
  }
  //Verbs II-weak
  if (root[1] === "Ø") {
    // we remove the missing radical
    root[1] = "";
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

  //Verbs II-weak
  if (root[1] === "") {
    // When a vocalic ending does follow, the base of each type has a
    // short vowel, the short version of the long vowel of the Preterite,
    // and a doubled final radical
    Object.keys(conjugatedVerb).forEach(ps => {
      let verb = conjugatedVerb[ps];

      if (allFlavorsOfVowels.includes(verb[verb.length - 1])) {
        let newVerb =
          verb.slice(0, -3) +
          shortenVowel(originalThemeVowel) +
          root[2] +
          root[2] +
          verb.slice(-1);

        if (verbInput[1] === "i") {
          newVerb =
            newVerb.slice(0, -5) +
            shortenVowel(
              contiguousVowels(newVerb.slice(-5, -4), newVerb.slice(-4, -3))
            ) +
            newVerb.slice(-3);

          conjugatedVerb[ps] = newVerb;
        } else {
          conjugatedVerb[ps] = newVerb;
        }
      }
    });
  }

  return conjugatedVerb;
};

export default gDurativeGenerator;
