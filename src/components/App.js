import React from 'react';
import Header from './Header/Header';
import Home from '../containers/Home/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Post from "../containers/Post/Post";

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/post/:postId' component={Post} />
                        <Route component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;