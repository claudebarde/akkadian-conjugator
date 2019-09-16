const feminineChange = (rootVowel, vowel) => {
  // phonological rules
  if (vowel.length > 0) {
    // both consonants are in contact
    const turnIntoT = ["ṭ", "n", "d"];
    if (turnIntoT.includes(rootVowel)) return "t";
    const turnIntoSH = ["s", "ṣ", "z"];
    if (turnIntoSH.includes(rootVowel)) return "š";
  }

  return rootVowel;
};

const gVerbalAdjectiveGenerator = (
  [...root],
  vowel = "i",
  attested,
  wordClass
) => {
  // checks if vowel is attested or not in lexicon
  let firstChar = "";
  if (!attested) firstChar = "*";
  // checks if verbal adjective with R1 and R2 being the same
  if (wordClass === "adjective" && root[1] === root[2]) {
    vowel = "";
  }

  // returns masculine, feminine and base
  let adjectiveForms = [
    root[0] + "a" + root[1] + root[2] + "um",
    root[0] +
      "a" +
      root[1] +
      vowel +
      feminineChange(root[2], vowel) +
      (vowel.length === 0 ? "a" : "") +
      "tum",
    firstChar + root[0] + "a" + root[1] + vowel + root[2] + "-"
  ];

  // Verbs III-weak
  if (root[2] === "Ø") {
    root[2] = "";
  }

  return adjectiveForms;
};

export default gVerbalAdjectiveGenerator;
