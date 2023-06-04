<script lang="ts" context="module">
    export type MenuItemChild = {
        focus: () => void;
        closeSubMenu: () => void;
        openSubMenu: () => void;
    };
</script>

<script lang="ts">
    import type { IMenuItem } from "./MenuItem.svelte";
    import { flyBlur } from "./flyBlur";
    import * as svEasing from "svelte/easing";

    export let items: Array<IMenuItem>;
    export let position: "bottom" | "right";
    export let parent: MenuItemChild = undefined;
    export let children: MenuItemChild[] = [];

    let focusIndex: number;

    function handleKey(e: KeyboardEvent) {
        console.group("Menu handleKey");
        console.log("Event: %o", e);
        console.log("Focus index: %d", focusIndex);
        console.log("Children: %o", children);
        switch (e.code) {
            case "ArrowLeft":
                if (position === 'right') {
                    parent?.focus();
                    // parent?.closeSubMenu();
                }
                break;
            case "ArrowRight":
                children[focusIndex]?.openSubMenu();
                break;
            case "ArrowDown":
                if (focusIndex === undefined || focusIndex === children.length - 1) {
                    children[0].focus();
                }
                else {
                    children[focusIndex + 1].focus();
                }
                break;
            case "ArrowUp":
                if (focusIndex === undefined) {
                    children[0].focus();
                } else if (focusIndex === 0 && position === "bottom") {
                    parent?.focus();
                    // parent?.closeSubMenu();
                } else if (focusIndex === 0) {
                    children[children.length - 1].focus();
                } else {
                    children[focusIndex - 1].focus();
                }
                break;
        }
        console.groupEnd();
    }

    function handleChildFocus(childIndex: number) {
        console.log("Menu: Child got focus.  Index: %d", childIndex);
        focusIndex = childIndex;
    }
</script>

<div
    class="menu"
    class:stick-right={position === "right"}
    class:stick-bottom={position === "bottom"}
    class:open
    in:flyBlur={{
        duration: 200,
        x: -100,
        y: 30,
        easing: svEasing.quartOut,
    }}
    out:flyBlur={{ duration: 200, x: 100, y: 30 }}
>
    <ul on:keydown|stopPropagation={handleKey}>
        {#each items as item, index (item.id)}
            <slot {item} {index} onFocus={handleChildFocus} />
        {/each}
    </ul>
</div>

<style>
    div.menu {
        position: absolute;
        padding: 0.5em 0.5em;
        border-radius: 0.7em;
        border: 0.2em solid black;
        background-color: var(--menuBgColor);
        color: var(--menuFgColor);
        box-shadow: 0.7em 0.7em 0.5em rgba(0, 0, 0, 0.2);
    }

    div.menu > ul {
        display: flex;
        flex-flow: column;
        padding: 0;
    }

    div.menu > ul > :global(li) {
        padding: 0.5em 0.5em;
        margin-bottom: 0.3em;
        background-color: var(--menuBgColor);
        color: var(--menuFgColor);
        border-radius: 0.3em;
    }

    div.stick-bottom {
        top: 1.2em;
    }

    div.stick-right {
        top: 0;
        left: 100%;
    }
</style>
