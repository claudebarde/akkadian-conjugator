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
    // I-w verbs
    if (thisRoot[0] === "w") {
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
  } else if ($state.activeView === "shstem") {
    let thisRoot = [...$state.root];
    let firstVowel = "u";
    let secondVowel = "u";
    let suffix = "um";

    if (thisRoot[2] === "Ø") {
      thisRoot[2] = "";
      suffix = "ûm";
      secondVowel = "";
    }

    // Verbs I–n
    if (thisRoot[0] === "n" && $state.root[1] !== "Ø")
      thisRoot[0] = thisRoot[1];

    // Verbs I-weak && I-w
    if (thisRoot[0] === "Ø" || thisRoot[0] === "w") {
      thisRoot[0] = "";
      firstVowel = "ū";
    }
    // Irregular verb babālum
    if ($state.infinitive === "babālum") thisRoot[0] = "";

    verbTitle =
      "š" +
      firstVowel +
      thisRoot[0] +
      thisRoot[1] +
      secondVowel +
      thisRoot[2] +
      suffix;

    if ($state.shMeaning) {
      verbMeaning = $state.shMeaning;
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
