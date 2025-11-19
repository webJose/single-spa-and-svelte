import { mount } from 'svelte';
import App from './App.svelte';
import { registerSpas } from "./singleSpa.js";

registerSpas();

mount(App, { target: document.getElementById('app')! });
