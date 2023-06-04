import App from './App.svelte'
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'spa01',
  app: () => {
    const moduleName = '@learnSspa/spa01';
    return import(/* @vite-ignore */ moduleName);
  },
  activeWhen: ['/01']
});

start();

const app = new App({
  target: document.getElementById('app'),
})

export default app
