import * as patterns from "./highlightRootPatterns";

const highlightVerb = (verb, ps, template) => {
  if (!verb) return;

  return [...verb].map((letter, i) => {
    if (template[ps].includes(i)) {
      // if this is a position to highlight
      return "<strong>" + letter + "</strong>";
    } else {
      // if the position is not to be highlighted
      return letter;
    }
  });
};

const reduceForInitialN = scheme => {
  for (let person in scheme) {
    scheme[person] = [scheme[person][1] - 1, scheme[person][2] - 1];
  }

  return scheme;
};

const highlightRoot = ({
  verb,
  root,
  conjugation,
  ps,
  infinitive,
  ventive,
  verbClass,
  vetitive,
  stem
}) => {
  let highlightedVerb = [];
  let vetitivePrefix = undefined;

  if (!verb) return null;

  if (verb === "-" || infinitive === "edûm" || infinitive === "išûm")
    return verb;

  if (conjugation === "gPreterite") {
    // we remove vetitive prefix before highlighting the root
    if (vetitive) {
      if (verb[0] === "ē") {
        verb = verb.slice(1);
        vetitivePrefix = "ē";
      } else {
        verb = verb.slice(3);
        vetitivePrefix = "ayy";
      }
    }
    // 3 consonant root
    if (!root.includes("Ø") && root[0] !== "w" && infinitive !== "babālum") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPret3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (infinitive === "alākum") {
          if (patterns.posPretalakum[ps].includes(i)) {
            // if this is a position to highlight
            return "<strong>" + letter + "</strong>";
          } else {
            // if the position is not to be highlighted
            return letter;
          }
        } else {
          if (patterns.posPretIweak[ps].includes(i)) {
            // if this is a position to highlight
            return "<strong>" + letter + "</strong>";
          } else {
            // if the position is not to be highlighted
            return letter;
          }
        }
      });
    } else if (root[1] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretIIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretIIIweak);
    } else if (root[0] === "w" && ventive === false) {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretIw);
    } else if (root[0] === "w" && ventive == true && verbClass === "active") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretIwVentive);
    } else if (root[0] === "w" && ventive == true && verbClass === "stative") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretIw);
    } else if (infinitive === "babālum" && ventive === false) {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretNoVentBabalum);
    } else if (infinitive === "babālum" && ventive === true) {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPretVentBabalum);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gDurative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDur3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIweak);
    } else if (root[1] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIIIweak);
    } else if (root[0] === "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIw);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gImperative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      if (ventive) {
        let schemeVent = { ...patterns.posImpVent3C };
        if (root[0] === "n") {
          // imperative of verbs starting with n- lose their n-
          schemeVent = reduceForInitialN(schemeVent);
        }
        highlightedVerb = highlightVerb(verb, ps, schemeVent);
      } else {
        let schemeNoVent = { ...patterns.posImpNoVent3C };
        if (root[0] === "n") {
          // imperative of verbs starting with n- lose their n-
          schemeNoVent = reduceForInitialN(schemeNoVent);
        }
        highlightedVerb = highlightVerb(verb, ps, schemeNoVent);
      }
    } else if (root[0] === "Ø") {
      if (ventive) {
        highlightedVerb = highlightVerb(verb, ps, patterns.posImpVentIweak);
      } else {
        highlightedVerb = highlightVerb(verb, ps, patterns.posImpNoVentIweak);
      }
    } else if (root[1] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posImpIInIIIweak);
    } else if (root[2] === "Ø") {
      let scheme = { ...patterns.posImpIInIIIweak };
      if (root[0] === "n") {
        // imperative of verbs starting with n- lose their n-
        scheme = reduceForInitialN(scheme);
      }
      highlightedVerb = highlightVerb(verb, ps, scheme);
    } else if (root[0] === "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posImpIw);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gPrecative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPrec3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPrecInIIweak);
    } else if (root[1] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPrecInIIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPrecIIIweak);
    } else if (root[0] === "w") {
      if (ventive) {
        highlightedVerb = highlightVerb(verb, ps, patterns.posPrecVentIweak);
      } else {
        highlightedVerb = highlightVerb(verb, ps, patterns.posPrecNoVentIweak);
      }
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gPerfect") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPerf3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPerfIweak);
    } else if (root[1] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDurIIIweak);
    } else if (root[0] === "w") {
      if (verbClass === "active") {
        highlightedVerb = highlightVerb(verb, ps, patterns.posPerfIwActive);
      } else if (verbClass === "stative") {
        highlightedVerb = highlightVerb(verb, ps, patterns.posPerfIwStative);
      }
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "dPreterite" || conjugation === "dDurative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      if (vetitive === false) {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDPret3C);
      } else {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDVet3C);
      }
    } else if (root[0] === "Ø") {
      if (vetitive === false) {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDPretIweak);
      } else {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDVetIweak);
      }
    } else if (root[2] === "Ø") {
      if (vetitive === false) {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDPretIIIweak);
      } else {
        highlightedVerb = highlightVerb(verb, ps, patterns.posDVetIIIweak);
      }
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "dPerfect") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPerf3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPerfIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPerfIIIweak);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "dImperative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDImp3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDImpIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDImpIIIweak);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "dPrecative") {
    if (!root.includes("Ø") && root[0] !== "w") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPrec3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPrecIweak);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDPrecIIIweak);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "verbalAdjective" && stem === "gstem") {
    const verbalAdjective = { ...patterns.verbalAdjective };
    // we store the non attested status to add it back after highlighting
    let nonAttested = false;
    if (verb[0] === "*") {
      verb = verb.slice(1);
      nonAttested = true;
    }

    if (!root.includes("Ø") && root[0] !== "w") {
      if (root[1] === "w") {
        // verbs with "w" in R2 dont lose the "i" in masculine form
        highlightedVerb = [...verb].map((letter, i) => {
          if (verbalAdjective.soundR2W[ps].includes(i)) {
            // if this is a position to highlight
            return "<strong>" + letter + "</strong>";
          } else {
            // if the position is not to be highlighted
            return letter;
          }
        });
      } else {
        highlightedVerb = [...verb].map((letter, i) => {
          if (verbalAdjective.sound[ps].includes(i)) {
            // if this is a position to highlight
            return "<strong>" + letter + "</strong>";
          } else {
            // if the position is not to be highlighted
            return letter;
          }
        });
      }
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
    } else if (root[0] === "w") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (verbalAdjective.Iw[ps].includes(i)) {
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
  } else if (conjugation === "verbalAdjective" && stem === "dstem") {
    const verbalAdjective = { ...patterns.dVerbalAdjective };
    // we store the non attested status to add it back after highlighting
    let nonAttested = false;
    if (verb[0] === "*") {
      verb = verb.slice(1);
      nonAttested = true;
    }

    if (!root.includes("Ø") && root[0] !== "w") {
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
  } else if (conjugation === "participle" && stem === "gstem") {
    if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posParticipleIIw);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posParticipleIw);
    } else {
      highlightedVerb = highlightVerb(verb, ps, patterns.posParticiple);
    }
  } else if (conjugation === "participle" && stem === "dstem") {
    if (!root.includes("Ø")) {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDParticiple);
    } else if (root[2] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posDParticipleIIIw);
    } else if (root[0] === "Ø") {
      highlightedVerb = highlightVerb(verb, ps, patterns.posParticipleIw);
    } else {
      highlightedVerb = [...verb];
    }
  } else if (conjugation === "gPredicative") {
    if (!root.includes("Ø")) {
      highlightedVerb = highlightVerb(verb, ps, patterns.posPredicative3C);
    } else if (root[0] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (i === 1 || (i === 2 && ps !== "3ms") || (i === 3 && ps === "3ms")) {
          // if this is a position to highlight
          return "<strong>" + letter + "</strong>";
        } else {
          // if the position is not to be highlighted
          return letter;
        }
      });
    } else if (root[2] === "Ø" || root[1] === "Ø") {
      highlightedVerb = [...verb].map((letter, i) => {
        if (i === 0 || i === 2) {
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

  // reinstate vetitive prefix if it was removed at the beginning
  if (vetitive) {
    highlightedVerb.unshift(vetitivePrefix);
  }

  return highlightedVerb.join("");
};

export default highlightRoot;
