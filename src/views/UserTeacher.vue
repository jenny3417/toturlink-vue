<template>
  <navbar></navbar>
  <div class="wrap">
    <h1>我的課程</h1>
    <div class="quickLink">
      <router-link class="routerLink" to="/member/teacher/mylesson">
        課程管理</router-link>
      <router-link class="routerLink" to="/member/teacher/exercise">
        試卷管理</router-link>
      <router-link class="routerLink" to="/member/teacher/">
        我的行程</router-link>
      <router-link class="routerLink" to="/member/teacher/TeacherMagVideoCourse/teacherAllVideoCourse">
        影音管理</router-link>
    </div>
  </div>
  <div>
    <router-link to="/member/student"><n-button type="info">切換學生</n-button></router-link>
  </div>
  <router-view></router-view>
</template>

<script setup lang="js">
import Navbar from "@/components/public/Navbar.vue"
</script>

<style scoped>
h1 {
  color: white;
  font-weight: bolder;
  padding-top: 25px;
  padding-left: 10px;
}

.wrap {
  display: block;
  position: relative;
  width: 100%;
  height: 150px;
  /* margin: 0% auto; */
  background-color: rgb(45, 43, 43);
  padding-left: 25%;
  padding-right: 25%;
}



.quickLink {
  position: absolute;
  bottom: 2px;
  font-size: 25px;
  display: flex;
}

.routerLink {
  display: flex;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid rgb(45, 43, 43);
}

.routerLink:hover {
  margin: 10px;
  /* color: rgb(165, 174, 189); */
  font-weight: bold;
  /* transition: all; */
  /* transition-duration: 0.5s; */
  border-bottom: 5px solid rgb(75, 180, 148);
}

.routerLink:focus {
  border-bottom: 5px solid rgb(230, 235, 234);
}

body::-webkit-scrollbar {
  display: none;
}
</style>
