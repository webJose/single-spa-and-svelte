<script lang="ts" generics="T extends IMenuItem = IMenuItem">
    import { createEventDispatcher } from "svelte";
    import MenuItem, { type IMenuItem } from "./MenuItem.svelte";
    import createMenuController from "./menuController";

    export let items: T[];
    export let layout: "horizontal" | "vertical";

    const controller = createMenuController();
    const dispatch = createEventDispatcher();

    function onItemClick(item: T) {
        controller.close();
        dispatch("itemClick", item);
    }
</script>

<svelte:window on:click={() => controller.close()} />
<ul
    class:horizontal={layout === "horizontal"}
    class:vertical={layout === "vertical"}
>
    {#each items as item, idx (item.id)}
        <MenuItem
            {item}
            {controller}
            subMenuPos={layout === "horizontal" ? "bottom" : "right"}
            on:itemClick={(e) => onItemClick(e.detail)}
            isRoot={true}
            index={idx}
            --menuBgColor="var(--controlBgColor)"
            --menuFgColor="var(--controlFgColor)"
            --menuHlBgColor="var(--controlHiliBgColor)"
            --menuHlFgColor="var(--controlHiliFgColor)"
            --menuAnchorColor="var(--controlActiveFgColor)"
        />
    {/each}
</ul>

<style>
    ul {
        display: flex;
        align-items: flex-start;
        padding: 0;
        margin: 0;
    }
    ul.horizontal {
        flex-flow: row;
    }
    ul.vertical {
        flex-flow: column;
    }

    ul :global(li.root-item) {
        border-radius: 0.3em;
    }

    ul :global(li.root-item:hover),
    ul :global(li.root-item.active) {
        background-color: var(--controlAltHiliBgColor);
        color: var(--controlAltHiliFgColor);
    }
</style>
