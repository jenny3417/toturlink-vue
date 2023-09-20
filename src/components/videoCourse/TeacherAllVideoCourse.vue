<template setup>
  <div style="margin-left: 100px; display: flex; justify-content: center">
    <div class="container1">
      <h4>我的課程列表({{ count }})</h4>
      <div v-for="videoclass in videoclasses" class="video">
        <!-- <router-link :to="'/editVideoCourse/' + videoclass.LessonId"> -->
        <div
          style="
            background-color: white;
            padding: 10px;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
            width: 900px;
          "
        >
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
            X 刪除課程
          </p>
          <router-link
            :to="{
              name: 'VideoCourse',
              params: { lessonId: videoclass.lessonId },
            }"
          >
            <h6>預覽課程商品頁面</h6>
          </router-link>
          <router-link
            :to="{
              name: 'VideoClassPage',
              params: { id: videoclass.lessonId },
            }"
          >
            <h6>預覽課程上課頁面</h6>
          </router-link>
        </div>
      </div>
      <!-- 分頁 -->
      <!-- <ul class="pagination" style="margin-bottom: 20px">
        <li class="page-item" :class="{ active: currentPage === 1 }">
          <a class="page-link" @click="setCurrentPage(1)">1</a>
        </li> -->
      <!-- 頁碼循環-->
      <!-- <li class="page-item" v-for="page in pages" :key="page">
          <a class="page-link" @click="setCurrentPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ active: currentPage === totalPages }">
          <a class="page-link" @click="setCurrentPage(totalPages)">{{
            totalPages
          }}</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const videoclasses = ref([]);
const router = useRouter();

const count = ref("");
console.log("count", count);

const getcourse = async () => {
  const response = await tutorlink.get("/VideoLessons");
  console.log(response.data);
  videoclasses.value = response.data;
  console.log("videoclasses:", videoclasses.value);
  count.value = videoclasses.value.length;
  // setCurrentPage(currentPage.value);
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

// 分頁數據
// const itemsPerPage = 3; // 每頁顯示的數量
// const currentPage = ref(1); // 當前頁
// const totalPages = computed(() =>
//   Math.ceil(videoclasses.value.length / itemsPerPage)
// );
// console.log("頁數", totalPages);

// // 當前頁的課程數據
// const paginatedVideoClasses = computed(() => {
//   const startIndex = (currentPage.value - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return videoclasses.value.slice(startIndex, endIndex);
// });

// // 頁碼
// const pages = computed(() => {
//   const pagesArray = [];
//   for (let i = 2; i <= totalPages.value - 1; i++) {
//     pagesArray.push(i);
//   }
//   return pagesArray;
// });

// 計算總課程數
// const courseCount = computed(() => videoclasses.length);

// 設置當前頁
// const setCurrentPage = (page) => {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//   }
// };
</script>

<style scoped>
.video {
  width: 900px;
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
  width: 900px;
  height: 125px;
  background-color: rgba(0, 0, 0, 0.2); /* 透明灰色 */
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
  color: black;
  font-size: 15px;
  /* position: absolute; */
  top: 5px;
  right: 5px;
  padding: 5px;
  font-weight: 700;
}
</style>
