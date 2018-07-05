import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store/createStore';

import App from './components/App';
import 'nprogress/nprogress.css';
import './stylesheets/index.scss';
import './stylesheets/markdown.scss';

// Store Initialization
// ------------------------------------
const store = createStore({});

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root');


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , MOUNT_NODE);
