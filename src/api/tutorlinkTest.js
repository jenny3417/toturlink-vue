import axios from 'axios';

const tutorlinkTest = axios.create(
    {
        baseURL: 'http://localhost:8081/tutorlink/',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
    }
)

tutorlinkTest.interceptors.request.use(config => {
    config.withCredentials = true;

    return config;
});


tutorlinkTest.interceptors.response.use(response => {
    console.log(`${response.status} -> 與後端通訊成功`)
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 404:
                console.log("404 -> 你要找的頁面不存在，檢查網址有沒有錯誤")
                // go to 404 page
                break
            case 500:
                console.log("500 -> 後端程式發生問題，檢查後端有沒有錯誤")
                // go to 500 page
                break
            default:
                console.log(error.message)
        }
    }
    return Promise.reject(error);
})



export default tutorlinkTest;