import {
  lengthenVowel,
  contiguousVowels
} from "../../../settings/phonologicalRules";
import contractLastVowels from "../../../settings/contractLastVowels";

const shImperative = ({ root }) => {
  let thisRoot = [...root];
  let conjugatedVerb = {};
  let firstVowel = "u";
  let secondVowel = "i";

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // Verbs I–n
  if (thisRoot[0] === "n" && root[1] !== "Ø") thisRoot[0] = thisRoot[1];

  conjugatedVerb = {
    "2ms":
      "š" + firstVowel + thisRoot[0] + thisRoot[1] + secondVowel + thisRoot[2],
    "2fs":
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      "ī",
    "2cp":
      "š" +
      firstVowel +
      thisRoot[0] +
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

export default shImperative;
