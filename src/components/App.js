import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../routes/Home/loadable';
import About from '../routes/About';
import Relative from '../routes/Relative';
import Header from "./Header";
import Footer from "./Footer";

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/tag/:tagName' component={Relative}/>
                        <Route path='/about' component={About} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
