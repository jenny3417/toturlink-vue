<template>
  <div>
    <div class="col-md-9 lessonList" v-for="lesson in orderItem">
      <div class="card mb-4 cardStyle" v-if="lesson.lessonType == 1">
        <div class="row g-0 align-items-center" style="height: 313px">
          <div class="col-md-4">
            <div class="cardImg">
              <img :src="str + lesson.image" class="img-fluid" alt="..." />
            </div>
          </div>
          <div class="col-md-3">
            <div class="card-body cardInfo">
              <h2 class="card-title">{{ lesson.lessonName }}</h2>
              <p class="card-text">{{ lesson.teacherName }}</p>
              <p class="card-text">{{ formatDateTime(lesson.lessonTime) }}</p>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <n-ellipsis style="max-width: 360px" line-clamp="3" :tooltip="false">
                <p class="card-text" v-html="lesson.lessonInfo"></p>
              </n-ellipsis>
            </div>
          </div>
        </div>
        <div class="dropdown-center tools">
          <div data-bs-toggle="dropdown" aria-expanded="false">
            <n-icon size="25">
              <reorder-three-outline />
            </n-icon>
          </div>
          <ul class="dropdown-menu">
            <!-- <li>
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#insertReportModal"
                  @click="select(lesson.lessonId)"
                >
                  檢舉課程</a
                >
              </li> -->
            <li>
              <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#scoreEditModal"
                @click="select(lesson.lessonId)">評論課程</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { ReorderThreeOutline } from "@vicons/ionicons5";
import { ref } from "vue";
import { useToolsStore } from "@/stores/useToolsStore.js";
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from "pinia";
const cartStore = useShoppingCartStore();
const { orderItem } = storeToRefs(cartStore);
const { orderAjax } = cartStore;

const str = ref('data:imagae/png;base64,');
async function fetchData() {
  // 啟用cookie使用者
  await orderAjax(getAllCookies());

  // const { orderItem, refundItem } = storeToRefs(cartStore);
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
const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  // 格式化日期时间为 "YYYY/M/D 下午h:mm:ss" 格式
  const formattedDateTime = date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // 启用12小时制
  });
  return formattedDateTime;
}
fetchData();
const toolsStore = useToolsStore();
const { select } = toolsStore;
</script>
    
<style scoped>
.lessonList {
  width: 50%;
  margin: 0 auto;
  margin-top: 25px;
}

.cardStyle {
  border-radius: 0;
}

.cardImg {
  overflow: hidden;
  margin: 0 auto;
  width: 200px;
  height: 250px;
  border-radius: 15px;
}

.cardImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.cardInfo {
  height: 200px;
  border-right: 0.2px solid #e3d5ca;
}

.tools {
  position: absolute;
  right: 20px;
  top: 30px;
  color: gray;
}
</style>