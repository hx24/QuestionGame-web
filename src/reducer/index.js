import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import login, {watchLoginAsync} from './login';
import round, {watchGetRoundAsync} from './round';
import user, {watchGetUserListAsync} from './user';
import loadings from './loadings';

export default combineReducers({ 
    login,
    round,
    user,
    loadings
});

 
export function* rootSaga() {
    yield all([
        watchLoginAsync(),
        watchGetRoundAsync(),
        watchGetUserListAsync()
    ])
  }