<script>
  import { fly } from "svelte/transition";
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
    // IRREGULAR VERBAL ADJECTIVES
    // ešērum => išarum
    if (verbInput === "ešērum") {
      adjectiveForms = ["išarum", "išartum", "išar-"]; // ešērum => išarum
    } else if (verbInput === "edēšum") {
      adjectiveForms = ["eššum", "eššetum", "ešš-"];
    } else {
      let {
        root,
        verbalAdjectiveVowel,
        themeVowel,
        attested,
        wordClass,
        I_eVerb
      } = $state;
      let thisRoot = [...root];
      let vowel = verbalAdjectiveVowel || "i";

      // checks if vowel is attested or not in lexicon
      let firstChar = "";
      if (!verbalAdjectiveVowel) firstChar = "*";
      // checks if verbal adjective with R1 and R2 being the same
      if (wordClass === "adjective" && thisRoot[1] === thisRoot[2]) {
        vowel = "";
      }

      // Vocalic harmony
      let baseVowel = "a";
      if (themeVowel === "e") {
        baseVowel = "e";
      }

      // Verbs I-a and I-e
      if (thisRoot[0] === "Ø") {
        thisRoot[0] = "";
        if (I_eVerb) baseVowel = "e";
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
            thisRoot[2] +
            "-"
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
          firstChar + thisRoot[0] + vowel + thisRoot[1] + thisRoot[2] + "-"
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
            thisRoot[2] +
            "-"
        ];
      }
    }

    state.updateVerb({ ...state, gVerbalAdjective: adjectiveForms });
  }
</script>

{#if $state.gVerbalAdjective === undefined}
  <div />
{:else}
  <div
    class="message is-primary"
    transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
    <div class="message-header">
      <p>Non-finite forms</p>
    </div>
    <div class="message-body">
      <p>
        <strong>Verbal Adjective:</strong>
      </p>
      <p class="verbal-adjective">
        {#if $state.rootHighlight}
          <span>
            {@html highlightRoot({
              verb: $state.gVerbalAdjective[0],
              root: $state.root,
              conjugation: 'verbalAdjective',
              ps: 'masculin',
              infinitive: $state.infinitive
            })}
          </span>
        {:else}
          <span>
            {@html $state.gVerbalAdjective[0]}
          </span>
        {/if}
        /
        {#if $state.rootHighlight}
          <span>
            {@html highlightRoot({
              verb: $state.gVerbalAdjective[1],
              root: $state.root,
              conjugation: 'verbalAdjective',
              ps: 'feminin',
              infinitive: $state.infinitive
            })}
          </span>
        {:else}
          <span>
            {@html $state.gVerbalAdjective[1]}
          </span>
        {/if}
        (
        {#if $state.rootHighlight}
          <span>
            {@html highlightRoot({
              verb: $state.gVerbalAdjective[2],
              root: $state.root,
              conjugation: 'verbalAdjective',
              ps: 'feminin',
              infinitive: $state.infinitive
            })}
          </span>
        {:else}
          <span>
            {@html $state.gVerbalAdjective[2]}
          </span>
        {/if}
        )
      </p>
    </div>
  </div>
{/if}
