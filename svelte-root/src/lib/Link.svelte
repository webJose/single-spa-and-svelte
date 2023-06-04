<script lang="ts">
    import { navigateToUrl } from "single-spa";

    export let href: string;
</script>

<a
    {href}
    on:click={(e) => {
        e.preventDefault();
        navigateToUrl(href);
    }}
>
    <slot />
</a>
