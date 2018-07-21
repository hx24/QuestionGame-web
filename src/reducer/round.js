import { call, put, takeEvery} from 'redux-saga/effects';
import {getRoundList, updateRound, deleteRound} from '../api/round';
import createHistory from 'history/createHashHistory';
const history = createHistory();

const initState = {
    pagesize: 10,
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

function* getRoundListAsync(action) {
    yield put({type: 'updateLoading', payload: {login: true}});
    const res = yield call(getRoundList, action.payload);
    if(res.error){
        console.log(res.error);
    }else{
        yield put({type: 'updateListNCount', payload: res.result});
    }
    yield put({type: 'updateLoading', payload: {login: false}});
}


function* updateRoundAsync(action) {
    yield put({type: 'updateLoading', payload: {login: true}});
    const res = yield call(updateRound, action.payload);
    if(res.error){
        console.log(res.error);
    }
    yield put({type: 'updateRoundRes', payload: res});
    yield put({type: 'getRoundList'});
    yield put({type: 'updateLoading', payload: {login: false}});
}


function* deleteRoundAsync(action) {
    yield put({type: 'updateLoading', payload: {login: true}});
    const res = yield call(deleteRound, action.payload);
    if(res.error){
        console.log(res.error);
    }
    yield put({type: 'deleteRoundRes', payload: res});
    yield put({type: 'getRoundList'});
    yield put({type: 'updateLoading', payload: {login: false}});
}





export function* watchGetRoundAsync() {
    yield takeEvery("getRoundList", getRoundListAsync);
    yield takeEvery("updateRound", updateRoundAsync);
    yield takeEvery("deleteRound", deleteRoundAsync);
}


