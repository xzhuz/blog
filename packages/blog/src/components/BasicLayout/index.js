import React from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Articles from "../../routes/Articles/loadable";
import Relative from "../../routes/Relative/loadable";
import Article from "../../routes/Article/loadable";
import Achieve from "../../routes/Achieves/loadable";
import About from "../../routes/About";
import NotFound from "../NotFound";

class BasicLayout extends React.PureComponent {

    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/articles' component={Articles} />
                        <Route path='/tag/:tagName' component={Relative}/>
                        <Route path='/article/:articleId' component={Article}/>
                        <Route path='/achieve' component={Achieve}/>
                        <Route path='/about' component={About} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default BasicLayout;