<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";

  import highlightRoot from "../../settings/highlightRoot.js";
  import settings from "../../settings/settings.js";
  import addVentive from "../../settings/addVentive";

  export let verb;
  export let title;
  export let conjugation;
  export let vetitive = false;

  const personsSing = ["3cs", "2ms", "2fs", "1cs"];
  const personsPlur = ["3mp", "3fp", "2cp", "1cp"];
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

<!-- MOBILE VERSION -->
<div
  class="message is-primary is-small is-hidden-tablet conjugation-box"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <div class="message-header">
    <p>{title}</p>
  </div>
  <div class="message-body">
    <div class="columns is-mobile">
      <div class="column is-half">
        {#each personsSing as ps}
          <p>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html highlightRoot({
                verb: $state.ventive
                  ? addVentive({
                      verb: verb[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    })
                  : verb[ps],
                root: $state.root,
                conjugation,
                ps,
                infinitive: $state.infinitive,
                ventive: $state.ventive,
                wVerbType: $state.type,
                vetitive
              })}
            {:else}
              {@html $state.ventive ? addVentive({
                    verb: verb[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  }) : verb[ps]}
            {/if}
          </p>
        {/each}
      </div>
      <div class="column is-half">
        {#each personsPlur as ps}
          <p>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html highlightRoot({
                verb: $state.ventive
                  ? addVentive({
                      verb: verb[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    })
                  : verb[ps],
                root: $state.root,
                conjugation,
                ps,
                infinitive: $state.infinitive,
                ventive: $state.ventive,
                wVerbType: $state.type,
                vetitive
              })}
            {:else}
              {@html $state.ventive ? addVentive({
                    verb: verb[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  }) : verb[ps]}
            {/if}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>

<!-- COMPUTER VERSION -->
<div
  class="message is-primary is-hidden-mobile conjugation-box"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <div class="message-header">
    <p>{title}</p>
  </div>
  <div class="message-body">
    <div class="columns is-mobile">
      <div class="column is-half">
        {#each personsSing as ps}
          <p>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html highlightRoot({
                verb: $state.ventive
                  ? addVentive({
                      verb: verb[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    })
                  : verb[ps],
                root: $state.root,
                conjugation,
                ps,
                infinitive: $state.infinitive,
                ventive: $state.ventive,
                wVerbType: $state.type,
                vetitive
              })}
            {:else}
              {@html $state.ventive ? addVentive({
                    verb: verb[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  }) : verb[ps]}
            {/if}
          </p>
        {/each}
      </div>
      <div class="column is-half">
        {#each personsPlur as ps}
          <p>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html highlightRoot({
                verb: $state.ventive
                  ? addVentive({
                      verb: verb[ps],
                      ps,
                      conjugation,
                      root: $state.root,
                      infinitive: $state.infinitive
                    })
                  : verb[ps],
                root: $state.root,
                conjugation,
                ps,
                infinitive: $state.infinitive,
                ventive: $state.ventive,
                wVerbType: $state.type,
                vetitive
              })}
            {:else}
              {@html $state.ventive ? addVentive({
                    verb: verb[ps],
                    ps,
                    conjugation,
                    root: $state.root,
                    infinitive: $state.infinitive
                  }) : verb[ps]}
            {/if}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>
