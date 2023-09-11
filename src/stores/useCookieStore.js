import { computed } from 'vue'
import { defineStore } from 'pinia'

// 使用函式表達式命名與檔名一樣的變數並被defineStore('自訂義id',函式)賦值
export const useCookieStore = defineStore('cookieStore', () => {

    const usersId = computed(() => {
        var cookies = document.cookie.split(';');
        var cookieObj = {};
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim().split('=');
            var cookieName = cookie[0];
            var cookieValue = cookie[1];
            cookieObj[cookieName] = cookieValue;
        }
        return cookieObj.UsersId;
    })

    return { usersId }
})