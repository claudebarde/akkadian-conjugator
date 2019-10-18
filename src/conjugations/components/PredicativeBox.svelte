<script>
  import { fly, fade } from "svelte/transition";
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
  import {
    vowelSyncope,
    shortenVowel,
    allFlavorsOfVowels,
    contiguousVowels
  } from "../../settings/phonologicalRules";

  const doubleConsonantSyncope = (verb, ps) => {
    // removes last consonant for verbs like *dann
    if (ps === "3ms" && verb.slice(-1) === verb.slice(-2, -1))
      return verb.slice(0, -1);

    return verb;
  };

  $: suffixesSing = {
    "1cs": vowel + "ku",
    "2ms": vowel + "ta",
    "2fs": vowel + "ti",
    "3ms": "",
    "3fs": shortenVowel(vowel) + "t"
  };

  $: suffixesPlur = {
    "1cp": vowel + "nu",
    "2mp": vowel + "tunu",
    "2fp": vowel + "tina",
    "3mp": "ū",
    "3fp": "ā"
  };

  let radical = "";
  let vowel = "";
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    // theme vowel
    vowel = $state.I_eVerb ? "ē" : "ā";
    // removes first char *
    if ($state.verbalAdjective[2][0] === "*") {
      radical = $state.verbalAdjective[2].slice(1);
    } else {
      radical = $state.verbalAdjective[2];
    }
    // double vowel contraction
    const lastVowel = radical.slice(-1);
    if (allFlavorsOfVowels.includes(lastVowel)) {
      suffixesSing = {
        "1cs": contiguousVowels(lastVowel, vowel) + "ku",
        "2ms": contiguousVowels(lastVowel, vowel) + "ta",
        "2fs": contiguousVowels(lastVowel, vowel) + "ti",
        "3ms": lastVowel,
        "3fs": contiguousVowels(lastVowel, shortenVowel(vowel)) + "t"
      };
      suffixesPlur = {
        "1cp": contiguousVowels(lastVowel, vowel) + "nu",
        "2mp": contiguousVowels(lastVowel, vowel) + "tunu",
        "2fp": contiguousVowels(lastVowel, vowel) + "tina",
        "3mp": contiguousVowels(lastVowel, "ū"),
        "3fp": contiguousVowels(lastVowel, "ā")
      };
      radical = radical.slice(0, -1);
    }
  }
</script>

<style>
  .verbDisplay {
    background-color: transparent;
  }
</style>

{#if $state.infinitive !== 'edûm' && $state.infinitive !== 'išûm'}
  <!-- COMPUTER VERSION-->
  <div class="message is-primary is-hidden-mobile conjugation-box">
    <div class="message-header">
      <p>Predicative Construction</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column is-half">
          <table class="table verbDisplay">
            <thead>
              <th>Person</th>
              <th>Verb</th>
            </thead>
            <tbody>
              {#each Object.keys(suffixesSing) as ps}
                <tr>
                  <td>{ps}:</td>
                  {#if $state.rootHighlight}
                    <td>
                      {@html highlightRoot({
                        verb: doubleConsonantSyncope(
                          vowelSyncope(radical + suffixesSing[ps]),
                          ps
                        ),
                        root: $state.root,
                        conjugation: 'gPredicative',
                        ps,
                        infinitive: $state.infinitive
                      })}
                    </td>
                  {:else}
                    <td>
                      {doubleConsonantSyncope(vowelSyncope(radical + suffixesSing[ps]))}
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="column is-half">
          <table class="table verbDisplay">
            <thead>
              <th>Person</th>
              <th>Verb</th>
            </thead>
            <tbody>
              {#each Object.keys(suffixesPlur) as ps}
                <tr>
                  <td>{ps}:</td>
                  {#if $state.rootHighlight}
                    <td>
                      {@html highlightRoot({
                        verb: vowelSyncope(radical + suffixesPlur[ps]),
                        root: $state.root,
                        conjugation: 'gPredicative',
                        ps,
                        infinitive: $state.infinitive
                      })}
                    </td>
                  {:else}
                    <td>{vowelSyncope(radical + suffixesPlur[ps])}</td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- MOBILE VERSION-->
  <div class="message is-primary is-hidden-tablet is-small conjugation-box">
    <div class="message-header">
      <p>Predicative Construction</p>
    </div>
    <div class="message-body">
      <div class="columns is-mobile">
        <div class="column is-half">
          <table class="table verbDisplay">
            <thead>
              <th>Person</th>
              <th>Verb</th>
            </thead>
            <tbody>
              {#each Object.keys(suffixesSing) as ps}
                <tr>
                  <td>{ps}:</td>
                  {#if $state.rootHighlight}
                    <td>
                      {@html highlightRoot({
                        verb: doubleConsonantSyncope(
                          vowelSyncope(radical + suffixesSing[ps]),
                          ps
                        ),
                        root: $state.root,
                        conjugation: 'gPredicative',
                        ps,
                        infinitive: $state.infinitive
                      })}
                    </td>
                  {:else}
                    <td>
                      {doubleConsonantSyncope(vowelSyncope(radical + suffixesSing[ps]))}
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="column is-half">
          <table class="table verbDisplay">
            <thead>
              <th>Person</th>
              <th>Verb</th>
            </thead>
            <tbody>
              {#each Object.keys(suffixesPlur) as ps}
                <tr>
                  <td>{ps}:</td>
                  {#if $state.rootHighlight}
                    <td>
                      {@html highlightRoot({
                        verb: vowelSyncope(radical + suffixesPlur[ps]),
                        root: $state.root,
                        conjugation: 'gPredicative',
                        ps,
                        infinitive: $state.infinitive
                      })}
                    </td>
                  {:else}
                    <td>{vowelSyncope(radical + suffixesPlur[ps])}</td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
{/if}
