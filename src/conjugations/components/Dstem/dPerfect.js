import contractLastVowels from "../../../settings/contractLastVowels";

let personPrefixes = ["u", "tu", "nu"];
const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const assimilatingConsonants = ["d", "ṭ", "s", "ṣ", "z"];

const dPerfect = ({ root, I_eVerb }) => {
  let conjugatedVerb = {};
  let thisRoot = [...root];
  let infix =
    thisRoot[0] === "g" ? (I_eVerb ? "de" : "da") : I_eVerb ? "te" : "ta";
  // The vowels i and ī were apparently pronounced as e and ē,
  // respectively, when they occurred before the consonants r and ḫ.
  let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

  // When the first radical of the root is d, †, s, ß, or z (but not ⇥),
  // the infixed -t- of the Perfect is assimilated completely to that consonant
  if (assimilatingConsonants.includes(thisRoot[0]))
    infix = thisRoot[0] + infix[1];

  // I-n
  if (thisRoot[0] === "n") thisRoot[0] = "t";
  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // I-weak verbs
  // Before a consonant, the loss of ' caused the lengthening of the preceding vowel
  if (thisRoot[0] === "Ø") {
    thisRoot[0] = "";
    personPrefixes = ["ū", "tū", "nū"];
  }
  // I-w verbs
  if (thisRoot[0] === "w") {
    thisRoot[0] = "";
    personPrefixes = ["ū", "tū", "nū"];
    infix = "ta";
  }

  conjugatedVerb = {
    "3cs":
      personPrefixes[0] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2ms":
      personPrefixes[1] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2fs":
      personPrefixes[1] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2fs,
    "1cs":
      personPrefixes[0] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp":
      personPrefixes[0] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3mp,
    "3fp":
      personPrefixes[0] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_3fp,
    "2cp":
      personPrefixes[1] +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      vowel_2cp,
    "1cp":
      personPrefixes[2] +
      thisRoot[0] +
      infix +
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

export default dPerfect;
