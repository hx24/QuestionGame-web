import request from '../utils/request';


export async function login(params) { 
    return request('login',params);
}

export async function logout(params) { 
    return request('logout',params);
}