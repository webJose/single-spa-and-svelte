<script lang="ts">
    import MenuBar from "$lib/MenuBar.svelte";
    import type { IMenuItem, MenuItemProps } from "$lib/MenuItem.svelte";
    import PageTitle from "$lib/PageTitle.svelte";
    import SpinnerPage from "$lib/SpinnerPage.svelte";
    import pageTitle from "$stores/pageTitle";
    import { navigateToUrl } from "single-spa";
    import * as eases from "svelte/easing";
    import { fly } from "svelte/transition";
    import config from "./config.js";
    import { runSpas } from "./singleSpa.js";

    type SpeedyMenuItem = IMenuItem<MenuItemProps & { url?: string; }>;

    let menu: SpeedyMenuItem[] = [
        {
            id: 1,
            text: "Home",
            url: "/"
        },
        {
            id: 2,
            text: "FDS",
            items: [
                {
                    id: 20,
                    text: "Tools",
                    url: "/spa01"
                },
                {
                    id: 21,
                    text: "TPOC's",
                },
                {
                    id: 22,
                    text: "Approvals",
                    items: [
                        {
                            id: 220,
                            text: "Approvals Home",
                        },
                        {
                            id: 221,
                            text: "Approvals in Edit Mode",
                        },
                    ],
                },
                {
                    id: 23,
                    text: "Tool Contacts",
                },
                {
                    id: 24,
                    text: "Dashboard",
                },
            ],
        },
        {
            id: 3,
            text: "Utility Modeling",
            items: [
                {
                    id: 30,
                    text: "POC to Bay Strategies",
                },
                {
                    id: 31,
                    text: "Instant",
                    items: [
                        {
                            id: 310,
                            text: "Scenarios",
                        },
                        {
                            id: 311,
                            text: "Run scenario...",
                        },
                    ],
                },
                {
                    id: 32,
                    text: "DP Segment",
                    items: [
                        {
                            id: 320,
                            text: "Show Segment Grid",
                        },
                        {
                            id: 321,
                            text: "Show Segment Tree",
                        },
                    ],
                },
                {
                    id: 34,
                    text: "Visualization",
                },
                {
                    id: 35,
                    text: "Reports",
                },
            ],
        },
    ];

    let menuParent;
    let menuOpen = false;

    const logos = ["./intel-logo01.png", "./intel-logo03.webp"];
    let currentLogo = 0;
    $: currentLogoUrl = logos[currentLogo];

    const logInPromise = logIn().then(async () => {
        runSpas();
    });

    function cycleLogo() {
        currentLogo = (currentLogo + 1) % logos.length;
    }

    function onMenuItemClick(e: CustomEvent<SpeedyMenuItem>) {
        pageTitle.set(e.detail.text ?? "");
        if (e.detail.url) {
            navigateToUrl(e.detail.url);
        }
    }

    function logIn() {
        return new Promise<void>((rslv, rjct) => {
            setTimeout(() => rslv(), 3000);
        });
    }
</script>

{#await logInPromise}
    <SpinnerPage />
{:then}
    <main>
        <header>
            <div class="header-content">
                <div class="logo">
                    {#key currentLogo}
                        <img
                            src={currentLogoUrl}
                            alt="Intel"
                            style="max-width: 7em; height: auto;"
                            on:click={cycleLogo}
                            on:keydown={() => {}}
                            in:fly={{
                                duration: 300,
                                y: 100,
                                delay: 250,
                                easing: eases.backOut,
                            }}
                            out:fly={{ duration: 300, y: -50 }}
                        />
                    {/key}
                </div>
                <hgroup>
                    <h1>{config.app.name}</h1>
                    <h5>{config.app.title}</h5>
                </hgroup>
                <div
                    class="environment"
                    style:display={config.environment.isProduction()
                        ? "none"
                        : "block"}
                >
                    <div>{config.environment.current.name}</div>
                </div>
                <div class="header-data">
                    <span>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                    </span>
                    <span>
                        <a href="/">Lorem ipsum dolor sit amet consectetur.</a>
                    </span>
                    <span> Lorem ipsum dolor sit. </span>
                    <span>
                        <a href="/">Roles</a>
                    </span>
                </div>
            </div>
            <nav bind:this={menuParent}>
                <MenuBar
                    items={menu}
                    layout="horizontal"
                    on:itemClick={onMenuItemClick}
                />
                <PageTitle />
            </nav>
        </header>
        <slot />
    </main>
{/await}

<style>
    header {
        background-color: var(--controlBgColor);
        color: var(--controlFgColor);
        border-radius: 1em;
        display: flex;
        flex-flow: column;
    }

    header a, header a:visited {
        color: var(--controlActiveFgColor);
    }

    header > *:last-child {
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }

    div.header-content {
        display: flex;
        flex-flow: row;
        gap: 0.5em;
        position: relative;
    }

    div.logo {
        width: 7em;
        height: 5em;
    }

    div.environment {
        position: relative;
    }

    div.environment > div {
        position: absolute;
        top: 0;
        border-bottom-left-radius: 0.4em;
        border-bottom-right-radius: 0.4em;
        background-color: var(--controlHiliBgColor);
        color: var(--controlHiliFgColor);
        display: inline-block;
        font-weight: bold;
        font-size: smaller;
        padding: 0.3em 1em;
    }

    div.header-data {
        display: flex;
        flex-flow: row;
        gap: 0.5em;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-top: 1.2em;
        padding-right: 1em;
        margin-left: auto;
    }

    nav {
        background-color: var(--controlAltBgColor);
        color: var(--controlAltFgColor);
        padding: 0.5em 1em;
        display: flex;
        flex-flow: row;
    }

    nav > :global(*:last-child) {
        margin-left: auto;
    }

    hgroup h1,
    hgroup h5 {
        margin: 0;
    }
</style>
