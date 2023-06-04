<script lang="ts">
    import config from "../config.js";
</script>

<div>
    <p>Loading {config.app.name}...</p>
</div>

<style>
    div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.25em solid var(--primaryBgColor);
        margin: 1em 0;
        box-shadow: inset 0 -3em 3em var(--primaryBgColor);
    }
    div > p {
        font-size: 36pt;
        font-style: italic;
    }
</style>
