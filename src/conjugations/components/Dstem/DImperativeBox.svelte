<script>
  import state from "../../../state/state";
  import highlightRoot from "../../../settings/highlightRoot";
  import addVentive from "../../../settings/addVentive";
  import contractLastVowels from "../../../settings/contractLastVowels";

  const persons = ["2ms", "2fs", "2cp"];
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let conjugatedVerb = {};
    let { root } = $state;
    let thisRoot = [...root];
    let firstVowel = "u";
    // The vowels i and ī were apparently pronounced as e and ē,
    // respectively, when they occurred before the consonants r and ḫ.
    let secondVowel = thisRoot[2] === "r" || thisRoot[2] === "ḫ" ? "e" : "i";

    // III-weak verbs
    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
    }
    // I-weak verbs
    if (thisRoot[0] === "Ø") {
      thisRoot[0] = "";
    }

    conjugatedVerb = {
      "2ms":
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2],
      "2fs":
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        "ī",
      "2cp":
        thisRoot[0] +
        firstVowel +
        thisRoot[1] +
        thisRoot[1] +
        secondVowel +
        thisRoot[2] +
        "ā"
    };

    // III-weak
    if (root[2] === "Ø") {
      contractLastVowels(conjugatedVerb);
    }

    state.updateVerb({ ...state, dImperative: conjugatedVerb });
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

{#if $state.dImperative === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION -->
  <div class="message is-primary is-small is-hidden-tablet conjugation-box">
    <div class="message-header">
      <p>Imperative</p>
    </div>
    <div class="message-body">
      {#each persons as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if $state.rootHighlight}
            {@html highlightRoot({
              verb: $state.ventive
                ? addVentive({
                    verb: $state.dImperative[ps],
                    ps,
                    conjugation: 'dImperative',
                    root: $state.root,
                    infinitive: $state.infinitive
                  })
                : $state.dImperative[ps],
              root: $state.root,
              conjugation: 'dImperative',
              ps,
              infinitive: $state.infinitive,
              ventive: $state.ventive,
              wVerbType: $state.verbClass
            })}
          {:else}
            {@html $state.ventive ? addVentive({
                  verb: $state.dImperative[ps],
                  ps,
                  conjugation: 'dImperative',
                  root: $state.root,
                  infinitive: $state.infinitive
                }) : $state.dImperative[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>

  <!-- COMPUTER VERSION -->
  <div class="message is-primary is-hidden-mobile conjugation-box">
    <div class="message-header">
      <p>Imperative</p>
    </div>
    <div class="message-body">
      {#each persons as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if $state.rootHighlight}
            {@html highlightRoot({
              verb: $state.ventive
                ? addVentive({
                    verb: $state.dImperative[ps],
                    ps,
                    conjugation: 'dImperative',
                    root: $state.root,
                    infinitive: $state.infinitive
                  })
                : $state.dImperative[ps],
              root: $state.root,
              conjugation: 'dImperative',
              ps,
              infinitive: $state.infinitive,
              ventive: $state.ventive,
              wVerbType: $state.verbClass
            })}
          {:else}
            {@html $state.ventive ? addVentive({
                  verb: $state.dImperative[ps],
                  ps,
                  conjugation: 'dImperative',
                  root: $state.root,
                  infinitive: $state.infinitive
                }) : $state.dImperative[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>
{/if}
