<template setup>
  <div style="width: 100vw">
    <div class="container">
      <div v-for="videoclass in orderItem" class="video">
        <div v-if="videoclass.lessonType==0">
          <router-link :to="{
            name: 'VideoClassPage',
            params: { id: videoclass.lessonId },
          }">
            <div class="image-container">
              <div class="image-wrapper">
                <img :src="`${str}${videoclass.image}`" alt="Clickable Image" />
                <div class="overlay">
                  <img :src="playIconUrl" alt="Play Icon" class="play-icon" />
                </div>
                <!-- 透明灰色遮罩 -->
              </div>
            </div>
            <h4>{{ videoclass.lessonName }}</h4>
            <p>{{ videoclass.teacherName }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import playIcon from "@/assets/icon/play.png";
const img = "../../../src/assets/videoImg/";
import tutorlink from "@/api/tutorlink.js";
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from "pinia";
const str = "data:image/png;base64,";
const cartStore = useShoppingCartStore();
const { orderItem } = storeToRefs(cartStore);
const { orderAjax } = cartStore;
async function fetchData() {
    // 啟用cookie使用者
    await orderAjax(getAllCookies());

    const { orderItem, refundItem } = storeToRefs(cartStore);
}
const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    return cookieObj.UsersId;
}
const playIconUrl = playIcon;
const videoclasses = ref([]);
const getcourse = async () => {
  const response = await tutorlink.get("/VideoLessons");
  console.log(response.data);
  videoclasses.value = response.data;
  console.log("videoclasses:", videoclasses.value);
};
getcourse();
fetchData();
</script>

<style scoped>
@media (min-width: 600px) {
  .container {
    width: 1044px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    margin: none;
  }
}

.video {
  width: 300px;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  height: 200px;
  width: 300px;

  border-radius: 20px;
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  /* 透明灰色 */
  opacity: 0;
  /* 初始不显示 */
  transition: opacity 0.3s ease;
  /* 添加过渡效果 */
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
}

.video:hover .overlay {
  opacity: 1;
  /* 鼠标悬停时显示遮罩 */
}

.overlay img {
  max-width: 50%;
  /* 调整图标大小 */
}

.play-icon {
  width: 50px;
  height: 50px;
}

a {
  text-decoration: none;
  color: inherit;
}</style>
