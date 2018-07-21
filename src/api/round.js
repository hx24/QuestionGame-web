import request from '../utils/request';


export async function getRoundList(params) {
    return request('roundList',params);
}

export async function updateRound(params) {     // 修改场次信息
    return request('updateRound',params);
}

export async function deleteRound(params) {     // 修改场次信息
    return request('deleteRound',params);
}