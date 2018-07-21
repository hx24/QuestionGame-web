import { call, put, takeEvery} from 'redux-saga/effects';
import {login} from '../api/user';
import createHistory from 'history/createHashHistory';
const history = createHistory();

const initState = {
    errorMsg: '',
    loading: {
        login: false
    }
};

export default function user(state = initState, action) {
    switch (action.type) {
        case 'updateError': 
            return {
                ...state,
                errorMsg: action.payload,
            };

        case 'updateLoading': 
            return {
                ...state,
                loading: {
                    ...state.loading,
                    ...action.payload
                }
            }


        default:
            return state;
    }
}

function* loginAsync(action) {
    yield put({type: 'updateLoading', payload: {login: true}});
    yield put({type: 'updateError', payload: ""});
    const res = yield call(login, action.payload);
    if(res.error){
        yield put({type: 'updateError', payload: res.error.message})
    }else{
        // 登陆成功
        history.replace('/')
    }
    yield put({type: 'updateLoading', payload: {login: false}});
}


export function* watchLoginAsync() {
    yield takeEvery("login", loginAsync);
}


