<script>
  import { fly } from "svelte/transition";
  import state from "../../state/state";
  import settings from "../../settings/settings";
  import highlightRoot from "../../settings/highlightRoot";
</script>

<div
  class="message is-primary"
  transition:fly={{ y: settings.transitionY, duration: settings.transtionDuration }}>
  <div class="message-header">
    <p>Non-finite forms</p>
  </div>
  <div class="message-body">
    <p>
      <strong>Verbal Adjective:</strong>
    </p>
    <p class="verbal-adjective">
      {#if $state.rootHighlight}
        <span>
          {@html highlightRoot({
            verb: $state.gVerbalAdjective[0],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'masculin',
            infinitive: $state.infinitive
          })}
        </span>
      {:else}
        <span>
          {@html $state.gVerbalAdjective[0]}
        </span>
      {/if}
      /
      {#if $state.rootHighlight}
        <span>
          {@html highlightRoot({
            verb: $state.gVerbalAdjective[1],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'feminin',
            infinitive: $state.infinitive
          })}
        </span>
      {:else}
        <span>
          {@html $state.gVerbalAdjective[1]}
        </span>
      {/if}
      (
      {#if $state.rootHighlight}
        <span>
          {@html highlightRoot({
            verb: $state.gVerbalAdjective[2],
            root: $state.root,
            conjugation: 'verbalAdjective',
            ps: 'feminin',
            infinitive: $state.infinitive
          })}
        </span>
      {:else}
        <span>
          {@html $state.gVerbalAdjective[2]}
        </span>
      {/if}
      )
    </p>
  </div>
</div>
