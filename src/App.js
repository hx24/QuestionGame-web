import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer,{rootSaga} from './reducer/index';
import router from './router';
import './assets/index.css';

// sages
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension?window.devToolsExtension():()=>{}
));
sagaMiddleware.run(rootSaga);

export {store};

export default
<Provider store={store}>
    {router}
</Provider>