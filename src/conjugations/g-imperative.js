import lexicon from "../lexicon/lexicon";
import { contiguousVowels } from "../settings/phonologicalRules";

const gImperativeGenerator = verbInput => {
  const originalRoot = [...lexicon[verbInput].root];
  let root = [...originalRoot];
  let firstVowel = lexicon[verbInput].themeVowel;
  let themeVowel = lexicon[verbInput].themeVowel;
  let I_eVerb = lexicon[verbInput].I_eVerb;
  let type = lexicon[verbInput].type;

  // For adjectival verbs I–w, such as watårum, no Imperatives are attested.
  if (originalRoot[0] === "w" && type === "stative")
    return {
      "2ms": "-",
      "2fs": "-",
      "2cp": "-"
    };

  // The only sound verbs in which the vowel inserted between R1 and
  // R2 differs from the theme-vowel are five a-class verbs
  const irregularVerbs = [
    "lamādum",
    "palāḫum",
    "pašāḫum",
    "rakābum",
    "takālum"
  ];
  if (irregularVerbs.includes(verbInput)) firstVowel = "i";

  // Verbs III-weak
  if (root[2] === "Ø") {
    root[2] = "";
    // All verbs III–a have i between R1 and R2
    if (themeVowel === "a") firstVowel = "i";
  }
  // Verbs I-n
  else if (root[0] === "n" && root[1] !== "Ø") {
    root[0] = "";
  }
  // Verbs I-a and I-e
  else if (root[0] === "Ø") {
    root[0] = "";
    if (I_eVerb === true) {
      firstVowel = "e";
    } else {
      firstVowel = "a";
    }
  }
  // Verbs II-weak
  else if (root[1] === "Ø") {
    root[1] = "";
  }
  // Verbs I-w
  else if (root[0] === "w" || verbInput === "babālum") {
    root[0] = "";
    firstVowel = "";
  }

  let conjugatedVerb = {
    "2ms": root[0] + firstVowel + root[1] + themeVowel + root[2],
    "2fs": root[0] + firstVowel + root[1] + themeVowel + root[2] + "ī",
    "2cp": root[0] + firstVowel + root[1] + themeVowel + root[2] + "ā"
  };

  if (
    (!originalRoot.includes("Ø") || originalRoot[0] === "Ø") &&
    originalRoot[0] !== "w" &&
    verbInput !== "babālum"
  ) {
    Object.keys(conjugatedVerb).forEach(ps => {
      if (ps === "2fs" || ps === "2cp") {
        conjugatedVerb[ps] =
          conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
      }
    });
  } else if (originalRoot[2] === "Ø") {
    Object.keys(conjugatedVerb).forEach(ps => {
      if (ps === "2fs" || ps === "2cp") {
        const lastVowel = contiguousVowels(
          conjugatedVerb[ps].slice(-2, -1),
          conjugatedVerb[ps].slice(-1)
        );
        conjugatedVerb[ps] = conjugatedVerb[ps].slice(0, -2) + lastVowel;
      }
    });
  } else if (originalRoot[1] === "Ø") {
    Object.keys(conjugatedVerb).forEach(ps => {
      conjugatedVerb[ps] =
        conjugatedVerb[ps][0] + themeVowel + conjugatedVerb[ps].slice(3);
    });
  }

  return conjugatedVerb;
};

export default gImperativeGenerator;
