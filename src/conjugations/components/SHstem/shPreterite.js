import contractLastVowels from "../../../settings/contractLastVowels";
import { lengthenVowel } from "../../../settings/phonologicalRules";

const personPrefixes = ["u", "tu", "nu"];
const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const shPreterite = ({ verbInput, root, I_eVerb, vetitive }) => {
  let conjugatedVerb = {};
  let thisRoot = [...root];
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

  // conjugated verb
  conjugatedVerb = {
    "3cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2],
    "2ms":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2],
    "2fs":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      vowel_2fs,
    "1cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      (root[1] === "Ø" ? lengthenVowel(secondVowel) : secondVowel) +
      thisRoot[2],
    "3mp":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      vowel_3mp,
    "3fp":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      vowel_3fp,
    "2cp":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      (root[1] === "Ø" ? thisRoot[2] : "") +
      vowel_2cp,
    "1cp":
      (vetitive ? "ē" : "") +
      personPrefixes[2] +
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

export default shPreterite;
