<template>
  <div>
    <h1>新增公告</h1>

    <!-- 添加 @submit 事件处理程序 -->
    <form @submit.prevent="createAnnouncement">
      <label for="title">標題：</label>
      <input type="text" id="title" v-model="announcement.title" required />

      <label for="content">內容：</label>
      <textarea id="content" v-model="announcement.content" required></textarea>

      <label for="course">選擇課程：</label>
      <select id="course" v-model="selectedCourse" required>
        <option value="" disabled selected>請選擇一門課程</option>
        <option
          v-for="course in videoclasses"
          :key="course.id"
          :value="course.id"
        >
          {{ course.lessonName }}
        </option>
      </select>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tutorlink from "@/api/tutorlink.js";

const videoclasses = ref([]);

// 添加数据和方法
const announcement = ref({
  title: "",
  content: "",
});

const selectedCourse = ref("");
const userCourses = ref([]);

const getcourse = async () => {
  const response = await tutorlink.get("/VideoLessons");
  console.log(response.data);
  videoclasses.value = response.data;
  console.log("標題", videoclasses.value[0].lessonName);
};

// 添加创建公告的方法
const createAnnouncement = async () => {
  // 在这里执行创建公告的逻辑
  // 使用 announcement 和 selectedCourse 获取表单数据
  // 您可以通过发送网络请求将公告数据发送到服务器或进行其他必要的操作
};

getcourse();
</script>

<style scoped></style>
