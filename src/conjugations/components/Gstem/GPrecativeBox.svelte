<script>
  import { fly } from "svelte/transition";
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
  const precativePrefixes = {
    "3cs": "li",
    "1cs": "lu",
    "3mp": "li",
    "3fp": "li",
    "1cp": "i ni"
  };

  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};
    let verbType = undefined;
    let { themeVowel, root, verbClass } = $state;
    let thisRoot = [...root];
    let prefixes = { ...precativePrefixes };

    // III-weak
    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
      verbType = "III-weak";
    }
    //I-n verbs
    if (thisRoot[0] === "n" && thisRoot[1] !== "Ø") {
      thisRoot[0] = thisRoot[1];
    }
    //I-a and I-e verbs and I-w verbs
    if (
      thisRoot[0] === "Ø" ||
      (thisRoot[0] === "w" && verbClass === "stative")
    ) {
      thisRoot[0] = "";
      // In verbs I–" and stative verbs I–w, in which the prefix vowel of the
      // Preterite is long (because of the loss of the initial consonant), the vowel
      // of the prefix in the Precative is likewise long
      Object.keys(precativePrefixes).forEach(ps => {
        prefixes[ps] =
          prefixes[ps].slice(0, -1) + lengthenVowel(prefixes[ps].slice(-1));
      });
    } else if (thisRoot[0] === "w" && verbClass === "active") {
      thisRoot[0] = "";
      prefixes["1cp"] = "i nu";
      verbType = "I-w";
    }
    // II-weak verbs
    if (thisRoot[1] === "Ø") {
      thisRoot[1] = "";
    }

    conjugatedVerb = {
      "3cs":
        prefixes["3cs"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2],
      "1cs":
        prefixes["1cs"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2],
      "3mp":
        prefixes["3mp"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        "ū",
      "3fp":
        prefixes["3fp"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        "ā",
      "1cp":
        prefixes["1cp"] + thisRoot[0] + thisRoot[1] + themeVowel + thisRoot[2]
    };

    // III-weak verbs
    if (verbType === "III-weak") {
      conjugatedVerb = contractLastVowels(conjugatedVerb);
    }

    // I-w active verbs with vowel syncope
    if (verbType === "I-w" && verbClass === "active") {
      Object.keys(conjugatedVerb).forEach(ps => {
        if (
          conjugatedVerb[ps].slice(-1) === "ā" ||
          conjugatedVerb[ps].slice(-1) === "ū"
        ) {
          conjugatedVerb[ps] =
            conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
        }
      });
    }

    state.updateVerb({ ...state, gPrecative: conjugatedVerb });
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

{#if $state.gPrecative === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION-->
  <div
    class="message is-primary is-small is-hidden-tablet conjugation-box"
    transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
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
                        verb: $state.gPrecative[ps],
                        ps,
                        conjugation: 'gPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.gPrecative[ps],
                  root: $state.root,
                  conjugation: 'gPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.gPrecative[ps],
                      ps,
                      conjugation: 'gPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.gPrecative[ps]}
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
                        verb: $state.gPrecative[ps],
                        ps,
                        conjugation: 'gPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.gPrecative[ps],
                  root: $state.root,
                  conjugation: 'gPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.gPrecative[ps],
                      ps,
                      conjugation: 'gPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.gPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- MOBILE VERSION-->
  <div
    class="message is-primary is-hidden-mobile conjugation-box"
    transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
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
                        verb: $state.gPrecative[ps],
                        ps,
                        conjugation: 'gPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.gPrecative[ps],
                  root: $state.root,
                  conjugation: 'gPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.gPrecative[ps],
                      ps,
                      conjugation: 'gPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.gPrecative[ps]}
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
                        verb: $state.gPrecative[ps],
                        ps,
                        conjugation: 'gPrecative',
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.gPrecative[ps],
                  root: $state.root,
                  conjugation: 'gPrecative',
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.gPrecative[ps],
                      ps,
                      conjugation: 'gPrecative',
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.gPrecative[ps]}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
