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
    let {
      root,
      verbalAdjectiveVowel,
      themeVowel,
      attested,
      wordClass,
      I_eVerb,
      type
    } = $state;

    // Participles of stative verbs, such as watārum or marāṣum, do not occur
    if (wordClass === "adjective" || (root[0] === "w" && type == "stative")) {
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

    state.updateVerb({ ...state, gParticiple: adjectiveForms });
  }
</script>

<h5 class="subtitle is-6 is-size-7-mobile">Participle:</h5>
<table class="table">
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
            verb: $state.gParticiple[0],
            root: $state.root,
            conjugation: 'gParticiple',
            ps: 'masculin',
            infinitive: $state.infinitive
          })}
        </td>
      {:else}
        <td>
          {@html $state.gParticiple[0]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.gParticiple[1],
            root: $state.root,
            conjugation: 'gParticiple',
            ps: 'feminin',
            infinitive: $state.infinitive
          })}
        </td>
      {:else}
        <td>
          {@html $state.gParticiple[1]}
        </td>
      {/if}
      {#if $state.rootHighlight}
        <td>
          {@html highlightRoot({
            verb: $state.gParticiple[2],
            root: $state.root,
            conjugation: 'gParticiple',
            ps: 'feminin',
            infinitive: $state.infinitive
          })}
        </td>
      {:else}
        <td>
          {@html $state.gParticiple[2]}
        </td>
      {/if}
    </tr>
  </tbody>
</table>
