import {
  lengthenVowel,
  contiguousVowels
} from "../../../settings/phonologicalRules";

const gImperative = ({ verbInput, root, themeVowel, I_eVerb, verbClass }) => {
  let thisRoot = [...root];
  let conjugatedVerb = {};
  // For adjectival verbs I–w, such as watårum, no Imperatives are attested.
  if (thisRoot[0] === "w" && verbClass === "stative") {
    conjugatedVerb = {
      "2ms": "-",
      "2fs": "-",
      "2cp": "-"
    };
  } else {
    const originalRoot = [...thisRoot];
    let firstVowel = themeVowel;

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
    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
      // All verbs III–a have i between R1 and R2
      if (themeVowel === "a") firstVowel = "i";
    }
    // Verbs I-n
    if (thisRoot[0] === "n" && thisRoot[1] !== "Ø") {
      thisRoot[0] = "";
    }
    // Verbs I-a and I-e
    if (thisRoot[0] === "Ø") {
      thisRoot[0] = "";
      if (I_eVerb === true) {
        firstVowel = "e";
      } else {
        firstVowel = "a";
      }
    }
    // Verbs II-weak
    if (thisRoot[1] === "Ø") {
      thisRoot[1] = "";
      themeVowel = lengthenVowel(themeVowel);
    }
    // Verbs I-w
    if (thisRoot[0] === "w" || verbInput === "babālum") {
      if (root[1] !== "Ø") {
        thisRoot[0] = "";
      } else {
        thisRoot[0] = "ˀ";
      }
      firstVowel = "";
    }

    conjugatedVerb = {
      "2ms": thisRoot[0] + firstVowel + thisRoot[1] + themeVowel + thisRoot[2],
      "2fs":
        thisRoot[0] + firstVowel + thisRoot[1] + themeVowel + thisRoot[2] + "ī",
      "2cp":
        thisRoot[0] + firstVowel + thisRoot[1] + themeVowel + thisRoot[2] + "ā"
    };

    if (
      (!originalRoot.includes("Ø") ||
        (originalRoot[0] === "Ø" && originalRoot[2] !== "Ø")) &&
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
    } else if (originalRoot[1] === "Ø" && root[0] !== "w") {
      Object.keys(conjugatedVerb).forEach(ps => {
        conjugatedVerb[ps] =
          conjugatedVerb[ps][0] + themeVowel + conjugatedVerb[ps].slice(3);
      });
    }
  }

  return conjugatedVerb;
};

export default gImperative;
