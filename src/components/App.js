import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../routes/Home';

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
