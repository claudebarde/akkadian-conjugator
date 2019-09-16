import {
  allFlavorsOfVowels,
  contiguousVowels
} from "../settings/phonologicalRules";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const gPreteriteGenerator = ([...root], themeVowel) => {
  // PHONOLOGICAL CHANGES
  // Verbs I–n
  if (root[0] === "n") root[0] = root[1];

  let conjugatedVerb = {
    "3cs": "i" + root[0] + root[1] + themeVowel + root[2],
    "2ms": "ta" + root[0] + root[1] + themeVowel + root[2],
    "2fs": "ta" + root[0] + root[1] + themeVowel + root[2] + vowel_2fs,
    "1cs": "a" + root[0] + root[1] + themeVowel + root[2],
    "3mp": "i" + root[0] + root[1] + themeVowel + root[2] + vowel_3mp,
    "3fp": "i" + root[0] + root[1] + themeVowel + root[2] + vowel_3fp,
    "2cp": "ta" + root[0] + root[1] + themeVowel + root[2] + vowel_2cp,
    "1cp": "ni" + root[0] + root[1] + themeVowel + root[2]
  };

  // Verbs III-weak
  if (root[2] === "Ø") {
    Object.keys(conjugatedVerb).forEach(person => {
      // remove last placeholder
      if (conjugatedVerb[person][conjugatedVerb[person].length - 1] === "Ø") {
        conjugatedVerb[person] = conjugatedVerb[person].slice(
          0,
          conjugatedVerb[person].length - 1
        );
      } // remove penultimate placeholder
      else if (
        conjugatedVerb[person][conjugatedVerb[person].length - 2] === "Ø"
      ) {
        conjugatedVerb[person] =
          conjugatedVerb[person].slice(0, -2) +
          conjugatedVerb[person].slice(-1);
      }

      // remove contiguous vowels
      const lastChar = conjugatedVerb[person].slice(-1);
      const penultimateChar = conjugatedVerb[person].slice(-2, -1);
      if (
        allFlavorsOfVowels.includes(lastChar) &&
        allFlavorsOfVowels.includes(penultimateChar)
      ) {
        // we get the contracted vowel
        const newLastChar = contiguousVowels(penultimateChar, lastChar);
        // we replace the 2 vowels with the contracted vowel
        conjugatedVerb[person] =
          conjugatedVerb[person].slice(0, -2) + newLastChar;
      }
    });
  }

  return conjugatedVerb;
};

export default gPreteriteGenerator;
