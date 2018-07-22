import axios from 'axios';
import React from 'react'
import createHistory from 'history/createHashHistory';
import { notification, Icon } from 'antd';
import {store} from '../App';

const history = createHistory();

const errMsg = {
    403: '未登录',
    408: '请求超时',
    500: '服务器发生错误',
    501: '参数错误，数据库查询失败'
}

function checkStatus(err) {
    const errCode = err.response?err.response.status:408;
    var message = '';
    if(err.response&&err.response.data.error){
        message = err.response.data.error.message
    }else{
        message = errMsg[errCode]
    }
    if(errCode===403){
        history.replace('/login')
    }else{
        notification.open({
            message: err.config.url,
            description: message,
            icon: <Icon type="close" style={{ color: 'red' }} />,
        });
    }
    // 在此处检查状态码等操作
    return new Promise((resolve) => {
        resolve({
            error: {
                message: errMsg[errCode],
                detail: err
            }
        });
    })
}


export default function (path, param = {}) {
    const url = `http://localhost:8000/admin/${path}`;
    const action = {
        type: 'updateGlobalLoading',
        payload: {}
    }
    action.payload[path] = true;
    store.dispatch(action)
    return axios.create({
        withCredentials: 'include',
        timeout: 3000
    })
        .post(url, param, {
            timeout: 3000
        })
        .then(res => {
            return res.data;
        })
        .catch(checkStatus)
        .finally(()=>{
            action.payload[path] = false;
            store.dispatch(action)
        })
}