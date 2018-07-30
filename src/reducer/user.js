import { call, put, takeEvery} from 'redux-saga/effects';
import {getUserList, deleteUser, editRevive, getUserRound} from '../api/user';
import {store} from '../App';
import {message} from 'antd';

const initState = {
    pagesize: 5,
    pageindex: 1,
    count: 0,
    loading: false,
    userRoundLoading: false,
    userList: [],
    userRoundCount: 0,
    userRoundList: []
};

export default function (state = initState, action) {
    switch (action.type) {
        case 'user/updateUserList': 
            return {
                ...state,
                userList: action.payload,
            };
        
        case 'user/updateListNCount':
            return {
                ...state,
                ...action.payload
            };

        case 'user/updatePageindex':
            return {
                ...state,
                pageindex: action.payload
            }

        case 'user/updateUserRoundListNCount':
            return {
                ...state,
                userRoundCount: action.payload.count,
                userRoundList: action.payload.list
            }

        case 'user/updateLoading':
            return {
                ...state,
                loading: action.payload
            }

        case 'user/updateUserRoundLoading':
            return {
                ...state,
                userRoundLoading: action.payload
            }


        default:
            return state;
    }
}

function* getUserListAsync(action) {
    yield put({type: 'user/updateLoading', payload: true});
    var param = {
        pagesize: store
            .getState()
            .user
            .pagesize,
        pageindex: 1,
        ...action.payload
    }
    yield put({type: 'user/updatePageindex', payload: param.pageindex});
    const res = yield call(getUserList, param);
    if (!res.error) {
        yield put({type: 'user/updateListNCount', payload: res.result});
    }
    yield put({type: 'user/updateLoading', payload: false});
}

function * deleteUserAsync(action) {
    yield put({type: 'user/updateLoading', payload: true});
    const res = yield call(deleteUser, action.payload);
    yield put({type: 'user/updateLoading', payload: false});
    if (!res.error) {
        message.success('删除成功');
    }
    yield put({type: 'user/getUserList'});
}

function * editReviveAsync(action) {
    yield put({type: 'user/updateLoading', payload: true});
    const res = yield call(editRevive, action.payload);
    yield put({type: 'user/updateLoading', payload: false});
    if (!res.error) {
        message.success('修改成功');
    }
    yield put({type: 'user/getUserList',payload: {
        pageindex: store
                    .getState()
                    .user
                    .pageindex
    }});
}

function *getUserRoundAsync(action) {
    yield put({type: 'user/updateUserRoundLoading', payload: true});
    const res = yield call(getUserRound, action.payload);
    yield put({type: 'user/updateUserRoundLoading', payload: false});
    if (!res.error) {
        yield put({type: 'user/updateUserRoundListNCount', payload: res.result });
    }
}


export function* watchGetUserListAsync() {
    yield takeEvery("user/getUserList", getUserListAsync);
    yield takeEvery("user/deleteUser", deleteUserAsync);
    yield takeEvery("user/editRevive", editReviveAsync);
    yield takeEvery("user/getUserRound", getUserRoundAsync);

}


