const gPreteritePrefixes = ({
  root,
  themeVowel,
  I_eVerb,
  verbClass,
  durative
}) => {
  let firstPersonPrefix = "a";
  let secondPersonPrefix = "ta";
  let thirdPersonPrefix = "i";
  let firstPersonPluralPrefix = "ni";
  root = [...root];

  // Vocalic harmony
  if (
    (root[2] === "Ø" && (themeVowel === "e" || I_eVerb === true)) ||
    (root[1] === "Ø" && themeVowel === "e" && durative === true)
  ) {
    firstPersonPrefix = "e";
    secondPersonPrefix = "te";
  } else if (
    ((root[0] === "Ø" || root[0] === "w") && I_eVerb === true) ||
    (root[1] === "Ø" && themeVowel === "e" && durative === false)
  ) {
    firstPersonPrefix = "ē";
    secondPersonPrefix = "tē";
  }

  // Verbs I-a and I-e and I-w
  if (root[0] === "Ø" || root[0] === "w") {
    if (root[0] === "Ø" && durative === false) {
      // we lengthen the person prefix
      // we do not lengthen for first and second if already done above
      if (!I_eVerb) {
        firstPersonPrefix = "ā";
        secondPersonPrefix = "tā";
      }
      thirdPersonPrefix = "ī";
      firstPersonPluralPrefix = "nī";
    } else if (root[0] === "w" && verbClass === "active") {
      // active I-w verbs have special "u" for person prefix
      firstPersonPrefix = "u";
      secondPersonPrefix = "tu";
      thirdPersonPrefix = "u";
      firstPersonPluralPrefix = "nu";
    } else if (
      root[0] === "w" &&
      verbClass === "stative" &&
      durative === false
    ) {
      // stative I-w verbs
      firstPersonPrefix = "ē";
      secondPersonPrefix = "tē";
      thirdPersonPrefix = "ī";
      firstPersonPluralPrefix = "nī";
    } else if (
      root[0] === "w" &&
      verbClass === "stative" &&
      durative === true
    ) {
      // stative I-w verbs
      firstPersonPrefix = "e";
      secondPersonPrefix = "te";
      thirdPersonPrefix = "i";
      firstPersonPluralPrefix = "ni";
    } else if (root[0] === "Ø" && durative === true) {
      // durative uses same vowels but they are not lengthened
      if (I_eVerb) {
        firstPersonPrefix = "e";
        secondPersonPrefix = "te";
      } else {
        firstPersonPrefix = "a";
        secondPersonPrefix = "ta";
      }
      thirdPersonPrefix = "i";
      firstPersonPluralPrefix = "ni";
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
