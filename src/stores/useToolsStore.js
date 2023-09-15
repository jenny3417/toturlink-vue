import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useToolsStore = defineStore('toolsStore', () => {

    const selectLessonId = ref(0)
    function select(lessonId) {
        selectLessonId.value = lessonId
    }
    return { selectLessonId, select }
})