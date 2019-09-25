import { contiguousVowels, shortenVowel } from "./phonologicalRules";
import lexicon from "../lexicon/lexicon";

const babalum = {
  "3cs": "ublam",
  "2ms": "tublam",
  "2fs": "tubliam",
  "1cs": "ublam",
  "3mp": "ublûm",
  "3fp": "ublâm",
  "2cp": "tublâm",
  "1cp": "nublam"
};

const addVentive = ({ verb, ps, conjugation, root, infinitive }) => {
  let suffix = "";
  let infinitiv;

  // IRREGULAR VERBS
  if (infinitive === "babālum" && conjugation === "gPreterite")
    return babalum[ps];
  // -am on the 3cs, 2ms, 1cs, and 1cp
  if (["3cs", "2ms", "1cs", "1cp"].includes(ps)) {
    suffix = "am";
  }
  // -m on the 2fs
  else if (ps === "2fs") {
    suffix = "m";
  }
  // -nim on the 3mp, 3fp, and 2cp
  else if (["3mp", "3fp", "2cp"].includes(ps)) {
    suffix = "nim";
  }

  verb = verb + suffix;

  // The ending -am is subject to the regular rules of vowel contraction
  // when it occurs with verbs III–weak
  if (root[2] === "Ø" && suffix === "am") {
    const firstVowel = verb.slice(-3, -2);
    const secondVowel = verb.slice(-2, -1);
    const contractedVowel = contiguousVowels(firstVowel, secondVowel);
    //console.log(verb, firstVowel, secondVowel, contractedVowel);
    verb = verb.slice(0, -3) + contractedVowel + "m";
  }

  // the addition of -am affects the Preterite forms of active verbs I–w
  // and the Durative forms of verbs II–weak in the same way as
  // the addition of "ī", "ū", "ā"
  if (
    root[0] === "w" &&
    lexicon[infinitive].type === "active" &&
    conjugation === "gPreterite"
  ) {
    if (!verb.includes(root[1] + root[2])) {
      verb = verb.slice(0, -4) + verb.slice(-3);
    }
  }

  // vowel syncope for 2ms in G Imperative
  if (
    conjugation === "gImperative" &&
    (!root.includes("Ø") || root[0] === "Ø") &&
    ps === "2ms" &&
    root[0] !== "w" &&
    infinitive !== "babālum"
  ) {
    verb = verb.slice(0, -4) + verb.slice(-3);
  }

  // vowel syncope for I-w in G precative
  if (
    conjugation === "gPrecative" &&
    (root[0] === "w" && lexicon[infinitive].type === "active")
  ) {
    if (ps === "3cs" || ps === "1cs" || ps === "1cp") {
      verb = verb.slice(0, -4) + verb.slice(-3);
    }
  }

  // vowel syncope for sound verbs in perfect
  if (conjugation === "gPerfect" && (!root.includes("Ø") || root[0] === "Ø")) {
    if (ps === "3cs" || ps === "2ms" || ps === "1cs" || ps === "1cp") {
      verb = verb.slice(0, -4) + verb.slice(-3);
    }
  }

  return verb;
};

export default addVentive;
