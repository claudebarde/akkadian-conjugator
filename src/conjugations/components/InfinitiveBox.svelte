<script>
  import { fade } from "svelte/transition";
  import state from "../../state/state";

  let verbTitle = "";
  let verbMeaning = "";

  $: if ($state.activeView === "dstem") {
    let thisRoot = [...$state.root];
    let secondVowel = "u";
    let suffix = "um";

    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
      suffix = "ûm";
      secondVowel = "";
    }

    if (thisRoot[0] === "Ø") {
      // At the beginning of a form, ' is lost with no further changes
      thisRoot[0] = "";
    }

    verbTitle =
      thisRoot[0] +
      "u" +
      thisRoot[1] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      suffix;

    if ($state.dMeaning) {
      verbMeaning = $state.dMeaning;
    } else {
      verbMeaning = `to cause ${$state.meaning}`;
    }
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
