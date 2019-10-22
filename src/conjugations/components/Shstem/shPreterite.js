import contractLastVowels from "../../../settings/contractLastVowels";

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

  conjugatedVerb = {
    "3cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2ms":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
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
      vowel_2fs,
    "1cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
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
      vowel_2cp,
    "1cp":
      (vetitive ? "ē" : "") +
      personPrefixes[2] +
      "š" +
      firstVowel +
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

export default shPreterite;
