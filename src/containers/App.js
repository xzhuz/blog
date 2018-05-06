import React from 'react';
import Header from './Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Article from "./Article";
import Login from './Login';
import Dashboard from './Dashboard';
import ArchiveArticles from './ArchiveArticles';
import About from "../components/About";
import Footer from "../components/Footer";

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/tag/:tagName' component={ArchiveArticles}/>
                        <Route path='/article/:articleId' component={Article}/>
                        <Route path='/introduction' component={About}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route component={Home}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
