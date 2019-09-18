const gPreteritePrefixes = ({ root, themeVowel, I_eVerb }) => {
  let firstPersonPrefix = "a";
  let secondPersonPrefix = "ta";
  let thirdPersonPrefix = "i";
  let firstPersonPluralPrefix = "ni";

  // Vocalic harmony
  if (root[2] === "Ø" && themeVowel === "e") {
    firstPersonPrefix = "e";
    secondPersonPrefix = "te";
  } else if (
    ((root[0] === "Ø" || root[0] === "w") && I_eVerb === true) ||
    (root[1] === "Ø" && themeVowel === "ē")
  ) {
    firstPersonPrefix = "ē";
    secondPersonPrefix = "tē";
  }

  // Verbs I-a and I-e and I-w
  if (root[0] === "Ø" || root[0] === "w") {
    if (root[0] === "Ø") {
      // we lengthen the person prefix
      // we do not lengthen for first and second if already done above
      if (!I_eVerb) {
        firstPersonPrefix = "ā";
        secondPersonPrefix = "tā";
      }
      thirdPersonPrefix = "ī";
      firstPersonPluralPrefix = "nī";
    } else if (root[0] === "w") {
      // active I-w verbs have special "u" for person perfix
      firstPersonPrefix = "u";
      secondPersonPrefix = "tu";
      thirdPersonPrefix = "u";
      firstPersonPluralPrefix = "nu";
    }
    // we remove the missing radical
    root[0] = "";
  }

  return {
    firstPersonPrefix,
    secondPersonPrefix,
    thirdPersonPrefix,
    firstPersonPluralPrefix
  };
};

export default gPreteritePrefixes;
