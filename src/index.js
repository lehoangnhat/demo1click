import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
import './index.css';
import { store } from './_helper';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

var http = require("http");
  setInterval(function() {
    http.get("http://demo1click.herokuapp.com");
}, 300000);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();

