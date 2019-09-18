import lexicon from "../lexicon/lexicon";
import {
  allFlavorsOfVowels,
  contiguousVowels
} from "../settings/phonologicalRules";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const gPreteriteGenerator = verbInput => {
  let { root, themeVowel, I_eVerb } = lexicon[verbInput];
  root = [...root];
  let firstPersonPrefix = "a";
  let secondPersonPrefix = "ta";
  let thirdPersonPrefix = "i";
  let firstPersonPluralPrefix = "ni";

  // Irregular Verb alākum
  if (verbInput === "alākum") {
    return {
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
  if (verbInput === "babālum") {
    return {
      "3cs": "ubil",
      "2ms": "tubil",
      "2fs": "tublī/tubilī",
      "1cs": "ubil",
      "3mp": "ublū/ubilū",
      "3fp": "ublā/ubilā",
      "2cp": "tublā/tubilā",
      "1cp": "nubil"
    };
  }

  // PHONOLOGICAL CHANGES
  // Verbs I–n
  if (root[0] === "n" && root[1] !== "Ø") root[0] = root[1];

  // Vocalic harmony
  if (root[2] === "Ø" && themeVowel === "e") {
    firstPersonPrefix = "e";
    secondPersonPrefix = "te";
  } else if (
    ((root[0] === "Ø" || root[0] === "w") && I_eVerb === true) ||
    (root[1] === "Ø" && themeVowel === "ē")
  ) {
    firstPersonPrefix = "ē";
    secondPersonPrefix = "tē";
  }

  // Verbs I-a and I-e and I-w
  if (root[0] === "Ø" || root[0] === "w") {
    if (root[0] === "Ø") {
      // we lengthen the person prefix
      // we do not lengthen for first and second if already done above
      if (!I_eVerb) {
        firstPersonPrefix = "ā";
        secondPersonPrefix = "tā";
      }
      thirdPersonPrefix = "ī";
      firstPersonPluralPrefix = "nī";
    } else if (root[0] === "w") {
      // active I-w verbs have special "u" for person perfix
      firstPersonPrefix = "u";
      secondPersonPrefix = "tu";
      thirdPersonPrefix = "u";
      firstPersonPluralPrefix = "nu";
    }
    // we remove the missing radical
    root[0] = "";
  }
  // Verbs II-weak
  else if (root[1] === "Ø") {
    // we remove the missing radical
    root[1] = "";
  }
  // Verbs III-weak
  else if (root[2] === "Ø") {
    // we remove the missing radical
    root[2] = "";
  }

  let conjugatedVerb = {
    "3cs": thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "2ms": secondPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "2fs":
      secondPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_2fs,
    "1cs": firstPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "3mp":
      thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_3mp,
    "3fp":
      thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_3fp,
    "2cp":
      secondPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_2cp,
    "1cp": firstPersonPluralPrefix + root[0] + root[1] + themeVowel + root[2]
  };

  // Verbs III-weak
  if (root[2] === "") {
    // we contract the last 2 consecutive vowels
    Object.keys(conjugatedVerb).forEach(ps => {
      const lastChar = conjugatedVerb[ps].slice(-1);
      const penultimateChar = conjugatedVerb[ps].slice(-2, -1);
      if (
        allFlavorsOfVowels.includes(lastChar) &&
        allFlavorsOfVowels.includes(penultimateChar)
      ) {
        // we get the contracted vowel
        const newLastChar = contiguousVowels(penultimateChar, lastChar);
        // we replace the 2 vowels with the contracted vowel
        conjugatedVerb[ps] =
          conjugatedVerb[ps].slice(0, conjugatedVerb[ps].length - 2) +
          newLastChar;
      }
    });
  }

  return conjugatedVerb;
};

export default gPreteriteGenerator;
