const boldRootConsonant = str => "<strong>" + str + "</strong>";

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
  return [
    boldRootConsonant(root[0]) +
      "a" +
      boldRootConsonant(root[1]) +
      boldRootConsonant(root[2]) +
      "um",
    boldRootConsonant(root[0]) +
      "a" +
      boldRootConsonant(root[1]) +
      vowel +
      boldRootConsonant(feminineChange(root[2], vowel)) +
      (vowel.length === 0 ? "a" : "") +
      "tum",
    firstChar +
      boldRootConsonant(root[0]) +
      "a" +
      boldRootConsonant(root[1]) +
      vowel +
      boldRootConsonant(root[2]) +
      "-"
  ];
};

export default gVerbalAdjectiveGenerator;
