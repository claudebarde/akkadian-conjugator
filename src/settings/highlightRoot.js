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

const highlightRoot = (verb, root, conjugation, ps) => {
  let highlightedVerb = "";
  //console.log(root);

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
  } else {
    highlightedVerb = [...verb];
  }

  return highlightedVerb.join("");
};

export default highlightRoot;
