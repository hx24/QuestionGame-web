import request from '../utils/request';


export async function getRoundList(params) {
    return request('getRoundList',params);
}

export async function updateRound(params) {     
    return request('updateRound',params);
}

export async function deleteRound(params) {    
    return request('deleteRound',params);
}

export async function addRound(params) {     
    return request('addRound',params);
}

export async function getRoundDetail(params) {
    return request('roundDetail',params);
}

export async function updateQuestion(params) {  // 修改题目
    return request('updateQuestion',params);
}

export async function addQuestion(params) {  // 添加题目
    return request('addQuestion',params);
}

export async function deleteQuestion(params) {  // 删除题目
    return request('deleteQuestion',params);
}