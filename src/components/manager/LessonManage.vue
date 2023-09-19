<template>
  <h1>
    <BookSharp style="width: 40px; margin: 0 10px" />課程管理
  </h1>
  <div>
    <div class="title">課程列表</div>
    <div class="content">
      <div class="content-body">
        課程查詢
        <select v-model="subjectData" @change="selectedSub(subjectData)">
          <option value="" selected hidden>請選擇</option>
          <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
            {{ subject.subjectContent }}
          </option>
        </select>

        <button type="button" class="btn btn-dark" @click="getAll">重置</button>
      </div>
      <br />
      <div class="col-3">
        <PageSize @pageSizeChange="changeHandler"></PageSize>
      </div>
      <div class="table-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>課程編號</th>
              <th>課程類別</th>
              <th>老師姓名</th>
              <th>課程名稱</th>
              <th>上課方式</th>
              <th>課程價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{
              lessonId,
              subjectName,
              teacherName,
              lessonName,
              lessonType,
              price,
            } in lessons">
              <td>{{ lessonId }}</td>
              <td>{{ subjectName }}</td>
              <td>{{ teacherName }}</td>
              <td>{{ lessonName }}</td>
              <td>
                <span v-if="lessonType">線上</span>
                <span v-else>影音</span>
              </td>
              <td>{{ price }}</td>
            </tr>
          </tbody>
        </table>
        <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" @click="clickHandler(value)" v-for="(value, index) in totalPages" :key="index"><a
                :class="{ 'page-link': true, 'currentPage': datas.start + 1 === value }">{{
                  value }}</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { BookSharp } from "@vicons/ionicons5"
import tutorlink from '@/api/tutorlink.js';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import Paging from "../manager/Paging.vue";
import PageSize from "../manager/PageSize.vue";


//取得課程資料
const lessons = ref([])
const subjectContent = ref()
const image = ref([])
// const getAll = async()=>{tutorlink.post(`/getAllLesson`).then((response) => {
//     lessons.value = response.data

//     image.value = lessons.value.image
//     console.log('所有課程資訊', lessons.value);


// })}
// getAll();

const subjects = ref([]);
const subjectData = ref("");
tutorlink.get("/allSubjects").then((response) => {
  subjects.value = response.data;
  // if (subjects.value.length > 0) {
  //     subjectData.value = subjects.value[0].subjectId;
  // }
  console.log(response.data);
});

const selectedSub = async (subjectId) => {
  tutorlink.get(`/getLessonBysubjectId/${subjectId}`).then((response) => {
    lessons.value = response.data
    image.value = lessons.value.image
  })
}


// 分頁用變數
const totalPages = ref(0);
const datas = reactive({
  start: 0,
  rows: 0,
  sortType: "id",
});


const loadLessons = async () => {
  const API_URL = "/getAllLesson";
  const response = await tutorlink.post(API_URL, datas);
  //取得所有用戶放進users變數
  lessons.value = response.data.lesson;
  // 計算總共幾頁
  totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.total / datas.rows)
}

//paging 由子元件觸發
const clickHandler = page => {
  datas.start = page - 1
  loadLessons()
}

//一頁幾筆資料
const changeHandler = value => {
  datas.rows = value
  datas.start = 0
  console.log("pagesize：", datas)
  loadLessons()
}

loadLessons();

onMounted(() => {
  loadLessons();
});
</script>

<style scoped>
thead tr th {
  color: white;
  font-weight: bold;
  background-color: #3a4c64;
  text-align: center;
}

tbody tr td {
  padding-left: 1%;
}

.table-body {
  margin-top: 10px;
}

.content-body {
  display: flex;
  align-items: center;
}

input {
  margin-left: 10px;
}

button {
  margin-left: 10px;
  padding: 2px 5px 2px 5px;
  display: flex;
  align-items: center;
}

h1 {
  margin: 5px 5px 15px 2%;
  padding: 5px;
}

.body {
  display: flex;
  flex-direction: column;
}

.title {
  background-color: #fbfbfb;
  width: 95%;
  margin: 0 auto;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
  font-size: 20px;
}

.content {
  background-color: #fbfbfb;
  width: 95%;
  margin: 0 auto;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
  font-size: 16px;
}
</style>
