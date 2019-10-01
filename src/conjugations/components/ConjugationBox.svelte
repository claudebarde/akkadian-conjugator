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

  const displayInfo = (verb, person) => {
    state.updateInfoModal({ open: true, verb, person });
  };

  const insertVerb = (verb, ps) => {
    return highlightRoot({
      verb: $state.ventive
        ? addVentive({
            verb,
            ps,
            conjugation,
            root: $state.root,
            infinitive: $state.infinitive
          })
        : verb,
      root: $state.root,
      conjugation,
      ps,
      infinitive: $state.infinitive,
      ventive: $state.ventive,
      verbClass: $state.verbClass,
      vetitive
    });
  };

  const insertVentive = (verb, ps) => {
    if ($state.ventive) {
      return addVentive({
        verb,
        ps,
        conjugation,
        root: $state.root,
        infinitive: $state.infinitive
      });
    } else {
      return verb;
    }
  };
</script>

<style>
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
          <p
            style="cursor:pointer;"
            on:click={() => displayInfo(insertVentive(verb[ps], ps), ps)}>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html insertVerb(verb[ps], ps)}
            {:else}
              {@html insertVentive(verb[ps], ps)}
            {/if}
          </p>
        {/each}
      </div>
      <div class="column is-half">
        {#each personsPlur as ps}
          <p
            style="cursor:pointer;"
            on:click={() => displayInfo(insertVentive(verb[ps], ps), ps)}>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html insertVerb(verb[ps], ps)}
            {:else}
              {@html insertVentive(verb[ps], ps)}
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
          <p
            style="cursor:pointer;"
            on:click={() => displayInfo(insertVentive(verb[ps], ps), ps)}>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html insertVerb(verb[ps], ps)}
            {:else}
              {@html insertVentive(verb[ps], ps)}
            {/if}
          </p>
        {/each}
      </div>
      <div class="column is-half">
        {#each personsPlur as ps}
          <p
            style="cursor:pointer;"
            on:click={() => displayInfo(insertVentive(verb[ps], ps), ps)}>
            <span class="conjugation-person has-text-grey-light">{ps}:</span>
            {#if $state.rootHighlight}
              {@html insertVerb(verb[ps], ps)}
            {:else}
              {@html insertVentive(verb[ps], ps)}
            {/if}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>
