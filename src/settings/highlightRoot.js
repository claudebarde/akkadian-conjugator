// position to highlight for preterite
const posPret3C = {
  "3cs": [1, 2, 4],
  "2ms": [2, 3, 5],
  "2fs": [2, 3, 5],
  "1cs": [1, 2, 4],
  "3mp": [1, 2, 4],
  "3fp": [1, 2, 4],
  "2cp": [2, 3, 5],
  "1cp": [2, 3, 5]
};

const posPretIIIweak = {
  "3cs": [1, 2],
  "2ms": [2, 3],
  "2fs": [2, 3],
  "1cs": [1, 2],
  "3mp": [1, 2],
  "3fp": [1, 2],
  "2cp": [2, 3],
  "1cp": [2, 3]
};

const posPretIweak = {
  "3cs": [1, 3],
  "2ms": [2, 4],
  "2fs": [2, 4],
  "1cs": [1, 3],
  "3mp": [1, 3],
  "3fp": [1, 3],
  "2cp": [2, 4],
  "1cp": [2, 4]
};

const posPretIIweak = {
  "3cs": [1, 3],
  "2ms": [2, 4],
  "2fs": [2, 4],
  "1cs": [1, 3],
  "3mp": [1, 3],
  "3fp": [1, 3],
  "2cp": [2, 4],
  "1cp": [2, 4]
};

// position to highlight for durative
const posDur3C = {
  "3cs": [1, 4, 6],
  "2ms": [2, 5, 7],
  "2fs": [2, 5, 7],
  "1cs": [1, 4, 6],
  "3mp": [1, 4, 6],
  "3fp": [1, 4, 6],
  "2cp": [2, 5, 7],
  "1cp": [2, 5, 7]
};

const posDurIIIweak = {
  "3cs": [1, 4],
  "2ms": [2, 5],
  "2fs": [2, 5],
  "1cs": [1, 4],
  "3mp": [1, 4],
  "3fp": [1, 4],
  "2cp": [2, 5],
  "1cp": [2, 5]
};

const posDurIweak = {
  "3cs": [2, 4],
  "2ms": [3, 5],
  "2fs": [3, 5],
  "1cs": [2, 4],
  "3mp": [2, 4],
  "3fp": [2, 4],
  "2cp": [3, 5],
  "1cp": [3, 5]
};

const posDurIIweak = {
  "3cs": [1, 4],
  "2ms": [2, 5],
  "2fs": [2, 5],
  "1cs": [1, 4],
  "3mp": [1, 4],
  "3fp": [1, 4],
  "2cp": [2, 5],
  "1cp": [2, 5]
};

const verbalAdjective = {
  sound: {
    masculin: [0, 2, 3],
    feminin: [0, 2, 4],
    radical: [0, 2, 4]
  },
  Iweak: {
    masculin: [1, 2],
    feminin: [1, 3],
    radical: [1, 3]
  },
  IIweak: {
    masculin: [0, 2],
    feminin: [0, 2],
    radical: [0, 2]
  },
  IIIweak: {
    masculin: [0, 2],
    feminin: [0, 2],
    radical: [0, 2]
  }
};

const highlightRoot = ({ verb, root, conjugation, ps, infinitive }) => {
  let highlightedVerb = [];
  //console.log(verb, root, conjugation, ps, infinitive);
  // HIGHLIGHT IRREGULAR VERBS
  if (infinitive === "babālum" && conjugation === "gPreterite") {
    switch (ps) {
      case "3cs":
        highlightedVerb = [
          "u",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>"
        ];
        break;
      case "2ms":
        highlightedVerb = [
          "tu",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>"
        ];
        break;
      case "2fs":
        highlightedVerb = [
          "tu",
          "<strong>b</strong>",
          "<strong>l</strong>",
          "ī/tu",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>",
          "ī"
        ];
        break;
      case "1cs":
        highlightedVerb = [
          "u",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>"
        ];
        break;
      case "3mp":
        highlightedVerb = [
          "u",
          "<strong>b</strong>",
          "<strong>l</strong>",
          "ū/u",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>",
          "ū"
        ];
        break;
      case "3fp":
        highlightedVerb = [
          "u",
          "<strong>b</strong>",
          "<strong>l</strong>",
          "ā/u",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>",
          "ā"
        ];
        break;
      case "2cp":
        highlightedVerb = [
          "tu",
          "<strong>b</strong>",
          "<strong>l</strong>",
          "ā/tu",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>",
          "ā"
        ];
        break;
      case "1cp":
        highlightedVerb = [
          "nu",
          "<strong>b</strong>",
          "i",
          "<strong>l</strong>"
        ];
        break;
    }

    return highlightedVerb.join("");
  }

  if (conjugation === "gPreterite") {
    // 3 consonant root
    if (!root.includes("Ø")) {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posPret3C[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[0] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posPretIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[1] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posPretIIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[2] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posPretIIIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gDurative") {
    if (!root.includes("Ø")) {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posDur3C[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[0] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posDurIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[1] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posDurIIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[2] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (posDurIIIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "verbalAdjective") {
    // we store the non attested status to add it back after highlighting
    let nonAttested = false;
    if (verb[0] === "*") {
      verb = verb.slice(1);
      nonAttested = true;
    }

    if (!root.includes("Ø")) {
      highlightedVerb = [...verb].map((letter, i) => {
        if (verbalAdjective.sound[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[0] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (verbalAdjective.Iweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[1] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (verbalAdjective.IIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[2] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (verbalAdjective.IIIweak[ps].includes(i)) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else {
      highlightedVerb = [...verb];
    }
    // we reinstate the asterisk if necessary
    if (nonAttested) highlightedVerb = ["*", ...highlightedVerb];
  } else {
    highlightedVerb = [...verb];
  }

  return highlightedVerb.join("");
};

export default highlightRoot;
