import App from './App.svelte'
import { registerSpas } from "./singleSpa.js";

registerSpas();

const app = new App({
  target: document.getElementById('app'),
})

export default app
