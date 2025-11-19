import { singleSpaSvelte } from "@wjfe/single-spa-svelte";
import { cssLifecycleFactory } from "vite-plugin-single-spa/ex";
import App from "./App.svelte";

const cssLc = cssLifecycleFactory('spa');
const lc = singleSpaSvelte(App);

export const bootstrap = [
    cssLc.bootstrap,
    lc.bootstrap
];
export const mount = [
    cssLc.mount,
    lc.mount
];
export const unmount = [
    lc.unmount,
    cssLc.unmount,
];
export const update = lc.update;
