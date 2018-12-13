import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
import './index.css';
import { store } from './_helper';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {loadState, saveState} from './_helper/localStorage';

var http = require("http");
  setInterval(function() {
    http.get("http://demo1click.herokuapp.com");
}, 300000);

store.subscribe(() => {
    saveState(store.getState());

  });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();

