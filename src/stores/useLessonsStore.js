import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useLessonsStore = defineStore('lessonsStore', () => {

    const lessonList = ref([])

    async function lessonsAjax() {
        try {
            const response = await tutorlink.get("/findAllLesson");
            lessonList.value = response.data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return { lessonList, lessonsAjax }
})