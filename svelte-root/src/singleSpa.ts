import { registerApplication, start } from "single-spa"

const spas = {
    spa01: "@learnSspa/spa01",
    spa02: "@learnSspa/spa02",
}
export async function registerSpas() {
    for (let [k, v] of Object.entries(spas)) {
        registerApplication({
            name: k,
            activeWhen: `/${k}`,
            app: () => import(/* @vite-ignore */ v)
        });
    }
}

export function runSpas() {
    start();
}
