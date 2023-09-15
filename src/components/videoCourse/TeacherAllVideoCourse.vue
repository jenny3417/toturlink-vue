<template setup>
  <div style="margin-left: 100px; display: flex; justify-content: center">
    <div class="container1">
      <h1>我的課程列表({{ courseCount }})</h1>
      <div v-for="videoclass in videoclasses" class="video">
        <!-- <router-link :to="'/editVideoCourse/' + videoclass.LessonId"> -->
        <router-link :to="`/editCourse/` + videoclass.lessonId">
          <div class="image-container">
            <div class="image-wrapper">
              <div style="padding-left: 30px">
                <h5 style="font-weight: 500">{{ videoclass.lessonName }}</h5>
                <!-- <p>{{ videoclass.teacherName }}</p> -->
              </div>
              <div class="overlay" @click="editLesson(videoclass.lessonId)">
                <h5 style="font-weight: 800">編輯/管理課程</h5>
              </div>
            </div>
          </div>
        </router-link>
        <p
          @click="confirmDeleteCourse(videoclass.lessonId)"
          class="delete-icon"
        >
          X
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const videoclasses = ref([]);
const courseCount = ref("");
const router = useRouter();

const getcourse = async () => {
  const response = await tutorlink.get("/VideoLessons");
  console.log(response.data);
  videoclasses.value = response.data;
  console.log("videoclasses:", videoclasses.value);
  courseCount.value = videoclasses.value.length;
};
getcourse();

const confirmDeleteCourse = (lessonId) => {
  const userConfirmed = window.confirm("確定要刪除嗎?");
  if (userConfirmed) {
    deleteCourse(lessonId);
  } else {
  }
};
const deleteCourse = async (lessonId) => {
  await tutorlink.delete(`/delVideoLessons/${lessonId}`);
  console.log("課程Id:", lessonId, "已刪除");
  getcourse();
};

const editLesson = (lessonId) => {
  router.push({
    name: "editCourse",
    query: {
      lessonId: lessonId,
    },
  });
};
</script>

<style scoped>
.video {
  width: 700px;
  margin: 20px 0;
  /* flex-direction: column; */
  border: 1px solid #eee;
}
.container1 {
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  width: 70vw;
}

.image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 125px;
  border: 1px solid #aaa;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 700px;
  height: 125px;
  background-color: rgba(0, 0, 0, 0.4); /* 透明灰色 */
  opacity: 0; /* 初始不显示 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.video:hover .overlay {
  opacity: 1; /* 鼠标悬停时显示遮罩 */
}

a {
  text-decoration: none;
  color: inherit;
}

.delete-icon {
  cursor: pointer;
  color: #ccc;
  font-size: 20px;
  /* position: absolute; */
  top: 5px;
  right: 5px;
  padding: 5px;
  font-weight: 700;
}
</style>
