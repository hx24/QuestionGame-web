import {call, put, takeEvery} from 'redux-saga/effects';
import {getRoundList, updateRound, deleteRound, addRound, getRoundDetail, updateQuestion, addQuestion, deleteQuestion, getRank} from '../api/round';
import {store} from '../App';
import {message} from 'antd';

const initState = {
    pagesize: 5,
    pageindex: 1,
    count: 0,
    list: [],
    loading: false,
    updateRoundRes: {},
    deleteRoundRes: {},
    detail: {
        "title":"",
        "reward":0,
        "time":0,
        "questions": []
    },
    rankCount: 0,
    rankList: []
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

        case 'updateRoundListLoading':
            return {
                ...state,
                loading: action.payload
            }
        
        case 'updateDtail': 
            return {
                ...state,
                detail: action.payload
            }

        case 'clearDetail': 
            return {
                ...state,
                detail: {
                    "title":"",
                    "reward":0,
                    "time":0,
                    "questions": []
                }
            }
        
        case 'updateRankData': 
            return {
                ...state,
                ...action.payload
            }

        case 'clearRankData': 
            return {
                ...state,
                rankCount: 0,
                rankList: []
            }

        default:
            return state;
    }
}

function * getRoundListAsync(action) {
    yield put({type: 'updateRoundListLoading', payload: true});
    var param = {
        pagesize: store
            .getState()
            .round
            .pagesize,
        pageindex: 1,
        ...action.payload
    }
    const res = yield call(getRoundList, param);
    if (!res.error) {
        yield put({type: 'updateListNCount', payload: res.result});
    }
    yield put({type: 'updateRoundListLoading', payload: false});
}

function * updateRoundAsync(action) {
    yield put({type: 'updateRoundListLoading', payload: true});
    const res = yield call(updateRound, action.payload);
    yield put({type: 'updateRoundListLoading', payload: false});
    if (!res.error) {
        message.success('修改成功');
    }
    yield put({type: 'updateRoundRes', payload: res});
    yield put({type: 'getRoundList'});
}

function * deleteRoundAsync(action) {
    yield put({type: 'updateRoundListLoading', payload: true});
    const res = yield call(deleteRound, action.payload);
    yield put({type: 'updateRoundListLoading', payload: false});
    if (!res.error) {
        message.success('删除成功');
    }
    yield put({type: 'deleteRoundRes', payload: res});
    yield put({type: 'getRoundList'});
}

function * addRoundAsync(action) {
    yield put({type: 'updateRoundListLoading', payload: true});
    const res = yield call(addRound, action.payload);
    yield put({type: 'updateRoundListLoading', payload: false});
    if (!res.error) {
        message.success('添加成功');
    }
    yield put({type: 'getRoundList'});
}

function *getRoundDetailAsync(action) {
    const res = yield call(getRoundDetail, action.payload);
    if (!res.error) {
        yield put({type: 'updateDtail', payload: res.result});
    }
}

function * updateQuestionAsync(action) {
    const res = yield call(updateQuestion, action.payload);
    yield put({type: 'getRoundDetail', payload: {id: action.payload.roundId}});
    if (!res.error) {
        message.success('修改成功');
    }
}

function * addQuestionAsync(action) {
    const res = yield call(addQuestion, action.payload);
    yield put({type: 'getRoundDetail', payload: {id: action.payload.roundId}});
    if (!res.error) {
        message.success('添加成功');
    }
}

function * deleteQuestionAsync(action) {
    const res = yield call(deleteQuestion, action.payload);
    yield put({type: 'getRoundDetail', payload: {id: action.payload.roundId}});
    if (!res.error) {
        message.success('删除成功');
    }
}

function * getRankAsync(action) {
    const res = yield call(getRank, action.payload);
    if (!res.error) {
        yield put({type: 'updateRankData', payload: {
            rankCount: res.result.count,
            rankList: res.result.list
        }});
    }
}


export function * watchGetRoundAsync() {
    yield takeEvery("getRoundList", getRoundListAsync);
    yield takeEvery("updateRound", updateRoundAsync);
    yield takeEvery("deleteRound", deleteRoundAsync);
    yield takeEvery("addRound", addRoundAsync);
    yield takeEvery("getRoundDetail", getRoundDetailAsync);

    yield takeEvery("updateQuestion", updateQuestionAsync);
    yield takeEvery("addQuestion", addQuestionAsync);
    yield takeEvery("deleteQuestion", deleteQuestionAsync);

    yield takeEvery("getRank", getRankAsync);


}
