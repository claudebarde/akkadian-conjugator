<script>
  import ConjugationBox from "./ConjugationBox.svelte";
  import state from "../../state/state";
  import gPrecative from "./Gstem/gPrecative";
  import dPrecative from "./Dstem/dPrecative";
  import shPrecative from "./SHstem/shPrecative";
  import highlightRoot from "../../settings/highlightRoot";
  import addVentive from "../../settings/addVentive";

  let verbInput = undefined;
  let conjugation = undefined;
  let previousView = undefined;
  const personSing = ["3cs", "1cs"];
  const personPlur = ["3mp", "3fp", "1cp"];
  const prefixes = {
    "3cs": "li",
    "1cs": "lu",
    "3mp": "li",
    "3fp": "li",
    "1cp": "i ni"
  };
  let title = "";

  $: if (
    $state.infinitive !== verbInput ||
    $state.activeView !== previousView
  ) {
    previousView = $state.activeView;
    verbInput = $state.infinitive;
    let conjugatedVerb = {};

    if ($state.activeView === "gstem") {
      conjugation = "gPrecative";
      title = "G Precative";
      conjugatedVerb = gPrecative({
        verbInput,
        root: $state.root,
        themeVowel: $state.themeVowel,
        I_eVerb: $state.I_eVerb,
        verbClass: $state.verbClass
      });
    } else if ($state.activeView === "dstem") {
      conjugation = "dPrecative";
      title = "D Precative";
      conjugatedVerb = dPrecative({
        root: $state.root,
        I_eVerb: $state.I_eVerb
      });
    } else if ($state.activeView === "shstem") {
      conjugation = "shPrecative";
      title = "Š Precative";
      conjugatedVerb = shPrecative({
        root: $state.root,
        I_eVerb: $state.I_eVerb
      });
    }

    state.updateVerb({ ...state, precative: conjugatedVerb });
  }
</script>

{#if $state.precative === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION-->
  <div class="message is-primary is-small is-hidden-tablet conjugation-box">
    <div class="message-header">
      <p>{title}</p>
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
                        verb: $state.precative[ps],
                        ps,
                        conjugation,
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.precative[ps],
                  root: $state.root,
                  conjugation,
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.precative[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.precative[ps]}
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
                        verb: $state.precative[ps],
                        ps,
                        conjugation,
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.precative[ps],
                  root: $state.root,
                  conjugation,
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.precative[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.precative[ps]}
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
      <p>{title}</p>
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
                        verb: $state.precative[ps],
                        ps,
                        conjugation,
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.precative[ps],
                  root: $state.root,
                  conjugation,
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.precative[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.precative[ps]}
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
                        verb: $state.precative[ps],
                        ps,
                        conjugation,
                        root: $state.root,
                        infinitive: $state.infinitive
                      })
                    : $state.precative[ps],
                  root: $state.root,
                  conjugation,
                  ps,
                  infinitive: $state.infinitive,
                  ventive: $state.ventive,
                  wVerbType: $state.verbClass
                })}
              {:else}
                {@html $state.ventive ? addVentive({
                      verb: $state.precative[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    }) : $state.precative[ps]}
              {/if}
            </p>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
