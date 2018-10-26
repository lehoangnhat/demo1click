import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
import './index.css';
import { store } from './_helper';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();
