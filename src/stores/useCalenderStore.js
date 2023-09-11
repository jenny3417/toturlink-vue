import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useCalenderStore = defineStore('calenderStore', () => {

    const userCalender = ref([])

    async function calenderAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/calender/findbyuser?uid=" + userId);
                userCalender.value = response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return { userCalender, calenderAjax }
})