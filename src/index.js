import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createStore from './store/createStore';
import { history } from './store/location';

import App from './components/App';
import 'nprogress/nprogress.css';
import './stylesheets/index.scss';

// Store Initialization
// ------------------------------------
const store = createStore({}, history);

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , MOUNT_NODE);
