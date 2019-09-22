<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
  import addVentive from "../../settings/addVentive";

  export let verb;

  const persons = ["2ms", "2fs", "2cp"];
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
                  verb: verb[ps],
                  ps,
                  conjugation: 'gImperative',
                  root: $state.root,
                  infinitive: $state.infinitive
                })
              : verb[ps],
            root: $state.root,
            conjugation: 'gImperative',
            ps,
            infinitive: $state.infinitive,
            ventive: $state.ventive,
            wVerbType: $state.wVerbType
          })}
        {:else}
          {@html $state.ventive ? addVentive({
                verb: verb[ps],
                ps,
                conjugation: 'gImperative',
                root: $state.root,
                infinitive: $state.infinitive
              }) : verb[ps]}
        {/if}
      </p>
    {/each}
  </div>
</div>
