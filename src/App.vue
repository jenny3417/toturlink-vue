<script setup>
import { ref, computed, onMounted } from 'vue'
import { IosChatboxes } from "@vicons/ionicons4"
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import chatRoom from '@/components/webSocketChatRoom/ChatView.vue'
// import loading from './components/public/LoadingComponents.vue'
// const loadingtype = ref(true);

// onMounted(() => {
//   setTimeout(() => {
//     loadingtype.value = false;
//   }, 1000);
// });

import favoriateListButton from "@/components/favoriate/FavoriateListButton.vue";
import ReportButton from "@/components/report/ReportButton.vue";
import scoreEdit from "@/components/score/ScoreEdit.vue";
import rightmenu from '@/components/public/Rightmenu.vue';

const scrollY = ref(0)
const showToTop = computed(() => {
  if (scrollY.value >= 100) return true
  return false
})
window.addEventListener("scroll", () => {
  scrollY.value = window.scrollY
})



</script>
<template>
  <!-- <div v-show="loadingtype" class="loading-overlay">
    <loading></loading>
  </div> -->
  <div>
    <n-message-provider>
      <n-dialog-provider> <!-- 對話框 -->
        <n-notification-provider placement="bottom-right" max="8"> <!-- 通知 -->
          <router-view></router-view>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
    <!-- <n-back-top :right="20" /> -->


    <n-popover trigger="click" content-style="padding: 0;" header-style="padding: 0;" placement="left"
      style="width: 700px; height: 500px; padding: 0; border-radius: 5px;">
      <template #trigger>
        <div class="chatRoom">
          <n-icon size="30">
            <IosChatboxes />
          </n-icon>
        </div>
      </template>
      <chatRoom />
    </n-popover>




    <!-- 回頂部按鈕 -->
    <div class="toTop" v-show="showToTop" @click="showToTop = false"
      onclick="window.scroll({ top: 0, left: 0, behavior: 'smooth' });">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
        <path d="M256,217.9L383,345c9.4,9.4,24.6,9.4,33.9,0c9.4-9.4,9.3-24.6,0-34L273,167c-9.1-9.1-23.7-9.3-33.1-0.7L95,310.9
	c-4.7,4.7-7,10.9-7,17c0,6.1,2.3,12.3,7,17c9.4,9.4,24.6,9.4,33.9,0L256,217.9z"></path>
      </svg>
    </div>
  </div>
  <favoriate-list-button></favoriate-list-button>
  <report-button></report-button>
  <score-edit></score-edit>
</template>

<style>
/* 滾動條隱藏 */
html {
  /* overflow: -moz-hidden-unscrollable; */
  scrollbar-width: none;
  height: 100%;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  height: 100%;
  width: calc(100vw + 18px);
  overflow: auto;
  background-color: #e7ecef;
}

/* reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* color: #9d8189; */
}

a {
  text-decoration: none;
}

ol,
ul {
  padding-left: 0;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 0;
}

.toTop {
  position: fixed;
  right: 20px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid #a2a2a2;
  background-color: #fff;
  transition: all 0.3s;
}

.toTop:hover {
  box-shadow: 0 0 5px #626262;
  transition: all 0.3s;
}

.toTop:active {
  background-color: #ebebeb;
  box-shadow: 0 0 5px #626262;
  transition: all 0.3s;
}

.chatRoom {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  padding: 7px 0 0 9px;
  border: 1px solid #a2a2a2;
  background-color: #fff;
  transition: all 0.3s;
}

.chatRoom:hover {
  box-shadow: 0 0 5px #626262;
  transition: all 0.3s;
}

.chatRoom:active {
  background-color: #ebebeb;
  box-shadow: 0 0 5px #626262;
  transition: all 0.3s;
}


.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #403d39ac;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
