import { ref } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useLessonStore = defineStore('lessonStore', () => {

    const lessons = ref([])
    const lessonDetail = ref([])

    async function getLessonAllInfo(lessonId) {
        if (lessonId) {
            try {
                const lessonResponse = await tutorlink.post(`/findLessons/${lessonId}`)
                lessons.value = lessonResponse.data

                const detailResponse = await tutorlink.get(`/findLessonDetailByLessonId?lessonId=${lessonId}`)
                lessonDetail.value = detailResponse.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }



    return { lessons, lessonDetail, getLessonAllInfo }
})