import axios from 'axios';
import { store } from '../App';

function checkStatus(data) {
    // store.dispatch({type:'updateLoading',payload:{test:false}})
    // console.log(data);
    // 在此处检查状态码等操作
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}


export default function (path, param = {}) {
    // const {dispatch} = store;
    // dispatch({type:'updateLoading',payload:{test:true}})
    const url = `http://localhost:8000/admin/${path}`
    return axios.create({
        withCredentials: 'include',
        timeout: 3000
    })
        .post(url, param)
        .then(checkStatus)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return new Promise((resolve) => {
                resolve({
                    error: {
                        message: '服务请求失败',
                        detail: err
                    }
                });
            })
        });
}