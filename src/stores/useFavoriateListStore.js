import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useFavoriateListStore = defineStore('favoriateList', () => {

    const favoriateList = ref([])

    async function favoriateListAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/favorite?uid=" + userId);
                favoriateList.value = response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return { favoriateList, favoriateListAjax }
})