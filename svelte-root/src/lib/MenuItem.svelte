<script lang="ts" context="module">
    export interface MenuItemProps {
        id: string | number;
        text?: string;
        tooltip?: string;
        href?: string;
    }

    export type IMenuItem<T = MenuItemProps> = T & {
        items?: IMenuItem<T>[]
    }
</script>

<script lang="ts" generics="T extends IMenuItem = IMenuItem">
    import { createEventDispatcher, tick } from "svelte";
    import { quintOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import Menu from "./Menu.svelte";
    import type { MenuController } from "./menuController";

    export let item: T;
    export let index: number;
    export let controller: MenuController;
    export let menuText = (item: T) => item.text ?? "";
    export let level = 1;
    export let subMenuPos: "bottom" | "right" = "right";
    export let isRoot = false;
    export let focusTarget: HTMLElement | undefined = undefined;

    interface $$Events {
        itemClick: CustomEvent<T>;
        itemFocus: CustomEvent<{ item: T; index: number; }>
    }

    const tabIndex = isRoot ? 0 : -1;
    let dispatch = createEventDispatcher();
    let open = false;
    let originalShape = true;
    let xformDown: SVGAnimateTransformElement;
    let xformClosed: SVGAnimateTransformElement;
    let firstRun = true;
    let menuKey = {};
    const clickAnimationDuration = 200;
    let clickedScale = tweened(1, {
        easing: quintOut,
        duration: clickAnimationDuration / (isRoot ? 2 : 1),
    });
    let clickedOpacity = tweened(1, {
        easing: quintOut,
        duration: clickAnimationDuration,
    });
    const horzArrowhead = "M50,50 l100,50 l-100,50 Z";
    const vertArrowhead = "M50,50 l100,0 l-50,100 Z";
    let children: any[] = [];
    let active = false;
    $: arrowhead = subMenuPos === "bottom" ? vertArrowhead : horzArrowhead;
    $: openSubMenuKey = subMenuPos === 'bottom' ? 'ArrowDown' : 'ArrowRight';
    $: closeSubMenuKey = subMenuPos === 'bottom' ? 'ArrowUp' : 'ArrowLeft';
    $: {
        if (open && originalShape) {
            console.log("Menu item is open.");
            xformDown?.beginElement();
            originalShape = !originalShape;
        } else if (!open && !originalShape) {
            console.log("Menu item is closed.");
            xformClosed?.beginElement();
            originalShape = !originalShape;
        }
    }

    $: {
        if (open) {
            controller.addOpenMenu(closeSubMenu, menuKey, level);
        } else if (firstRun) {
            firstRun = false;
        } else if (item.items?.length) {
            controller.clear(menuKey, level);
        }
    }

    export function focus() {
        focusTarget?.focus();
    }

    export async function openSubMenu() {
        open = true;
        await tick();
        children[0]?.focus();
    }

    export function closeSubMenu() {
        open = false;
    }

    async function itemClick() {
        if (item.items?.length) {
            open = !open;
        } else {
            if (isRoot) {
                await clickedScale.set(1.4);
                await clickedScale.set(1.1);
            } else {
                await Promise.all([
                    clickedScale.set(1.4),
                    clickedOpacity.set(0),
                ]);
            }
            if (!item.href) {
                dispatch("itemClick", item);
            }
        }
        focusTarget?.focus();
    }

    function handleClose(e: any) {
        console.log("Menu Item received close event: %o", e.detail);
        open = false;
    }

    async function handleKey(e: KeyboardEvent) {
        if (e.key === " " || e.code == "Enter") {
            if (item.items?.length) {
                open = !open;
                if (open) {
                    await tick();
                    children[0]?.focus();
                }
            } else {
                itemClick();
            }
            e.stopPropagation();
        }
        else if (e.code === openSubMenuKey) {
            await openSubMenu();
        }
        else if (e.code === closeSubMenuKey) {
            console.log('Close sub menu using key...');
            closeSubMenu();
        }
    }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
    style:transform="scale({$clickedScale})"
    style:opacity={$clickedOpacity}
    style:z-index={$clickedScale === 1 ? 1 : 10}
    class:root-item={isRoot}
    class:active
    on:click|stopPropagation={itemClick}
    on:keydown={handleKey}
>
    <slot {item}>
        <span
            tabindex={tabIndex}
            on:focus={() => {
                active = true;
                dispatch('itemFocus', {
                    item,
                    index
                });
            }}
            on:blur={() => active = false}
            bind:this={focusTarget}>{menuText(item)}
        </span>
    </slot>
    {#if item.items?.length}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            style="width: 1em; height: 1em;"
        >
            <g>
                <path d={arrowhead} fill="currentColor" />
                <animateTransform
                    id="xformClosed"
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="180 100 100"
                    to="0 100 100"
                    dur="0.15s"
                    begin="indefinite"
                    fill="freeze"
                    bind:this={xformClosed}
                />
                <animateTransform
                    id="xformOpen"
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 100 100"
                    to="180 100 100"
                    dur="0.15s"
                    begin="indefinite"
                    fill="freeze"
                    bind:this={xformDown}
                />
            </g>
        </svg>
        <!-- <span class="sub-items" /> -->
        {#if open}
            <Menu
                items={item.items}
                position={level === 1 ? subMenuPos : "right"}
                let:item={subItem}
                let:index={idx}
                let:onFocus
                on:close={handleClose}
                parent={{ focus, closeSubMenu, openSubMenu }}
                childMenus={children}
            >
                <svelte:self
                    bind:this={children[idx]}
                    item={subItem}
                    {controller}
                    {menuText}
                    level={level + 1}
                    index={idx}
                    on:itemClick
                    on:itemFocus={(e) => {
                        onFocus(e.detail.index);
                    }}
                />
            </Menu>
        {/if}
    {/if}
</li>

<style>
    li {
        list-style: none;
        cursor: pointer;
        display: inline-flex;
        justify-content: space-between;
        gap: 0.5em;
        align-items: center;
        position: relative;
        white-space: nowrap;
        padding: 0 0.5em;
    }

    li:not(.root-item):hover,
    li.active:not(.root-item) {
        background-color: var(--menuHlBgColor) !important;
        color: var(--menuHlFgColor) !important;
    }
</style>
