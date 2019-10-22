<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gImperative from "./Gstem/gImperative";
  import dImperative from "./Dstem/dImperative";
  import shImperative from "./SHstem/shImperative";
  import highlightRoot from "../../settings/highlightRoot";
  import addVentive from "../../settings/addVentive";

  let verbInput = undefined;
  let conjugation = undefined;
  let previousView = undefined;
  const persons = ["2ms", "2fs", "2cp"];
  let title = "";

  $: if (
    $state.infinitive !== verbInput ||
    $state.activeView !== previousView
  ) {
    previousView = $state.activeView;
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gImperative";
      title = "G Imperative";
      conjugatedVerb = gImperative({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dImperative";
      title = "D Imperative";
      conjugatedVerb = dImperative({
        root: $state.root
      });
    } else if ($state.activeView === "shstem") {
      conjugation = "shImperative";
      title = "Š Imperative";
      conjugatedVerb = shImperative({
        root: $state.root
      });
    }

    state.updateVerb({ ...state, imperative: conjugatedVerb });
  }
</script>

{#if $state.imperative === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION -->
  <div class="message is-primary is-small is-hidden-tablet conjugation-box">
    <div class="message-header">
      <p>{title}</p>
    </div>
    <div class="message-body">
      {#each persons as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if $state.rootHighlight}
            {@html highlightRoot({
              verb: $state.ventive
                ? addVentive({
                    verb: $state.imperative[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  })
                : $state.imperative[ps],
              root: $state.root,
              conjugation,
              ps,
              infinitive: $state.infinitive,
              ventive: $state.ventive,
              wVerbType: $state.verbClass
            })}
          {:else}
            {@html $state.ventive ? addVentive({
                  verb: $state.imperative[ps],
                  ps,
                  conjugation,
                  root: $state.root,
                  infinitive: $state.infinitive
                }) : $state.imperative[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>

  <!-- COMPUTER VERSION -->
  <div class="message is-primary is-hidden-mobile conjugation-box">
    <div class="message-header">
      <p>{title}</p>
    </div>
    <div class="message-body">
      {#each persons as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if $state.rootHighlight}
            {@html highlightRoot({
              verb: $state.ventive
                ? addVentive({
                    verb: $state.imperative[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  })
                : $state.imperative[ps],
              root: $state.root,
              conjugation,
              ps,
              infinitive: $state.infinitive,
              ventive: $state.ventive,
              wVerbType: $state.verbClass
            })}
          {:else}
            {@html $state.ventive ? addVentive({
                  verb: $state.imperative[ps],
                  ps,
                  conjugation,
                  root: $state.root,
                  infinitive: $state.infinitive
                }) : $state.imperative[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>
{/if}
