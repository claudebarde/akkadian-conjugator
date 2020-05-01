<script>
  import settings from "../../settings/settings";
  import state from "../../state/state";
  import VerbalAdjectiveBox from "./VerbalAdjectiveBox.svelte";
  import ParticipleBox from "./ParticipleBox.svelte";
</script>

{#if $state.infinitive === undefined}
  <div />
{:else}
  <!-- MOBILE VERSION-->
  <div class="message is-primary is-small is-hidden-tablet conjugation-box">
    <div class="message-header">
      <p>Non-finite forms</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column is-one-third">
          <VerbalAdjectiveBox />
        </div>
        <div class="column is-one-third">
          <ParticipleBox />
        </div>
      </div>
    </div>
  </div>

  <!-- COMPUTER VERSION-->
  <div class="message is-primary is-hidden-mobile conjugation-box">
    <div class="message-header">
      <p>Non-finite forms</p>
    </div>
    <div class="message-body">
      <div class="columns">
        <div class="column is-half">
          <VerbalAdjectiveBox />
        </div>
        <div class="column is-half">
          <ParticipleBox />
        </div>
      </div>
    </div>
  </div>
{/if}
