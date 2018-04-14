import React from 'react';
import Header from '../components/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Article from "./Article";
import Login from './Login';
import Dashboard from './Dashboard';
import ArchiveArticles from './ArchiveArticles';
import NotFound from "../components/NotFound";
import About from "./About";

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/tag/:tagName' component={ArchiveArticles}/>
                        <Route path='/article/:articleId' component={Article}/>
                        <Route path='/about' component={About}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;