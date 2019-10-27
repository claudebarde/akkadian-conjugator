<script>
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
  import {
    contiguousVowels,
    lengthenVowel,
    feminineChange
  } from "../../settings/phonologicalRules";
  import irregularVerbalAdjectives from "../../settings/irregularVerbalAdjectives.js";

  // returns masculine, feminine and base
  let adjectiveForms = [];
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    /*
     * G STEM
     */
    if ($state.activeView === "gstem") {
      // IRREGULAR VERBAL ADJECTIVES
      if (Object.keys(irregularVerbalAdjectives).includes(verbInput)) {
        adjectiveForms = [...irregularVerbalAdjectives[verbInput]];
      } else {
        let {
          root,
          verbalAdjectiveVowel,
          themeVowel,
          attested,
          verbClass,
          I_eVerb
        } = $state;
        let thisRoot = [...root];
        let vowel = verbalAdjectiveVowel || "i";

        // checks if vowel is attested or not in lexicon
        let firstChar = "";
        if (!verbalAdjectiveVowel) firstChar = "*";
        // checks if verbal adjective with R1 and R2 being the same
        if (verbClass === "stative" && thisRoot[1] === thisRoot[2]) {
          vowel = "";
        }

        // Vocalic harmony
        let baseVowel = "a";
        if (themeVowel === "e" || I_eVerb) {
          baseVowel = "e";
        }

        // Verbs I-a and I-e
        if (thisRoot[0] === "Ø") {
          thisRoot[0] = "";
          if (I_eVerb) baseVowel = "e";
        }

        // Verbs I-ˀ
        if (thisRoot[0] === "ˀ") {
          thisRoot[0] = "";
        }

        // Verbs III-weak
        if (thisRoot[2] === "Ø") {
          thisRoot[2] = "";
          adjectiveForms = [
            thisRoot[0] +
              baseVowel +
              thisRoot[1] +
              thisRoot[2] +
              contiguousVowels(vowel, "u") +
              "m",
            thisRoot[0] +
              baseVowel +
              thisRoot[1] +
              lengthenVowel(vowel) +
              thisRoot[2] +
              "tum",
            firstChar +
              thisRoot[0] +
              baseVowel +
              thisRoot[1] +
              vowel +
              thisRoot[2]
          ];
        }
        // Verbs II-weak
        else if (thisRoot[1] === "Ø") {
          thisRoot[1] = "";
          adjectiveForms = [
            thisRoot[0] + vowel + thisRoot[1] + thisRoot[2] + "um",
            thisRoot[0] +
              vowel +
              thisRoot[1] +
              feminineChange(thisRoot[2], "t") +
              "tum",
            firstChar + thisRoot[0] + vowel + thisRoot[1] + thisRoot[2]
          ];
        } else {
          adjectiveForms = [
            thisRoot[0] + baseVowel + thisRoot[1] + thisRoot[2] + "um",
            thisRoot[0] +
              baseVowel +
              thisRoot[1] +
              vowel +
              feminineChange(thisRoot[2], vowel) +
              (vowel.length === 0 ? "a" : "") +
              "tum",
            firstChar +
              thisRoot[0] +
              baseVowel +
              thisRoot[1] +
              vowel +
              thisRoot[2]
          ];
        }

        // we reinstate the "i" between R1 and R2 for verbs with R2 = "w"
        if (root[1] === "w") {
          adjectiveForms[0] =
            thisRoot[0] + baseVowel + thisRoot[1] + vowel + thisRoot[2] + "um";
        }
      }

      state.updateVerb({ ...state, verbalAdjective: adjectiveForms });
    } else if ($state.activeView === "dstem") {
      /*
       * D STEM
       */
      let thisRoot = [...$state.root];
      let secondVowelMasculine = "u";
      let secondVowelFeminine = "u";
      let suffix = "um";

      // III-weak verbs
      if (thisRoot[2] === "Ø") {
        thisRoot[2] = "";
        suffix = "ûm";
        secondVowelMasculine = "";
        secondVowelFeminine = "ū";
        /*adjectiveForms = [
          thisRoot[0] + "u" + thisRoot[1] + thisRoot[1] + "ûm",
          thisRoot[0] + "u" + thisRoot[1] + thisRoot[1] + "ūtum",
          thisRoot[0] + "u" + thisRoot[1] + thisRoot[1] + "u"
        ];*/
      }
      // I-weak verbs
      if (thisRoot[0] === "Ø") thisRoot[0] = "";
      // I-w verbs
      if (thisRoot[0] === "w") {
        thisRoot[0] = "";
      }

      adjectiveForms = [
        thisRoot[0] +
          "u" +
          thisRoot[1] +
          thisRoot[1] +
          secondVowelMasculine +
          thisRoot[2] +
          suffix,
        thisRoot[0] +
          "u" +
          thisRoot[1] +
          thisRoot[1] +
          secondVowelFeminine +
          feminineChange(thisRoot[2], "t") +
          "tum",
        thisRoot[0] + "u" + thisRoot[1] + thisRoot[1] + "u" + thisRoot[2]
      ];

      state.updateVerb({ ...state, verbalAdjective: adjectiveForms });
    } else if ($state.activeView === "shstem") {
      /*
       * SH STEM
       */
      let thisRoot = [...$state.root];
      let firstVowel = "u";
      let secondVowelMasculine = "u";
      let secondVowelFeminine = "u";
      let suffix = "um";

      // III-weak verbs
      if (thisRoot[2] === "Ø") {
        thisRoot[2] = "";
        suffix = "ûm";
        secondVowelMasculine = "";
        secondVowelFeminine = "ū";
      }
      // Verbs I-weak && Irregular verb babālum
      if (thisRoot[0] === "Ø" || verbInput === "babālum") {
        thisRoot[0] = "";
        firstVowel = lengthenVowel(firstVowel);
      }
      // I-w verbs
      if (thisRoot[0] === "w") {
        thisRoot[0] = "";
      }
      // Verbs I–n
      if (thisRoot[0] === "n" && $state.root[1] !== "Ø")
        thisRoot[0] = thisRoot[1];

      adjectiveForms = [
        "š" +
          firstVowel +
          thisRoot[0] +
          thisRoot[1] +
          secondVowelMasculine +
          thisRoot[2] +
          suffix,
        "š" +
          firstVowel +
          thisRoot[0] +
          thisRoot[1] +
          secondVowelFeminine +
          feminineChange(thisRoot[2], "t") +
          "tum",
        "š" + firstVowel + thisRoot[0] + thisRoot[1] + "u" + thisRoot[2]
      ];

      state.updateVerb({ ...state, verbalAdjective: adjectiveForms });
    }
  }
</script>

<style>
  .verbDisplay {
    background-color: transparent;
  }
</style>

<h5 class="subtitle is-6 is-size-7-mobile" style="text-align:left;">
  Verbal Adjective:
</h5>
<table class="table verbDisplay">
  <thead>
    <th>Masculine</th>
    <th>Feminine</th>
    <th>Radical</th>
  </thead>
  <tbody>
    <tr>
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.verbalAdjective[0],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'masculin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          })}
        </td>
      {:else}
        <td>
          {@html $state.verbalAdjective[0]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.verbalAdjective[1],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'feminin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          })}
        </td>
      {:else}
        <td>
          {@html $state.verbalAdjective[1]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.verbalAdjective[2],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'feminin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          }) + '-'}
        </td>
      {:else}
        <td>
          {@html $state.verbalAdjective[2]}
        </td>
      {/if}
    </tr>
  </tbody>
</table>
