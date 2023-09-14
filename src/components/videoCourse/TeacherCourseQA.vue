<template>
  <div style="margin-bottom: 100px" class="question-list">
    <h1 style="margin-bottom: 20px">問與答列表</h1>
    <div v-for="videoclass in videoclasses" class="video">
      <!-- <router-link :to="'/editVideoCourse/' + videoclass.LessonId"> -->
      <div class="image-container">
        <div class="image-wrapper">
          <div class="content" style="padding-left: 30px">
            <h5 style="font-weight: bolder">
              課程名稱:{{ videoclass.lessonName }}
            </h5>
            <h6>所有問答({{ qaList.length }})</h6>
            <div style="border: 1px solid #ccc; padding: 20px">
              <ul class="qa-list">
                <li v-for="(qaItem, index) in qaList" :key="index">
                  <h5>問題內容</h5>
                  <h6 class="qa-title">{{ qaItem.title }}</h6>
                  <p class="qa-content">{{ qaItem.question }}</p>
                  <p class="qa-time">提問時間:{{ formatDate(qaItem.time) }}</p>
                  <hr />
                  <h5>您的回應</h5>
                  <h6>{{ qaItem.tempAnswer }}</h6>
                  <div class="qa-answer">
                    <input
                      type="text"
                      v-model="qaItem.answer"
                      class="qa-answer-input"
                    />
                    <button @click="Answer(qaItem.courseQAId, qaItem)">
                      儲存回應
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import tutorlink from "@/api/tutorlink.js";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const videoclasses = ref([]);
const qaList = ref([]);

const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getcourse = async () => {
  try {
    const response = await tutorlink.get("/VideoLessons");
    console.log("課程列表:", response.data);
    videoclasses.value = response.data;
    if (videoclasses.value.length > 0) {
      videoclasses.value.forEach((lesson) => {
        const lessonId = lesson.lessonId;
        console.log("lessonId:", lesson.lessonId);
        getLessonQA(lessonId);
      });
    } else {
      console.log("該課程沒有問答");
    }
  } catch (error) {
    console.error("獲取課程錯誤", error);
  }
};
getcourse();

const getLessonQA = async (lessonId) => {
  try {
    const response = await tutorlink.get(`/courseQA/${lessonId}`);
    // qaList.value = response.data;
    qaList.value = response.data.map((qaItem) => {
      return { ...qaItem, tempAnswer: qaItem.answer };
    });
    console.log("課程QA列表", qaList.value);
    console.log("qaId:", qaList.value[0].courseQAId);
  } catch (error) {
    console.error("獲取該課問答錯誤", error);
  }
};
// getLessonQA();

const Answer = async (qaId, updatedQAData) => {
  try {
    const response = await tutorlink.put(`/courseQA/${qaId}`, updatedQAData);
    console.log("回答已更新", response.data);
    getcourse();
  } catch (error) {
    console.error("新增回答時錯誤", error);
  }
};
</script>
<style scoped>
.qa-answer-input-container {
  white-space: pre-wrap;
}

ul {
  list-style-type: none;
}
input {
  padding: 6px 10px;
  border: 1px solid #ccc;
}
button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
button:hover {
  background: #e0e0e0;
}

.question-list {
  margin-bottom: 100px;
}

.lesson-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.qa-list {
  list-style-type: none;
  padding: 0;
}

.qa-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.qa-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.qa-content {
  font-size: 14px;
  margin: 5px 0;
}

.qa-time {
  font-size: 12px;
  color: #777;
  margin: 0;
}

.qa-answer {
  display: flex;
  align-items: center;
}

.qa-answer p {
  margin: 0;
}

.qa-answer-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.qa-answer-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.qa-answer-button:hover {
  background-color: #0056b3;
}
</style>
