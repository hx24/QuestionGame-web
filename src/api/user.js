import request from '../utils/request';

export async function getUserList(params) {
    return request('getUserList',params);
}

export async function deleteUser(params) {
    return request('deleteUser',params);
}

export async function editRevive(params) {
    return request('editRevive',params);
}

export async function getUserRound(params) {
    return request('getUserRound',params);
}

