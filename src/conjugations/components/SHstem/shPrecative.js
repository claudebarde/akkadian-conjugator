import contractLastVowels from "../../../settings/contractLastVowels";
import { lengthenVowel } from "../../../settings/phonologicalRules";

const prefixes = {
  "3cs": "li",
  "1cs": "lu",
  "3mp": "li",
  "3fp": "li",
  "1cp": "i nu"
};

const shPrecative = ({ verbInput, root, I_eVerb }) => {
  let thisRoot = [...root];
  let conjugatedVerb = {};

  let firstVowel = I_eVerb ? "e" : "a";
  let secondVowel = "i";

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // Verbs I–n
  if (thisRoot[0] === "n" && root[1] !== "Ø") thisRoot[0] = thisRoot[1];
  // Verbs I-weak && Irregular verb babālum
  if (thisRoot[0] === "Ø" || verbInput === "babālum") {
    thisRoot[0] = "";
    firstVowel = lengthenVowel(firstVowel);
  }
  // Verbs I-w
  if (thisRoot[0] === "w") {
    thisRoot[0] = "";
    // Most follow the pattern of verbs I–a, but a few have the change of a-vowels to e
    // that is characteristic of Verbs I–e.
    if (["wašābum", "warādum"].includes(verbInput) || root[2] === "Ø") {
      firstVowel = "ē";
    } else {
      firstVowel = lengthenVowel(firstVowel);
    }
  }
  // II-weak verbs
  if (thisRoot[1] === "Ø") {
    thisRoot[1] = "";
    firstVowel = "";
  }

  conjugatedVerb = {
    "3cs":
      prefixes["3cs"] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2],
    "1cs":
      prefixes["1cs"] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2],
    "3mp":
      prefixes["3mp"] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      "ū",
    "3fp":
      prefixes["3fp"] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      "ā",
    "1cp":
      prefixes["1cp"] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2]
  };

  // III-weak
  if (root[2] === "Ø") {
    contractLastVowels(conjugatedVerb);
  }

  return conjugatedVerb;
};

export default shPrecative;
