import {call, put, takeEvery} from 'redux-saga/effects';
import {getRoundList, updateRound, deleteRound, addRound} from '../api/round';
import createHistory from 'history/createHashHistory';
import {store} from '../App';
import {message} from 'antd';

const history = createHistory();

const initState = {
    pagesize: 5,
    pageindex: 1,
    count: 0,
    list: [],
    loading: false,
    updateRoundRes: {},
    deleteRoundRes: {}
};

export default function round(state = initState, action) {
    switch (action.type) {
        case 'updateListNCount':
            return {
                ...state,
                ...action.payload
            };

        case 'updatePageindex':
            return {
                ...state,
                pageindex: action.payload
            }

        case 'updateRoundRes':
            return {
                ...state,
                updateRoundRes: action.payload
            }

        case 'deleteRoundRes':
            return {
                ...state,
                deleteRoundRes: action.payload
            }

        case 'updateLoading':
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state;
    }
}

function * getRoundListAsync(action) {
    yield put({type: 'updateLoading', payload: true});
    var param = {
        pagesize: store
            .getState()
            .round
            .pagesize,
        pageindex: 1,
        ...action.payload
    }
    const res = yield call(getRoundList, param);
    if (res.error) {
        console.log(res.error);
    } else {
        yield put({type: 'updateListNCount', payload: res.result});
    }
    yield put({type: 'updateLoading', payload: false});
}

function * updateRoundAsync(action) {
    yield put({type: 'updateLoading', payload: true});
    const res = yield call(updateRound, action.payload);
    yield put({type: 'updateLoading', payload: false});
    if (res.error) {
        console.log(res.error);
    } else {
        message.success('修改成功');
    }
    yield put({type: 'updateRoundRes', payload: res});
    yield put({type: 'getRoundList'});
}

function * deleteRoundAsync(action) {
    yield put({type: 'updateLoading', payload: true});
    const res = yield call(deleteRound, action.payload);
    yield put({type: 'updateLoading', payload: false});
    if (res.error) {
        console.log(res.error);
    } else {
        message.success('删除成功');
    }
    yield put({type: 'deleteRoundRes', payload: res});
    yield put({type: 'getRoundList'});
}

function * addRoundAsync(action) {
    yield put({type: 'updateLoading', payload: true});
    const res = yield call(addRound, action.payload);
    yield put({type: 'updateLoading', payload: false});
    if (res.error) {
        console.log(res.error);
    } else {
        message.success('添加成功');
    }
    // yield put({type: 'addRoundRes', payload: res});
    yield put({type: 'getRoundList'});
}

export function * watchGetRoundAsync() {
    yield takeEvery("getRoundList", getRoundListAsync);
    yield takeEvery("updateRound", updateRoundAsync);
    yield takeEvery("deleteRound", deleteRoundAsync);
    yield takeEvery("addRound", addRoundAsync);
}
