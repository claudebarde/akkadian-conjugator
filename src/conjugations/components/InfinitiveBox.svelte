<script>
  import { fade } from "svelte/transition";
  import state from "../../state/state";

  let verbTitle = "";
  let verbMeaning = "";

  $: if ($state.activeView === "dstem") {
    let thisRoot = [...$state.root];

    if (thisRoot[2] === "Ø") {
      verbTitle = thisRoot[0] + "u" + thisRoot[1] + thisRoot[1] + "ûm";
    } else {
      verbTitle =
        thisRoot[0] +
        "u" +
        thisRoot[1] +
        thisRoot[1] +
        "u" +
        thisRoot[2] +
        "um";
    }

    verbMeaning = `to cause ${$state.meaning}`;
  } else {
    verbTitle = $state.infinitive;
    verbMeaning = $state.meaning;
  }
</script>

<style>
  #verbTitle {
    text-align: center;
    margin-top: 50px;
  }
</style>

<article
  class="message is-primary conjugation-box"
  id="verbTitle"
  transition:fade>
  <div class="message-body">
    <p>
      <strong>{verbTitle.toUpperCase()}</strong>
    </p>
    <p>{verbMeaning}</p>
  </div>
</article>
