import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer,{rootSaga} from './reducer/index';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import BasicLayout from './layouts/HeaderAsideFooterResponsiveLayout'
import {getComponentAsync} from './utils/util';
import './assets/index.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

// sages
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension?window.devToolsExtension():f=>f
));
sagaMiddleware.run(rootSaga);

export {store};
export default
<LocaleProvider locale={zh_CN}>
    <Provider store={store}>
        <Router>
            <Switch>
                <Route
                    exact
                    path="/login"
                    component={getComponentAsync('Login')}
                />
                <Route
                    path="/"
                    render={props => <BasicLayout {...props} />}
                />
            </Switch>
        </Router>
    </Provider>
</LocaleProvider>
