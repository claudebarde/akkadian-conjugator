import {
  lengthenVowel,
  contiguousVowels
} from "../../../settings/phonologicalRules";
import contractLastVowels from "../../../settings/contractLastVowels";

const dImperative = ({ root }) => {
  let thisRoot = [...root];
  let conjugatedVerb = {};
  let firstVowel = "u";
  // The vowels i and ī were apparently pronounced as e and ē,
  // respectively, when they occurred before the consonants r and ḫ.
  let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

  // III-weak verbs
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // I-weak verbs & I-w verbs
  if (thisRoot[0] === "Ø" || thisRoot[0] === "w") {
    thisRoot[0] = "";
  }

  conjugatedVerb = {
    "2ms":
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2fs":
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      "ī",
    "2cp":
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      "ā"
  };

  // III-weak
  if (root[2] === "Ø") {
    contractLastVowels(conjugatedVerb);
  }

  return conjugatedVerb;
};

export default dImperative;
