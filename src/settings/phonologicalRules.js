const flavorsOfA = ["a", "ā", "â"];
const flavorsOfE = ["e", "ē", "ê"];
const flavorsOfI = ["i", "ī", "î"];
const flavorsOfU = ["u", "ū", "û"];

export const allFlavorsOfVowels = [
  flavorsOfA,
  flavorsOfE,
  flavorsOfI,
  flavorsOfU
].flat();

// returns vowel resulting of the contraction of 2 contiguous vowels
export const contiguousVowels = (a, b) => {
  // Sequences of long or short e or i followed by long or short a remain uncontracted
  if (
    (flavorsOfE.includes(a) || flavorsOfI.includes(a)) &&
    flavorsOfA.includes(b)
  ) {
    // an original long e or i that remains as the first vowel in most such sequences is shortened
    if (a === "ē" || a === "ê") {
      return "e" + b;
    } else if (a === "ī" || a === "î") {
      return "i" + b;
    } else {
      return a + b;
    }
  }
  // A long a or e followed by long or short i contracts to ê:
  else if (
    (a === "ā" || a === "â" || a === "ē" || a === "ê") &&
    (b === "i" || b === "ī")
  ) {
    return "ê";
  }
  // In all other sequences of contiguous vowels, the vowels contract to a long vowel,
  // marked in transcription with a circumflex, that is the quality of the original second vowel
  else {
    if (flavorsOfA.includes(b)) {
      return "â";
    } else if (flavorsOfE.includes(b)) {
      return "ê";
    } else if (flavorsOfI.includes(b)) {
      return "î";
    } else if (flavorsOfU.includes(b)) {
      return "û";
    }
  }
};

export const lengthenVowel = vowel => {
  if (vowel === "a") {
    return "ā";
  } else if (vowel === "e") {
    return "ē";
  } else if (vowel === "i") {
    return "ī";
  } else if (vowel === "u") {
    return "ū";
  }
};
