import React from 'react';
import Header from '../components/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Post from "./Post";
import Login from './Login';

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/post/:postId' component={Post}/>
                        <Route path='/login' component={Login}/>
                        <Route component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;