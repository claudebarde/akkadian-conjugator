import contractLastVowels from "../../../settings/contractLastVowels";

const personPrefixes = ["u", "tu", "nu"];
const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const dDurative = ({ root, I_eVerb }) => {
  let conjugatedVerb = {};
  let thisRoot = [...root];
  let firstVowel = I_eVerb ? "e" : "a";
  let secondVowel = I_eVerb ? "e" : "a";

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }

  conjugatedVerb = {
    "3cs":
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2ms":
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2fs":
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2fs,
    "1cs":
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp":
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3mp,
    "3fp":
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3fp,
    "2cp":
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2cp,
    "1cp":
      personPrefixes[2] +
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

export default dDurative;
