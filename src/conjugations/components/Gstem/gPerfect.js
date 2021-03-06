import gPreteritePrefixes from "../../selectPrefixes";
import contractLastVowels from "../../../settings/contractLastVowels";
import { lengthenVowel } from "../../../settings/phonologicalRules";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const assimilatingConsonants = ["d", "ṭ", "s", "ṣ", "z"];

const gPerfect = ({
  verbInput,
  root,
  themeVowel,
  I_eVerb,
  verbClass,
  durativeVowel,
  onlyDstem
}) => {
  if (onlyDstem || verbInput === "edûm" || verbInput === "išûm")
    return {
      "3cs": "-",
      "2ms": "-",
      "2fs": "-",
      "1cs": "-",
      "3mp": "-",
      "3fp": "-",
      "2cp": "-",
      "1cp": "-"
    };

  let conjugatedVerb = {};
  let originalThemeVowel = themeVowel;
  let thisRoot = [...root];
  let infix = thisRoot[0] === "g" ? "da" : "ta";

  // IRREGULAR VERB alākum
  // alākum behaves like a verb I–n in the Perfect
  if (verbInput === "alākum") thisRoot[0] = "n";
  // The verb babålum exhibits two Perfect conjugations, one like that of other
  // active verbs I–w and one with a single -t-:
  if (verbInput === "babālum") thisRoot[0] = "t";

  // Person Prefixes
  let {
    firstPersonPrefix,
    secondPersonPrefix,
    thirdPersonPrefix,
    firstPersonPluralPrefix
  } = gPreteritePrefixes({
    root: thisRoot,
    themeVowel,
    I_eVerb,
    verbClass,
    durative: thisRoot[1] === "Ø" ? true : false
  });

  // The vowel between R2 and R3 is the theme-vowel of the Durative
  if (durativeVowel) themeVowel = durativeVowel;

  // When the first radical of the root is d, †, s, ß, or z (but not ⇥),
  // the infixed -t- of the Perfect is assimilated completely to that consonant
  if (assimilatingConsonants.includes(thisRoot[0])) infix = thisRoot[0] + "a";
  // I-a and I-e verbs
  if (themeVowel === "e" || I_eVerb) {
    infix = infix[0] + "e";
  }

  // PHONOLOGICAL CHANGES
  // Verbs I–n
  if (thisRoot[0] === "n") thisRoot[0] = "t";
  // Verbs III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
  // I-weak verbs
  if (thisRoot[0] === "Ø") {
    thisRoot[0] = "";
  }
  // II-weak verbs
  if (thisRoot[1] === "Ø") {
    thisRoot[1] = "";
    infix = infix[0];
    themeVowel = lengthenVowel(originalThemeVowel);
  }
  // I-w verbs
  if (thisRoot[0] === "w") {
    if (verbClass === "stative") {
      thisRoot[0] = "";
    } else if (verbClass === "active") {
      thisRoot[0] = "t";
      // Active verbs I–w in the Perfect do not have as their prefix vowel u-,
      // tu-, nu-, as might be expected from the Preterite and Durative forms, but
      // rather i-, ta-, etc
      firstPersonPrefix = "a";
      secondPersonPrefix = "ta";
      thirdPersonPrefix = "i";
      firstPersonPluralPrefix = "ni";
    }
  }

  conjugatedVerb = {
    "3cs":
      thirdPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2],
    "2ms":
      secondPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2],
    "2fs":
      secondPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      vowel_2fs,
    "1cs":
      firstPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2],
    "3mp":
      thirdPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      vowel_3mp,
    "3fp":
      thirdPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      vowel_3fp,
    "2cp":
      secondPersonPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2] +
      vowel_2cp,
    "1cp":
      firstPersonPluralPrefix +
      thisRoot[0] +
      infix +
      thisRoot[1] +
      themeVowel +
      thisRoot[2]
  };

  // When a vocalic suffix (pl -ū, -ā, 2fs -ī, the Ventive -am,
  // Subordination marker -u [§19.2]) is added, the themevowel
  // between R2 and R3 drops out
  if (!root.includes("Ø") || (root[0] === "Ø" && root[2] !== "Ø")) {
    Object.keys(conjugatedVerb).forEach(ps => {
      if (ps === "2fs" || ps === "3mp" || ps === "3fp" || ps === "2cp") {
        conjugatedVerb[ps] =
          conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
      }
    });
  } else if (root[2] === "Ø") {
    conjugatedVerb = contractLastVowels(conjugatedVerb);
  }

  return conjugatedVerb;
};

export default gPerfect;
