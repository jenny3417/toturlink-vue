<template>
  <navbar></navbar>
  <div class="wrap">
    <h1>我的學習</h1>
    <div class="quickLink">
      <div>
        <router-link class="routerLink" to="/member/student/studentlesson">
          <!-- <img src="../assets/icon/lesson.png" style="width: 30px" /> -->
          <div>所有課程</div>
        </router-link>
      </div>
      <!-- <div>
        <router-link class="routerLink" to="/member/student/favoriate" @click="">
          <img src="../assets/icon/favorite.png" alt="" style="width: 30px" />
          <div>收藏清單</div>
        </router-link>
      </div> -->
      <div><router-link class="routerLink" to="/member/student/exercise">
          <!-- <img src="../assets/icon/blackboard.png" style="width: 30px" /> -->
          <div>作業清單</div>
        </router-link>
      </div>
      <div>
        <div class="routerLink">
          <!-- <img src="../assets/icon/schedule.png" alt="" style="width: 30px" /> -->
          <CalendarButton></CalendarButton>
        </div>
      </div>
      <div><router-link class="routerLink" to="/member/student/videocourse">
          <!-- <img src="../assets/icon/youtube.png" style="width: 30px" /> -->
          <div>影音清單</div>
        </router-link>
      </div>
      <div>
        <router-link to="/member/student/apply" class="routerLink" v-if="applyteacher">申請老師</router-link>
      </div>
    </div>
  </div>
  <router-link to="/member/teacher" v-if="type"><n-button type="info">切換老師</n-button></router-link>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="js">
import Navbar from "@/components/public/Navbar.vue"
import CalendarButton from "../components/calendar/CalendarButton.vue";
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

const type = ref(false);
const applyteacher = ref(true)
onMounted(() => {
  const API_URL = `/type`
  const API_URL2 = `/infomation`

  tutorlink.post(API_URL2)
    .then((response) => {
      if (response.data.userName === null || response.data.phone === null || response.data.city === null || response.data.birthday === 0) {
        alert("請到個人資料填寫詳細資料")
      }
    }
    )

  tutorlink.post(API_URL)
    .then((response) => {
      if (response.data === 2) {
        type.value = true
        applyteacher.value = false
      }
    }
    )
})
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

.head {
  max-width: 50px;
  max-height: 50px;
  /* border-radius: 50%;
  border: solid;
  border-width: 3px;
  border-color: #fff;
  background-color: white; */
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
