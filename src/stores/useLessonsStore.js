import { ref, computed } from "vue";
import { defineStore } from "pinia";
import tutorlink from "../api/tutorlink.js";

export const useLessonsStore = defineStore("lessonsStore", () => {
  const lessonList = ref([]);
  const vedioList = ref([]);
  const onlineList = ref([]);

  async function lessonsAjax() {
    try {
      const response = await tutorlink.post("/findAllLesson");
      lessonList.value = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function lessonsTypeAjax() {
    try {
      const response = await tutorlink.post("/findAllLesson");
      const onlineListArr = [];
      const vedioListArr = [];
      response.data.forEach((list) => {
        if (list.lessonType) {
          onlineListArr.push(list);
          onlineList.value = onlineListArr;
        } else {
          vedioListArr.push(list);
          vedioList.value = vedioListArr;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return { lessonList, vedioList, onlineList, lessonsAjax, lessonsTypeAjax };
});
