import { createApp } from 'pipe-and-gauge';
import actions from './actions';
import initialState from './initialState';
import App from './app';

const store = createApp(actions, initialState, App, document.getElementById('root'));

store.fetchGalleries();
