import { allFlavorsOfVowels, contiguousVowels } from "./phonologicalRules";

const contractLastVowels = conjugatedVerb => {
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

  return conjugatedVerb;
};

export default contractLastVowels;
