<script>
  import { fly, fade } from "svelte/transition";
  import state from "../../../state/state";
  import settings from "../../../settings/settings";
  import contractLastVowels from "../../../settings/contractLastVowels";
  import {
    contiguousVowels,
    lengthenVowel
  } from "../../../settings/phonologicalRules";
  import highlightRoot from "../../../settings/highlightRoot";
  import addVentive from "../../../settings/addVentive";

  const personSing = ["3cs", "1cs"];
  const personPlur = ["3mp", "3fp", "1cp"];
  const prefixes = {
    "3cs": "li",
    "1cs": "lu",
    "3mp": "li",
    "3fp": "li",
    "1cp": "i nu"
  };

  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};
    let { root, I_eVerb } = $state;
    let thisRoot = [...root];
    let firstVowel = I_eVerb ? "e" : "a";
    // The vowels i and ī were apparently pronounced as e and ē,
    // respectively, when they occurred before the consonants r and ḫ.
    let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

    conjugatedVerb = {
      "3cs":
        prefixes["3cs"] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "1cs":
        prefixes["1cs"] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "3mp":
        prefixes["3mp"] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        "ū",
      "3fp":
        prefixes["3fp"] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        "ā",
      "1cp":
        prefixes["1cp"] +
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2]
    };

    state.updateVerb({ ...state, dPrecative: conjugatedVerb });
  }
</script>

<style>
  .conjugation-box {
    text-align: center;
  }

  .conjugation-person {
    font-size: 0.8rem;
    margin-right: 8px;
  }
</style>

{#if $state.dPrecative === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION-->
  <div class="message is-primary is-small is-hidden-tablet conjugation-box">
    <div class="message-header">
      <p>Precative</p>
    </div>
    <div class="message-body">
      <div class="columns is-mobile">
        <div class="column is-half">
          {#each personSing as ps}
            <p>
              <span class="conjugation-person has-text-grey-light">{ps}:</span>
              {#if $state.rootHighlight}
                {@html highlightRoot({
                  verb: $state.ventive
                    ? addVentive({
                        verb: $state.dPrecative[ps],
                        ps,
                        conjugation: 'dPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.dPrecative[ps],
                  root: $state.root,
                  conjugation: 'dPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.dPrecative[ps],
                      ps,
                      conjugation: 'dPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.dPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
        <div class="column is-half">
          {#each personPlur as ps}
            <p>
              <span class="conjugation-person has-text-grey-light">{ps}:</span>
              {#if $state.rootHighlight}
                {@html highlightRoot({
                  verb: $state.ventive
                    ? addVentive({
                        verb: $state.dPrecative[ps],
                        ps,
                        conjugation: 'dPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.dPrecative[ps],
                  root: $state.root,
                  conjugation: 'dPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.dPrecative[ps],
                      ps,
                      conjugation: 'dPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.dPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- MOBILE VERSION-->
  <div class="message is-primary is-hidden-mobile conjugation-box">
    <div class="message-header">
      <p>Precative</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column is-half">
          {#each personSing as ps}
            <p>
              <span class="conjugation-person has-text-grey-light">{ps}:</span>
              {#if $state.rootHighlight}
                {@html highlightRoot({
                  verb: $state.ventive
                    ? addVentive({
                        verb: $state.dPrecative[ps],
                        ps,
                        conjugation: 'dPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.dPrecative[ps],
                  root: $state.root,
                  conjugation: 'dPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.dPrecative[ps],
                      ps,
                      conjugation: 'dPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.dPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
        <div class="column is-half">
          {#each personPlur as ps}
            <p>
              <span class="conjugation-person has-text-grey-light">{ps}:</span>
              {#if $state.rootHighlight}
                {@html highlightRoot({
                  verb: $state.ventive
                    ? addVentive({
                        verb: $state.dPrecative[ps],
                        ps,
                        conjugation: 'dPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.dPrecative[ps],
                  root: $state.root,
                  conjugation: 'dPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.dPrecative[ps],
                      ps,
                      conjugation: 'dPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.dPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
