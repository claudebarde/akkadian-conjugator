<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
  import { vowelSyncope } from "../../settings/phonologicalRules";

  const suffixesSing = {
    "1cs": "āku",
    "2ms": "āta",
    "2fs": "āti",
    "3ms": "",
    "3fs": "at"
  };

  const suffixesPlur = {
    "1cp": "ānu",
    "2mp": "ātunu",
    "2fp": "ātina",
    "3mp": "ū",
    "3fp": "ā"
  };

  let radical = "";

  $: if ($state.gVerbalAdjective[2][0] === "*") {
    radical = $state.gVerbalAdjective[2].slice(1);
  } else {
    radical = $state.gVerbalAdjective[2];
  }
</script>

<style>
  .verbDisplay {
    background-color: transparent;
  }
</style>

<div
  class="message is-primary is-hidden-mobile conjugation-box"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <div class="message-header">
    <p>Predicative Construction</p>
  </div>
  <div class="message-body">
    <div class="columns">
      <div class="column is-half">
        <table class="table verbDisplay">
          <thead>
            <th>Person</th>
            <th>Verb</th>
          </thead>
          <tbody>
            {#each Object.keys(suffixesSing) as ps}
              <tr>
                <td>{ps}:</td>
                {#if $state.rootHighlight}
                  <td>
                    {@html highlightRoot({
                      verb: vowelSyncope(radical + suffixesSing[ps]),
                      root: $state.root,
                      conjugation: 'gPredicative',
                      ps,
                      infinitive: $state.infinitive
                    })}
                  </td>
                {:else}
                  <td>{vowelSyncope(radical + suffixesSing[ps])}</td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="column is-half">
        <table class="table verbDisplay">
          <thead>
            <th>Person</th>
            <th>Verb</th>
          </thead>
          <tbody>
            {#each Object.keys(suffixesPlur) as ps}
              <tr>
                <td>{ps}:</td>
                {#if $state.rootHighlight}
                  <td>
                    {@html highlightRoot({
                      verb: vowelSyncope(radical + suffixesPlur[ps]),
                      root: $state.root,
                      conjugation: 'gPredicative',
                      ps,
                      infinitive: $state.infinitive
                    })}
                  </td>
                {:else}
                  <td>{vowelSyncope(radical + suffixesPlur[ps])}</td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
