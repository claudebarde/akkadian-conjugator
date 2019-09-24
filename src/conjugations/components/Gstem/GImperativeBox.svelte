<script>
  import { fly } from "svelte/transition";
  import state from "../../../state/state";
  import settings from "../../../settings/settings";
  import { contiguousVowels } from "../../../settings/phonologicalRules";
  import highlightRoot from "../../../settings/highlightRoot";
  import addVentive from "../../../settings/addVentive";

  const persons = ["2ms", "2fs", "2cp"];
  let verbInput = undefined;

  $: if ($state.infinitive !== verbInput) {
    verbInput = $state.infinitive;
    let { themeVowel, I_eVerb, type, root } = $state;
    let thisRoot = [...root];
    let conjugatedVerb = {};
    // For adjectival verbs I–w, such as watårum, no Imperatives are attested.
    if (thisRoot[0] === "w" && type === "stative") {
      conjugatedVerb = {
        "2ms": "-",
        "2fs": "-",
        "2cp": "-"
      };
    } else {
      const originalRoot = [...thisRoot];
      let firstVowel = themeVowel;

      // The only sound verbs in which the vowel inserted between R1 and
      // R2 differs from the theme-vowel are five a-class verbs
      const irregularVerbs = [
        "lamādum",
        "palāḫum",
        "pašāḫum",
        "rakābum",
        "takālum"
      ];
      if (irregularVerbs.includes(verbInput)) firstVowel = "i";

      // Verbs III-weak
      if (thisRoot[2] === "Ø") {
        thisRoot[2] = "";
        // All verbs III–a have i between R1 and R2
        if (themeVowel === "a") firstVowel = "i";
      }
      // Verbs I-n
      else if (thisRoot[0] === "n" && thisRoot[1] !== "Ø") {
        thisRoot[0] = "";
      }
      // Verbs I-a and I-e
      else if (thisRoot[0] === "Ø") {
        thisRoot[0] = "";
        if (I_eVerb === true) {
          firstVowel = "e";
        } else {
          firstVowel = "a";
        }
      }
      // Verbs II-weak
      else if (thisRoot[1] === "Ø") {
        thisRoot[1] = "";
      }
      // Verbs I-w
      else if (thisRoot[0] === "w" || verbInput === "babālum") {
        thisRoot[0] = "";
        firstVowel = "";
      }

      conjugatedVerb = {
        "2ms":
          thisRoot[0] + firstVowel + thisRoot[1] + themeVowel + thisRoot[2],
        "2fs":
          thisRoot[0] +
          firstVowel +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          "ī",
        "2cp":
          thisRoot[0] +
          firstVowel +
          thisRoot[1] +
          themeVowel +
          thisRoot[2] +
          "ā"
      };

      if (
        (!originalRoot.includes("Ø") || originalRoot[0] === "Ø") &&
        originalRoot[0] !== "w" &&
        verbInput !== "babālum"
      ) {
        Object.keys(conjugatedVerb).forEach(ps => {
          if (ps === "2fs" || ps === "2cp") {
            conjugatedVerb[ps] =
              conjugatedVerb[ps].slice(0, -3) + conjugatedVerb[ps].slice(-2);
          }
        });
      } else if (originalRoot[2] === "Ø") {
        Object.keys(conjugatedVerb).forEach(ps => {
          if (ps === "2fs" || ps === "2cp") {
            const lastVowel = contiguousVowels(
              conjugatedVerb[ps].slice(-2, -1),
              conjugatedVerb[ps].slice(-1)
            );
            conjugatedVerb[ps] = conjugatedVerb[ps].slice(0, -2) + lastVowel;
          }
        });
      } else if (originalRoot[1] === "Ø") {
        Object.keys(conjugatedVerb).forEach(ps => {
          conjugatedVerb[ps] =
            conjugatedVerb[ps][0] + themeVowel + conjugatedVerb[ps].slice(3);
        });
      }
    }

    state.updateVerb({ ...state, gImperative: conjugatedVerb });
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

{#if $state.gImperative === undefined}
  <div />
{:else}
  <div
    class="message is-primary conjugation-box"
    transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
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
                    verb: $state.gImperative[ps],
                    ps,
                    conjugation: 'gImperative',
                    root: $state.root,
                    infinitive: $state.infinitive
                  })
                : $state.gImperative[ps],
              root: $state.root,
              conjugation: 'gImperative',
              ps,
              infinitive: $state.infinitive,
              ventive: $state.ventive,
              wVerbType: $state.wVerbType
            })}
          {:else}
            {@html $state.ventive ? addVentive({
                  verb: $state.gImperative[ps],
                  ps,
                  conjugation: 'gImperative',
                  root: $state.root,
                  infinitive: $state.infinitive
                }) : $state.gImperative[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>
{/if}
