import axios from 'axios'
import fm from '../global/common'


export default function initAxios(token){
    axios.defaults.baseURL = fm.HTTP
    console.log('exec here')
    // 请求拦截器
    axios.interceptors.request.use(
        config => {
            console.log("axios init is called")
            // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
            // config.headers["authorization"] = token;//"fm " + localStorage.getItem('fmtoken')
            config.headers["Content-Type"] = 'application/json'
            return Promise.error("");
            // return config;
        },
        error => {
            return Promise.error(error);
        })


}
// export function fmAxiosPost(url, data) {
//     return axios.post(url, {}, data)
// }