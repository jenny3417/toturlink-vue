<template>
  <div>
    <h1>問與答列表</h1>
    <ul>
      <li v-for="question in questions" :key="question.id">
        <p>{{ question.text }}</p>
        <div v-if="!question.reply">
          <textarea v-model="question.replyText"></textarea>
          <button @click="submitReply(question.id)">提交回答</button>
        </div>
        <div v-else>
          <p>答案：{{ question.reply }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      questions: [],
      courseId: 1, // 替換為當前使用者的課程ID，或從路由中獲取
    };
  },
  mounted() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get(`/courseQA/${this.courseId}`);
        this.questions = response.data;
      } catch (error) {
        console.error("獲取問與答數據時出錯", error);
      }
    },
  },
  async submitReply(questionId) {
    try {
      const question = this.questions.find((q) => q.id === questionId);
      if (!question) {
        console.error("找不到該問題");
        return;
      }

      const response = await axios.put(`/api/questions/${questionId}`, {
        reply: question.reply,
      });

      // 更新問題的回答，可能需要在成功回應後更新本地數據
      question.reply = response.data.reply;
    } catch (error) {
      console.error("提交回答時出錯", error);
    }
  },
};
</script>
