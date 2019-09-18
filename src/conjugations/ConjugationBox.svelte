<script>
  import highlightRoot from "../settings/highlightRoot.js";
  export let verb;
  export let title;
  export let root;
  export let conjugation;
  export let rootHighlight;

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

<div class="box conjugation-box">
  <h2 class="has-text-weight-bold">{title}</h2>
  <br />
  <div class="columns">
    <div class="column is-half">
      {#each personsSing as ps}
        <p>
          <span class="conjugation-person has-text-grey-light">{ps}:</span>
          {#if rootHighlight}
            {@html highlightRoot(verb[ps], root, conjugation, ps)}
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
            {@html highlightRoot(verb[ps], root, conjugation, ps)}
          {:else}
            {@html verb[ps]}
          {/if}
        </p>
      {/each}
    </div>
  </div>
</div>
