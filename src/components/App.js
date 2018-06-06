import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../routes/HomePage/LoadableHomePage';
import About from '../routes/AboutPage';
import Header from "./Header";
import Footer from "./Footer";

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
