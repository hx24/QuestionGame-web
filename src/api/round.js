import request from '../utils/request';


export async function getRoundList(params) {
    return request('roundList',params);
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