import { call, put, takeEvery} from 'redux-saga/effects';
import {login, logout} from '../api/login';
import createHistory from 'history/createHashHistory';
const history = createHistory();

const initState = {
    errorMsg: '',
};

export default function (state = initState, action) {
    switch (action.type) {
        case 'updateError': 
            return {
                ...state,
                errorMsg: action.payload,
            };

        default:
            return state;
    }
}

function* loginAsync(action) {
    yield put({type: 'updateError', payload: ""});
    const res = yield call(login, action.payload);
    if(res.error){
        yield put({type: 'updateError', payload: res.error.message})
    }else{
        // 登陆成功
        history.replace('/')
    }
}

function* logoutAsync() {
    history.replace('/login')
    yield call(logout);
}


export function* watchLoginAsync() {
    yield takeEvery("login", loginAsync);
    yield takeEvery("logout", logoutAsync);
}


