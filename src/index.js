import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import {reducers} from "./reducers";
import App from './components/App';

import './index.scss';

const middleware = [];

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);


const store = createStore(reducers, enhancer);

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , MOUNT_NODE);
