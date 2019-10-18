import contractLastVowels from "../../../settings/contractLastVowels";

const personPrefixes = ["u", "tu", "nu"];
const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const dPreterite = ({ verbInput, root, I_eVerb, vetitive }) => {
  let conjugatedVerb = {};
  let thisRoot = [...root];
  let firstVowel = I_eVerb ? "e" : "a";
  // The vowels i and ī were apparently pronounced as e and ē,
  // respectively, when they occurred before the consonants r and ḫ.
  let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

  // III-weak
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
  if (thisRoot[0] === "w" && verbInput !== "edûm") {
    firstVowel = "a";
  }

  conjugatedVerb = {
    "3cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2ms":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2fs":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2fs,
    "1cs":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3mp,
    "3fp":
      (vetitive ? "ayy" : "") +
      personPrefixes[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3fp,
    "2cp":
      (vetitive ? "ē" : "") +
      personPrefixes[1] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2cp,
    "1cp":
      (vetitive ? "ē" : "") +
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

export default dPreterite;
