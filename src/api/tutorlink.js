import axios from 'axios';
import app from '@/main.js'
import router from '@/router/index.js'
const tutorlink = axios.create(
    {
        baseURL: 'http://localhost:8081/tutorlink',
        headers: { 'Content-Type': 'application/json' },
        // timeout: 5000
    }
)

tutorlink.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
});



tutorlink.interceptors.response.use(response => {
    console.log(`${response.status} -> 與土魠林克後端通訊成功`)
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 404:
                router.push({ name: '404' })
                console.log("404 -> 你要找的頁面不存在，檢查網址有沒有錯誤")
                break
            case 500:
                router.push({ name: '500' })
                console.log("500 -> 後端程式發生問題，檢查後端有沒有錯誤")
                break
            default:
                console.log(error.message)
        }
    }
    return Promise.reject(error);
})

export default tutorlink;