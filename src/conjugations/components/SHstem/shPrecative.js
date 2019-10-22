import contractLastVowels from "../../../settings/contractLastVowels";

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

  let prefix = I_eVerb ? "še" : "ša";
  let secondVowel = "i";

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // Verbs I–n
  if (thisRoot[0] === "n" && root[1] !== "Ø") thisRoot[0] = thisRoot[1];

  conjugatedVerb = {
    "3cs":
      prefixes["3cs"] +
      prefix +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "1cs":
      prefixes["1cs"] +
      prefix +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp":
      prefixes["3mp"] +
      prefix +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      "ū",
    "3fp":
      prefixes["3fp"] +
      prefix +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      "ā",
    "1cp":
      prefixes["1cp"] +
      prefix +
      thisRoot[0] +
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

export default shPrecative;
