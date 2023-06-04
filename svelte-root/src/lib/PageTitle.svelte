<script lang="ts">
    import pageTitle from "$stores/pageTitle";
    import { scale } from "svelte/transition";
    import config from "../config.js";
</script>
<svelte:head>
    <title>{$pageTitle} - {config.app.name}</title>
</svelte:head>
{#key $pageTitle}
    <span transition:scale={{ duration: 200 }}>
        {$pageTitle}
    </span>
{/key}
