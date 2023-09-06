<template>
  <div>
    <h1>您擁有的課程</h1>
    <ul>
      <li v-for="course in userCourses" :key="course.id">
        {{ course.name }}
        <button @click="openCreateAnnouncementModal(course.id)">
          新增公告
        </button>
      </li>
    </ul>

    <h1>所有公告</h1>
    <ul>
      <li v-for="announcement in announcements" :key="announcement.id">
        <h3>{{ announcement.title }}</h3>
        <p>{{ announcement.content }}</p>
      </li>
    </ul>

    <!-- 彈出視窗 -->
    <div v-if="showCreateAnnouncementModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeCreateAnnouncementModal">&times;</span>
        <h2>新增公告</h2>
        <form @submit.prevent="createAnnouncement">
          <label for="title">標題：</label>
          <input type="text" id="title" v-model="announcement.title" required />

          <label for="content">內容：</label>
          <textarea
            id="content"
            v-model="announcement.content"
            required
          ></textarea>

          <label for="course">選擇課程：</label>
          <select id="course" v-model="selectedCourse">
            <option
              v-for="course in userCourses"
              :key="course.id"
              :value="course.id"
            >
              {{ course.name }}
            </option>
          </select>

          <button type="submit">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userCourses: [],
      posts: [],
      showCreateAnnouncementModal: false,
      selectedCourse: null,
      announcement: {
        title: "",
        content: "",
      },
    };
  },
  mounted() {
    this.fetchUserCourses();
    this.fetchAnnouncements();
  },
  methods: {
    async fetchUserCourses() {
      try {
        const response = await axios.get(`/videoLessons/${this.usersId}`);
        this.posts = response.data;
      } catch (error) {
        console.error("獲取公告數據時出錯", error);
      }
    },
    async fetchAnnouncements() {
      try {
        const response = await axios.get(`/coursePost/${this.usersId}`);
        this.posts = response.data;
      } catch (error) {
        console.error("獲取公告數據時出錯", error);
      }
    },
    openCreateAnnouncementModal(courseId) {
      // 打開新增公告的模態對話框
      this.selectedCourse = courseId;
      this.showCreateAnnouncementModal = true;
    },
    closeCreateAnnouncementModal() {
      // 關閉新增公告的模態對話框
      this.showCreateAnnouncementModal = false;
    },
    async createAnnouncement() {
      // 將公告數據提交到後端，關聯到所選的課程 (this.selectedCourse)
      const dataToSend = {
        courseId: this.selectedCourse,
        title: this.announcement.title,
        content: this.announcement.content,
      };

      // 執行提交操作，通常使用 Axios 或其他 HTTP 函數
      // 省略實際提交細節
      console.log("提交公告數據", dataToSend);

      // 重置表單數據
      this.announcement = {
        title: "",
        content: "",
      };

      // 關閉彈出視窗
      this.showCreateAnnouncementModal = false;
    },
  },
};
</script>

<style>
/* 样式化模态对话框 */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
