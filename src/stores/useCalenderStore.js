import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useCalenderStore = defineStore('calenderStore', () => {

    const userCalender = ref([])

    const lessonCalender = ref([])

    async function calenderAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/calender?uid=" + userId);
                userCalender.value = response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    async function lessonCalenderAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/calender/findbylesson?uid=" + userId);
                lessonCalender.value = response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }


    return { userCalender,lessonCalender, calenderAjax, lessonCalenderAjax}
})