import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';

import createStore from './store/createStore';

import App from './routes/app';
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
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , MOUNT_NODE);
