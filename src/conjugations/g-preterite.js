import lexicon from "../lexicon/lexicon";
import gPreteritePrefixes from "./selectPrefixes";
import contractLastVowels from "../settings/contractLastVowels";
import addVentive from "../settings/addVentive";

const vowel_2fs = "ī";
const vowel_3mp = "ū";
const vowel_3fp = "ā";
const vowel_2cp = "ā";

const gPreteriteGenerator = (verbInput, ventive) => {
  let { root, themeVowel, I_eVerb, type } = lexicon[verbInput];
  root = [...root];
  let verbType = undefined;

  // Irregular Verb babālum
  /*if (verbInput === "babālum") {
    if (ventive) {
      return {
        "3cs": "ublam",
        "2ms": "tublam",
        "2fs": "tubliam",
        "1cs": "ublam",
        "3mp": "ublûm",
        "3fp": "ublâm",
        "2cp": "tublâm",
        "1cp": "nublam"
      };
    } else {
      return {
        "3cs": "ubil",
        "2ms": "tubil",
        "2fs": "tublī/tubilī",
        "1cs": "ubil",
        "3mp": "ublū/ubilū",
        "3fp": "ublā/ubilā",
        "2cp": "tublā/tubilā",
        "1cp": "nubil"
      };
    }
  }*/

  /*
  {
        "3cs": ventive ? "ublam" : "ubil",
        "2ms": ventive ? "tublam" : "tubil",
        "2fs": ventive ? "tubliam" : "tublī/tubilī",
        "1cs": ventive ? "ublam" : "ubil",
        "3mp": ventive ? "ublûm" : "ublū/ubilū",
        "3fp": ventive ? "ublâm" : "ublā/ubilā",
        "2cp": ventive ? "tublâm" : "tublā/tubilā",
        "1cp": ventive ? "nublam" : "nubil"
      }*/

  // Irregular Verb alākum
  if (verbInput === "alākum") {
    return {
      "3cs": "illik",
      "2ms": "tallik",
      "2fs": "tallikī",
      "1cs": "allik",
      "3mp": "illukū",
      "3fp": "illukā",
      "2cp": "tallikā",
      "1cp": "nillik"
    };
  }
  // Irregular Verb babālum
  if (verbInput === "babālum") {
    return {
      "3cs": "ubil",
      "2ms": "tubil",
      "2fs": "tublī/tubilī",
      "1cs": "ubil",
      "3mp": "ublū/ubilū",
      "3fp": "ublā/ubilā",
      "2cp": "tublā/tubilā",
      "1cp": "nubil"
    };
  }

  // PHONOLOGICAL CHANGES
  // Verbs I–n
  if (root[0] === "n" && root[1] !== "Ø") root[0] = root[1];
  // Person Prefixes
  let {
    firstPersonPrefix,
    secondPersonPrefix,
    thirdPersonPrefix,
    firstPersonPluralPrefix
  } = gPreteritePrefixes({ root, themeVowel, I_eVerb, type, durative: false });

  // Verbs I-a and I-e and I-w
  if (root[0] === "Ø" || root[0] === "w") {
    if (root[0] === "w") verbType = "I-w";
    root[0] = "";
  }
  // Verbs II-weak
  else if (root[1] === "Ø") {
    // we remove the missing radical
    root[1] = "";
  }
  // Verbs III-weak
  else if (root[2] === "Ø") {
    // we remove the missing radical
    root[2] = "";
  }

  let conjugatedVerb = {
    "3cs": thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "2ms": secondPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "2fs":
      secondPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_2fs,
    "1cs": firstPersonPrefix + root[0] + root[1] + themeVowel + root[2],
    "3mp":
      thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_3mp,
    "3fp":
      thirdPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_3fp,
    "2cp":
      secondPersonPrefix + root[0] + root[1] + themeVowel + root[2] + vowel_2cp,
    "1cp": firstPersonPluralPrefix + root[0] + root[1] + themeVowel + root[2]
  };

  // Verbs III-weak
  if (root[2] === "") {
    // we contract the last 2 consecutive vowels
    conjugatedVerb = contractLastVowels(conjugatedVerb);
  }

  // Verbs I-w
  if (verbType === "I-w") {
    // when a vocalic ending (i.e., an ending beginning with a vowel) is added,
    // the theme-vowel i is lost through syncope
    Object.keys(conjugatedVerb).forEach(ps => {
      if (["ī", "ū", "ā"].includes(conjugatedVerb[ps].slice(-1))) {
        conjugatedVerb[ps] =
          conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
      }
    });
  }

  return conjugatedVerb;
};

export default gPreteriteGenerator;
