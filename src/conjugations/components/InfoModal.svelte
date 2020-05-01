<script>
  import { fade } from "svelte/transition";
  import state from "../../state/state";
  import {
    allFlavorsOfVowels,
    contiguousVowels,
    lengthenVowel
  } from "../../settings/phonologicalRules";

  const personsSing = ["1cs", "2ms", "2fs", "3ms", "3fs"];
  const personsPlur = ["1cp", "2mp", "2fp", "3mp", "3fp"];

  let verb = {
    accusative: {
      "1cs": ["anni", "nni", "ninni"],
      "2ms": "ka",
      "2fs": "ki",
      "3ms": "šu",
      "3fs": "ši",
      "1cp": "niāti",
      "2mp": "kunūti",
      "2fp": "kināti",
      "3mp": "šunūti",
      "3fp": "šināti"
    },
    dative: {
      "1cs": ["am", "m", "nim"],
      "2ms": "kum",
      "2fs": "kim",
      "3ms": "šum",
      "3fs": "šim",
      "1cp": "niāšim",
      "2mp": "kunūšim",
      "2fp": "kināšim",
      "3mp": "šunūšim",
      "3fp": "šināšim"
    }
  };

  const mergeSuffix = (verb, suffix, ps) => {
    if (ps === "1cs") {
      // -am on the 3cs, 2ms, 1cs, and 1cp
      if (["3cs", "2ms", "1cs", "1cp"].includes($state.infoModal.person)) {
        suffix = suffix[0];
        if (allFlavorsOfVowels.includes(verb[verb.length - 1])) {
          // if vowel at the end of the verb
          const vowel = contiguousVowels(verb[verb.length - 1], "a");
          verb = verb.slice(0, -1);
          suffix = vowel + suffix.slice(1);
        }
      }
      // -m on the 2fs
      else if ($state.infoModal.person === "2fs") {
        suffix = suffix[1];
      }
      // -nim on the 3mp, 3fp, and 2cp
      else if (["3mp", "3fp", "2cp"].includes($state.infoModal.person)) {
        suffix = suffix[2];
      }

      return verb + "<strong>" + suffix + "</strong>";
    } else {
      // When any of the suffixes, except the 1cs forms, is added directly to
      // a form of a III–weak verb ending in a short vowel, that vowel is lengthened
      if ($state.root[2] === "Ø") {
        if (allFlavorsOfVowels.includes(verb[verb.length - 1])) {
          verb = verb.slice(0, -1) + lengthenVowel(verb.slice(-1));
        }
      }
      // The third person forms of both sets of suffixes are subject to the
      // same changes as their genitive counterparts: final d, t, ṭ, s, ṣ, z, š, plus the
      // š of the suffix change to -ss-,
      if (
        ["d", "t", "ṭ", "s", "ṣ", "z", "š"].includes(verb.slice(-1)) &&
        suffix[0] === "š"
      ) {
        verb = verb.slice(0, -1) + "s";
        suffix = "s" + suffix.slice(1);
      }

      return verb + "<strong>" + suffix + "</strong>";
    }
  };
</script>

<style>
  .modal-content {
    display: flex;
    justify-content: center;
  }

  .modal-content table td {
    padding: 10px;
  }

  .modal-title {
    text-align: center;
  }
</style>

{#if $state.infoModal.open}
  <!-- MOBILE VERSION -->
  <div
    class="modal is-size-7-tablet is-hidden-tablet is-active"
    ransition:fade={{ duration: 100 }}>
    <div class="modal-background" />
    <div class="modal-content" style="overflow:hidden">
      <article class="message is-info is-small">
        <div class="message-header">
          <p>Object Pronominal Suffixes - {$state.infoModal.verb}</p>
          <button
            class="delete"
            aria-label="delete"
            on:click={state.toggleInfoModal} />
        </div>
        <div class="message-body" style="height:90%;overflow:auto;text">
          <h4 class="title is-4 modal-title">{$state.infoModal.verb}</h4>
          <table class="table">
            <thead>
              <tr>
                <th />
                <th>Accusative</th>
                <th>Dative</th>
              </tr>
            </thead>
            <tbody>
              {#each personsSing as ps}
                <tr>
                  <td>{ps}</td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.accusative[ps], ps)}
                  </td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.dative[ps], ps)}
                  </td>
                </tr>
              {/each}
              {#each personsPlur as ps}
                <tr>
                  <td>{ps}</td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.accusative[ps], ps)}
                  </td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.dative[ps], ps)}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
  <!-- COMPUTER VERSION -->
  <div
    class="modal is-hidden-mobile is-active"
    transition:fade={{ duration: 100 }}>
    <div class="modal-background" />
    <div class="modal-content">
      <article class="message is-info">
        <div class="message-header">
          <p>Object Pronominal Suffixes</p>
          <button
            class="delete"
            aria-label="delete"
            on:click={state.toggleInfoModal} />
        </div>
        <div class="message-body">
          <h4 class="title is-4 modal-title">{$state.infoModal.verb}</h4>
          <table class="table">
            <thead>
              <tr>
                <th />
                <th>Accusative</th>
                <th>Dative</th>
              </tr>
            </thead>
            <tbody>
              {#each personsSing as ps}
                <tr>
                  <td>{ps}</td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.accusative[ps], ps)}
                  </td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.dative[ps], ps)}
                  </td>
                </tr>
              {/each}
              {#each personsPlur as ps}
                <tr>
                  <td>{ps}</td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.accusative[ps], ps)}
                  </td>
                  <td>
                    {@html mergeSuffix($state.infoModal.verb, verb.dative[ps], ps)}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
{/if}
