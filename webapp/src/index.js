import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Header from "./Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navigation from "./Navigation";
import LoginNavigation from "./LoginNavigation";
import NavigationManager from "./NavigationManager";

ReactDOM.render(
    <div className="container">
        <div className="row">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={LoginNavigation}/>
                        <Route path='/MistakeBook' component={Navigation}/>
                        <Route path='/Manager' component={NavigationManager}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    </div>,
    document.getElementById('root'));
registerServiceWorker();
