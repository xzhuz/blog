import React from 'react';
import Header from '../components/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Post from "./Article";
import Login from './Login';
import Dashboard from './Dashboard';

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/post/:articleId' component={Post}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;