<script setup>
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"






</script>
<template>
  <n-message-provider>
    <n-dialog-provider> <!-- 對話框 -->
      <n-notification-provider> <!-- 通知 -->
        <router-view></router-view>
      </n-notification-provider>
    </n-dialog-provider>
  </n-message-provider>
  <n-back-top :right="20" />
</template>

<style>
/* 滾動條隱藏 */
html {
  overflow: -moz-hidden-unscrollable;
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
</style>
