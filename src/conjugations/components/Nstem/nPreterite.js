import contractLastVowels from "../../../settings/contractLastVowels";
import {
  lengthenVowel,
  vowelSyncope
} from "../../../settings/phonologicalRules";
import gPreteritePrefixes from "../../selectPrefixes";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const nPreterite = ({
  verbInput,
  root,
  I_eVerb,
  vetitive,
  themeVowel,
  verbClass
}) => {
  let conjugatedVerb = {};
  let thisRoot = [...root];
  let firstVowel = I_eVerb ? "e" : "a";
  let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

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
    durative: false
  });

  // III-weak
  if (thisRoot[2] === "Ø") {
    thisRoot[2] = "";
  }
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
      (vetitive ? "ayy" : "") +
      thirdPersonPrefix +
      thisRoot[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2ms":
      (vetitive ? "ē" : "") +
      secondPersonPrefix +
      thisRoot[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "2fs": vowelSyncope(
      (vetitive ? "ē" : "") +
        secondPersonPrefix +
        thisRoot[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2fs
    ),
    "1cs":
      (vetitive ? "ayy" : "") +
      firstPersonPrefix +
      thisRoot[0] +
      thisRoot[0] +
      firstVowel +
      thisRoot[1] +
      secondVowel +
      thisRoot[2],
    "3mp": vowelSyncope(
      (vetitive ? "ayy" : "") +
        thirdPersonPrefix +
        thisRoot[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3mp
    ),
    "3fp": vowelSyncope(
      (vetitive ? "ayy" : "") +
        thirdPersonPrefix +
        thisRoot[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_3fp
    ),
    "2cp": vowelSyncope(
      (vetitive ? "ē" : "") +
        secondPersonPrefix +
        thisRoot[0] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        vowel_2cp
    ),
    "1cp":
      (vetitive ? "ē" : "") +
      firstPersonPluralPrefix +
      thisRoot[0] +
      thisRoot[0] +
      firstVowel +
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

export default nPreterite;
