<script lang="ts">
    import { navigateToUrl } from "single-spa";

    export let href: string;

    let anchorEl: HTMLAnchorElement;
    export function focus() {
        anchorEl?.focus();
    }
</script>

<a
    {href}
    bind:this={anchorEl}
    on:click={(e) => {
        e.preventDefault();
        navigateToUrl(href);
    }}
>
    <slot />
</a>
