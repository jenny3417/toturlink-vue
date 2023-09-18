<template>
  <navbar></navbar>
  <div class="wrap">
    <div style="display: flex;justify-content: space-between">
      <h1>我的學習</h1>
      <input type="button" value="老師" class="btn btn-light" @click="teacher" v-if="changeTeacher">
    </div>
    <div class="quickLink">
      <div>
        <router-link class="routerLink" to="/member/student/studentlesson">
          <div>所有課程</div>
        </router-link>
      </div>
      <div><router-link class="routerLink" to="/member/student/exercise">
          <div>作業清單</div>
        </router-link>
      </div>
      <div>
        <div class="routerLink">
          <CalendarButton></CalendarButton>
        </div>
      </div>
      <div><router-link class="routerLink" to="/member/student/videocourse">
          <div>影音清單</div>
        </router-link>
      </div>
      <div>
        <router-link to="/member/student/apply" class="routerLink" v-if="applyteacher">申請老師</router-link>
      </div>
    </div>
  </div>

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

const applyteacher = ref(true)
const changeTeacher = ref(false)
onMounted(() => {
  const API_URL = `/type`
  const API_URL2 = `/infomation`

  tutorlink.post(API_URL2)
    .then((response) => {
      if (response.data.userName === null || response.data.phone === null || response.data.city === null || response.data.birthday === 0) {
        alert("請到個人資料填寫詳細資料")
        router.push('/member/personal/info')
      }
    }
    )

  tutorlink.post(API_URL)
    .then((response) => {
      // 1學生、2老師
      if (response.data === 2) {
        applyteacher.value = false
        changeTeacher.value = true
      } else if (response.data === 1) {
        changeTeacher.value = false
      }
    }
    )
})

const type = () => {
  const API_URL = `/type`
  tutorlink.post(API_URL)
    .then((response) => {
      if (response.data === 3) {
        alert("請到管理員頁面~")
        router.push('/manager')
      }
    }
    )
}
type()

const teacher = () => {
  router.push('/member/teacher')
}
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

.btn {
  height: 30px;
  margin-top: 10px;
  margin-right: 90px;
  line-height: 17px;
}
</style>
