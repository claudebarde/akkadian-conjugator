import {
  lengthenVowel,
  shortenVowel
} from "../../../settings/phonologicalRules";
import contractLastVowels from "../../../settings/contractLastVowels";

const prefixes = {
  "3cs": "li",
  "1cs": "lu",
  "3mp": "li",
  "3fp": "li",
  "1cp": "i nu"
};

const dPrecative = ({ verbInput, root, I_eVerb }) => {
  if (verbInput === "edûm")
    return {
      "3cs": "-",
      "1cs": "-",
      "3mp": "-",
      "3fp": "-",
      "1cp": "-"
    };

  let thisRoot = [...root];
  let conjugatedVerb = {};

  let firstVowel = I_eVerb ? "e" : "a";
  // The vowels i and ī were apparently pronounced as e and ē,
  // respectively, when they occurred before the consonants r and ḫ.
  let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

  // III-weak verbs
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // I-weak
  // Between vowels, both ' and the vowel following it are lost
  if (thisRoot[0] === "Ø") {
    thisRoot[0] = "";
    firstVowel = "";
  }
  // I-w verbs
  if (thisRoot[0] === "w") {
    firstVowel = "a";
  }
  // II-weak verbs
  if (thisRoot[1] === "Ø") {
    thisRoot[1] = "";
    firstVowel = "";
    secondVowel = lengthenVowel(secondVowel);
  }

  conjugatedVerb = {
    "3cs":
      prefixes["3cs"] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "1cs":
      prefixes["1cs"] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp":
      prefixes["3mp"] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      (root[1] === "Ø" ? shortenVowel(secondVowel) : secondVowel) +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      "ū",
    "3fp":
      prefixes["3fp"] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      (root[1] === "Ø" ? shortenVowel(secondVowel) : secondVowel) +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      "ā",
    "1cp":
      prefixes["1cp"] +
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

  return conjugatedVerb;
};

export default dPrecative;
