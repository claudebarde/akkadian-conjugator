<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";

  import highlightRoot from "../../settings/highlightRoot.js";
  import settings from "../../settings/settings.js";
  import addVentive from "../../settings/addVentive";

  export let verb;
  export let title;
  export let conjugation;

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

<div
  class="message is-primary conjugation-box"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <div class="message-header">
    <p>{title}</p>
  </div>
  <div class="message-body">
    <div class="columns">
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
                wVerbType: $state.type
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
                wVerbType: $state.type
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

<!--<div
  class="box conjugation-box"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <h2 class="has-text-weight-bold">{title}</h2>
  <br />
  <div class="columns">
    <div class="column is-half">
      {#each personsSing as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if rootHighlight}
            {@html highlightRoot({
              verb: verb[ps],
              root,
              conjugation,
              ps,
              infinitive
            })}
          {:else}
            {@html verb[ps]}
          {/if}
        </p>
      {/each}
    </div>
    <div class="column is-half">
      {#each personsPlur as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if rootHighlight}
            {@html highlightRoot({
              verb: verb[ps],
              root,
              conjugation,
              ps,
              infinitive
            })}
          {:else}
            {@html verb[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>
</div>-->
