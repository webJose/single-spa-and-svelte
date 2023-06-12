<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<section>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>
  <div class="card">
    <Counter />
  </div>
</section>

<style>
  section {
    border: 0.1em solid rgb(185, 65, 13);
    border-radius: 0.4em;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 1em;
  }
  img.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  img.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  img.logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
