import { lengthenVowel } from "../../../settings/phonologicalRules";
import contractLastVowels from "../../../settings/contractLastVowels";

const prefixes = {
  "3cs": "li",
  "1cs": "lu",
  "3mp": "li",
  "3fp": "li",
  "1cp": "i ni"
};

const gPrecative = ({ verbInput, root, themeVowel, verbClass }) => {
  if (verbInput === "edûm" || verbInput === "išûm")
    return {
      "3cs": "-",
      "1cs": "-",
      "3mp": "-",
      "3fp": "-",
      "1cp": "-"
    };

  let thisRoot = [...root];
  let conjugatedVerb = {};
  let verbType = undefined;

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
    verbType = "III-weak";
  }
  //I-n verbs
  if (thisRoot[0] === "n" && thisRoot[1] !== "Ø") {
    thisRoot[0] = thisRoot[1];
  }
  //I-a and I-e verbs and I-w verbs
  if (thisRoot[0] === "Ø" || (thisRoot[0] === "w" && verbClass === "stative")) {
    thisRoot[0] = "";
    // In verbs I–" and stative verbs I–w, in which the prefix vowel of the
    // Preterite is long (because of the loss of the initial consonant), the vowel
    // of the prefix in the Precative is likewise long
    Object.keys(prefixes).forEach(ps => {
      prefixes[ps] =
        prefixes[ps].slice(0, -1) + lengthenVowel(prefixes[ps].slice(-1));
    });
  } else if (thisRoot[0] === "w" && verbClass === "active") {
    thisRoot[0] = "";
    prefixes["1cp"] = "i nu";
    verbType = "I-w";
  }
  // II-weak verbs
  if (thisRoot[1] === "Ø") {
    thisRoot[1] = "";
  }

  conjugatedVerb = {
    "3cs":
      prefixes["3cs"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2],
    "1cs":
      prefixes["1cs"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2],
    "3mp":
      prefixes["3mp"] +
      thisRoot[0] +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      "ū",
    "3fp":
      prefixes["3fp"] +
      thisRoot[0] +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      "ā",
    "1cp":
      prefixes["1cp"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2]
  };

  // III-weak verbs
  if (verbType === "III-weak") {
    conjugatedVerb = contractLastVowels(conjugatedVerb);
  }

  // I-w active verbs with vowel syncope
  if (verbType === "I-w" && verbClass === "active") {
    Object.keys(conjugatedVerb).forEach(ps => {
      if (
        conjugatedVerb[ps].slice(-1) === "ā" ||
        conjugatedVerb[ps].slice(-1) === "ū"
      ) {
        conjugatedVerb[ps] =
          conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
      }
    });
  }

  return conjugatedVerb;
};

export default gPrecative;
