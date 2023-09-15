<template>
  <div style="margin-left: 20px">
    <div class="" style="margin-bottom: 20px">
      <button
        class="btn btn-dark"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        新增公告
      </button>
      <!-- 彈出視窗 -->
      <div
        class="modal fade modal-lg"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">新增公告</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <!-- 退費彈出視窗內容 -->
            <div class="modal-body">
              <form
                @submit.prevent="createAnnouncement"
                style="display: flex; flex-direction: column; width: 500px"
              >
                <label for="title">標題：</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  v-model="newPost.title"
                  required
                />

                <label for="content">內容：</label>
                <textarea
                  class="form-control"
                  rows="3"
                  id="content"
                  v-model="newPost.postContent"
                ></textarea>

                <label for="course">選擇課程：</label>
                <select
                  id="course"
                  v-model="selectedCourse"
                  class="form-control"
                  required
                >
                  <option value="" disabled selected>您的課程</option>
                  <option
                    v-for="course in videoclasses"
                    :key="course.lessonId"
                    :value="course.lessonId"
                  >
                    {{ course.lessonName }}
                  </option>
                </select>
                <!-- 彈出視窗的確認與取消 -->
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    取消
                  </button>
                  <button
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                    type="submit"
                    @click="addPost"
                  >
                    發布公告
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>您發佈的公告({{ postCount }})</h3>
    <div v-for="post in postList">
      <h6>{{ post.title }}</h6>
      <p>{{ post.postContent }}</p>
      <p @click="confirmDeletePost(post.lessonPostId)" class="delete-icon">X</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tutorlink from "@/api/tutorlink.js";

const videoclasses = ref([]);

// 添加数据和方法
const newPost = ref({
  title: "",
  postContent: "",
});

const selectedCourse = ref("");
const postList = ref([]);
const postCount = ref("");

const getcourse = async () => {
  const response = await tutorlink.get("/VideoLessons");
  console.log(response.data);
  videoclasses.value = response.data;
  console.log("標題", videoclasses.value[0].lessonName);
};
getcourse();
// 添加创建公告的方法
const addPost = async () => {
  try {
    console.log(newPost.value);
    const lessonId = selectedCourse.value;
    const response = await tutorlink.post(
      `/coursePost/${lessonId}`,
      JSON.stringify(newPost.value),
      { headers: { "Content-Type": "application/json;charset=UTF-8" } }
    );

    console.log("新增公告成功", response.data);
    // 清空表单字段
    newPost.value.title = "";
    newPost.value.postContent = "";
    selectedCourse.value = "";
    getPost();
  } catch (error) {
    console.error("新增公告時錯誤", error);
  }
};

const getPost = async () => {
  try {
    const response = await tutorlink.get("/coursePostByUser");
    postList.value = response.data;
    console.log("公告列表:", response.data);
    postCount.value = postList.value.length;
  } catch (error) {
    console.error("獲取公告時錯誤", error);
  }
};
getPost();

const confirmDeletePost = async (lessonPostId) => {
  const userConfirmed = window.confirm("確定要刪除嗎?");
  if (userConfirmed) {
    deletePost(lessonPostId);
  } else {
  }
};

const deletePost = async (lessonPostId) => {
  await tutorlink.delete(`/coursePost/${lessonPostId}`);
  console.log("公告Id:", lessonPostId, "已刪除");
  getPost();
};
</script>

<style scoped>
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
