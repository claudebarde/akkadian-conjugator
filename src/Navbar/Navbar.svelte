<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import lexicon from "../lexicon/lexicon.js";
  import Sidebar from "../Sidebar/Sidebar.svelte";

  const dispatch = createEventDispatcher();

  let menuOpen = false;

  const showMenu = () => {
    menuOpen = !menuOpen;
  };

  const validateVerb = event => {
    dispatch("selectVerb", { verb: event.verb, details: event.details });
    menuOpen = !menuOpen;
  };
</script>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    padding: 0px 0px 0px 20px;
    z-index: 1000;
  }

  #opaqueBg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    z-index: 999;
    opacity: 0.5;
  }

  #closeMenu {
    float: right;
    margin: 5px;
  }
</style>

{#if menuOpen}
  <div
    class="sidebar is-hidden-tablet has-background-white"
    transition:fly={{ x: -200, duration: 400 }}>
    <a class="delete" id="closeMenu" on:click={() => (menuOpen = false)} />
    <Sidebar
      on:selectVerb={event => {
        const verb = event.detail;
        validateVerb(verb);
      }} />
  </div>
  <div id="opaqueBg" in:fade out:fade={{ duration: 200 }} />
{/if}
<nav
  id="navbar"
  class="navbar is-warning is-fixed-top"
  role="navigation"
  aria-label="main navigation">
  <div class="navbar-brand">
    <a role="button" href="#" class="navbar-item">Akkadian Conjugator</a>
    <a
      href="#"
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      on:click={showMenu}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-end">
      <a
        href="https://github.com/claudebarde/akkadian-conjugator"
        target="_blank"
        rel="noopener noreferrer"
        class="navbar-item">
        <img src="images/github.svg" alt="github" />
      </a>
    </div>
  </div>
</nav>
