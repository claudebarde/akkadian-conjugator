const boldRootConsonant = str => "<strong>" + str + "</strong>";

const gPreteriteGenerator = ([...root], themeVowel) => {
  // PHONOLOGICAL CHANGES
  // Verbs I–n
  if (root[0] === "n") root[0] = root[1];

  return {
    "3cs":
      "i" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]),
    "2ms":
      "ta" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]),
    "2fs":
      "ta" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]) +
      "ī",
    "1cs":
      "a" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]),
    "3mp":
      "i" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]) +
      "ū",
    "3fp":
      "i" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]) +
      "ā",
    "2cp":
      "ta" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2]) +
      "ā",
    "1cp":
      "ni" +
      boldRootConsonant(root[0]) +
      boldRootConsonant(root[1]) +
      themeVowel +
      boldRootConsonant(root[2])
  };
};

export default gPreteriteGenerator;
