<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import contractLastVowels from "../../settings/contractLastVowels";
  import { contiguousVowels } from "../../settings/phonologicalRules";
  import highlightRoot from "../../settings/highlightRoot";
  import addVentive from "../../settings/addVentive";

  const personSing = ["3cs", "1cs"];
  const personPlur = ["3mp", "3fp", "1cp"];
  const precativePrefixes = {
    "3cs": "li",
    "1cs": "lu",
    "3mp": "li",
    "3fp": "li",
    "1cp": "i "
  };

  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};
    let verbType = undefined;
    let { themeVowel, root } = $state;
    let thisRoot = [...root];

    // III-weak
    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
      verbType = "III-weak";
    }

    conjugatedVerb = {
      "3cs":
        precativePrefixes["3cs"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "1cs":
        precativePrefixes["1cs"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2],
      "3mp":
        precativePrefixes["3mp"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        "ū",
      "3fp":
        precativePrefixes["3fp"] +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2] +
        "ā",
      "1cp":
        precativePrefixes["1cp"] +
        "ni" +
        thisRoot[0] +
        thisRoot[1] +
        themeVowel +
        thisRoot[2]
    };

    // III-weak verbs
    if ((verbType = "III-weak")) {
      Object.keys(conjugatedVerb).forEach(ps => {
        conjugatedVerb[ps] = contractLastVowels(conjugatedVerb[ps]);
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
  <div
    class="message is-primary conjugation-box"
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
              {#if $state.thisRootHighlight}
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
                  wVerbType: $state.wVerbType
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
              {#if $state.thisRootHighlight}
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
                  wVerbType: $state.wVerbType
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
