import './styles/app.scss';
import './styles/global.css';
import './styles/styles.scss';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
