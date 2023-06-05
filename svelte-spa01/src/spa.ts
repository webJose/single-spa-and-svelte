import App from "./App.svelte";
import singleSpaSvelte from "single-spa-svelte";

const lc = singleSpaSvelte({
    component: App
});
let styleEl: HTMLLinkElement;
const doc = globalThis.window?.document;

function bsStyle() {
    if (!doc) {
        console.warn('Could not obtain a hold of the document object.  No styles will be injected.');
        return Promise.reject();
    }
    console.log('Base URL from spa01: %s', import.meta.env.BASE_URL);
    styleEl = doc.createElement('link');
    styleEl.rel = 'stylesheet';
    styleEl.href = `${import.meta.env.BASE_URL}/assets/spa.css`;
    return Promise.resolve();
}

function mountStyle() {
    doc.head.appendChild(styleEl);
    return Promise.resolve();
}

function unmountStyle() {
    styleEl.remove();
    return Promise.resolve();
}

export const bootstrap = [
    bsStyle,
    lc.bootstrap
];

export const mount = [
    mountStyle,
    lc.mount
];

export const unmount = [
    unmountStyle,
    lc.unmount
];
