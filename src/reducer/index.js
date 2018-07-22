import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, {watchLoginAsync} from './user';
import round, {watchGetRoundAsync} from './round';
import loadings from './loadings';

export default combineReducers({ 
    user,
    round,
    loadings
});

 
export function* rootSaga() {
    yield all([
        watchLoginAsync(),
        watchGetRoundAsync()
    ])
  }