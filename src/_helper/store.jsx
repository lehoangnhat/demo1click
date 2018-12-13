import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

import {loadState, saveState} from './localStorage';

const persistedState = loadState();
const loggerMiddleware = createLogger();



export const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

