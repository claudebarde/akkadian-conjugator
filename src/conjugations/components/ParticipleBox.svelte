<script>
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
  import {
    contiguousVowels,
    lengthenVowel,
    feminineChange
  } from "../../settings/phonologicalRules";

  // returns masculine, feminine and base
  let adjectiveForms = [];
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;

    if ($state.activeView === "gstem") {
      // IRREGULAR VERBAL ADJECTIVES
      // ešērum => išarum
      if (verbInput === "aḫāzum") {
        adjectiveForms = ["āḫizum", "āḫiztum", "āḫiz"];
      } else if (verbInput === "zâzum") {
        adjectiveForms = ["zāˀizum", "zāˀiztum", "zāˀiz"];
      } else {
        let {
          root,
          verbalAdjectiveVowel,
          themeVowel,
          attested,
          verbClass,
          I_eVerb
        } = $state;

        // Participles of stative verbs, such as watārum or marāṣum, do not occur
        if (
          verbClass === "stative" ||
          (root[0] === "w" && verbClass == "stative")
        ) {
          adjectiveForms = ["-", "-", "-"];
        } else {
          let thisRoot = [...root];

          let firstVowel = I_eVerb || themeVowel === "e" ? "ē" : "ā";
          let secondVowel = "i";
          let masculinSuffix = "um";

          if (thisRoot[0] === "Ø") thisRoot[0] = "";

          if (thisRoot[2] === "Ø") {
            thisRoot[2] = "";
            masculinSuffix = "ûm";
            secondVowel = "i";
          }

          if (thisRoot[1] === "Ø") thisRoot[1] = "ˀ";

          let masculine =
            thisRoot[0] +
            firstVowel +
            thisRoot[1] +
            secondVowel +
            thisRoot[2] +
            masculinSuffix;
          let feminine =
            thisRoot[0] +
            firstVowel +
            thisRoot[1] +
            secondVowel +
            feminineChange(thisRoot[2], "t") +
            "tum";
          let radical =
            thisRoot[0] +
            firstVowel +
            thisRoot[1] +
            secondVowel +
            thisRoot[2] +
            "-";

          if (root[2] == "Ø") {
            // removes extra "i" in masculine
            masculine = masculine.slice(0, -3) + masculine.slice(-2);
            // lengthen second syllable in feminine
            feminine =
              feminine.slice(0, -4) +
              lengthenVowel(feminine.slice(-4, -3)) +
              feminine.slice(-3);
          }

          adjectiveForms = [masculine, feminine, radical];
        }
      }

      state.updateVerb({ ...state, participle: adjectiveForms });
    } else if ($state.activeView === "dstem") {
      let { root } = $state;
      let thisRoot = [...root];
      let firstVowel = $state.I_eVerb ? "e" : "a";
      // The vowels i and ī were apparently pronounced as e and ē,
      // respectively, when they occurred before the consonants r and ḫ.
      let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";
      let secondVowelMasculine = secondVowel;
      let suffix = "um";

      // III-weak verbs
      if (thisRoot[2] === "Ø") {
        thisRoot[2] = "";
        suffix = "ûm";
        secondVowelMasculine = "";
      }
      // I-weak verbs
      if (thisRoot[0] === "Ø") {
        thisRoot[0] = "";
        firstVowel = "";
      }
      // I-w verbs
      if (thisRoot[0] === "w") {
        firstVowel = "a";
      }

      adjectiveForms = [
        "mu" +
          thisRoot[0] +
          firstVowel +
          thisRoot[1] +
          thisRoot[1] +
          secondVowelMasculine +
          thisRoot[2] +
          suffix,
        "mu" +
          thisRoot[0] +
          firstVowel +
          thisRoot[1] +
          thisRoot[1] +
          secondVowel +
          feminineChange(thisRoot[2], "t") +
          "tum",
        "mu" +
          thisRoot[0] +
          firstVowel +
          thisRoot[1] +
          thisRoot[1] +
          secondVowel +
          thisRoot[2]
      ];

      state.updateVerb({ ...state, participle: adjectiveForms });
    }
  }
</script>

<style>
  .verbDisplay {
    background-color: transparent;
  }
</style>

<h5 class="subtitle is-6 is-size-7-mobile" style="text-align:left;">
  Participle:
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
            verb: $state.participle[0],
            root: $state.root,
            conjugation: 'participle',
            ps: 'masculin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          })}
        </td>
      {:else}
        <td>
          {@html $state.participle[0]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.participle[1],
            root: $state.root,
            conjugation: 'participle',
            ps: 'feminin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          })}
        </td>
      {:else}
        <td>
          {@html $state.participle[1]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.participle[2],
            root: $state.root,
            conjugation: 'participle',
            ps: 'feminin',
            infinitive: $state.infinitive,
            stem: $state.activeView
          })}
        </td>
      {:else}
        <td>
          {@html $state.participle[2]}
        </td>
      {/if}
    </tr>
  </tbody>
</table>
