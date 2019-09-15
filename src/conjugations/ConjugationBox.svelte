<script>
  export let verb;
  export let title;
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
      <p>
        <span class="conjugation-person has-text-grey-light">3cs:</span>
        {@html verb['3cs']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">2ms:</span>
        {@html verb['2ms']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">2fs:</span>
        {@html verb['2fs']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">1cs:</span>
        {@html verb['1cs']}
      </p>
    </div>
    <div class="column is-half">
      <p>
        <span class="conjugation-person has-text-grey-light">3mp:</span>
        {@html verb['3mp']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">3fp:</span>
        {@html verb['3fp']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">2cp:</span>
        {@html verb['2cp']}
      </p>
      <p>
        <span class="conjugation-person has-text-grey-light">1cp:</span>
        {@html verb['1cp']}
      </p>
    </div>
  </div>
</div>
