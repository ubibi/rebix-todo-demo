import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect,useRouterHistory,hashHistory,browserHistory} from 'react-router';
import RebixConfig from './config/RebixConfig';
import Rebix,{Provider} from 'react-rebix';
import TodoApp from './views/TodoApp';
import '../static/css/base.css';
import '../static/css/index.css';

var store = RebixConfig.getStore();


ReactDOM.render(
    <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="*" component={TodoApp}>
                </Route>
            </Router>
    </Provider>,
    document.getElementById('todoapp')
);