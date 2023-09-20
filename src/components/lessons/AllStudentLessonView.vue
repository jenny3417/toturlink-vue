<template>
    <div>
        <div class="col-md-9 lessonList" >
        <!-- <div class="col-md-9 lessonList" v-for="lesson in resultList"> -->
        <div class="card mb-4 cardStyle">
          <div class="row g-0 align-items-center" style="height: 313px">
            <div class="col-md-4">
              <div class="cardImg">
                <!-- <img
                  :src="`${str}${lesson.lessonUrl}`"
                  class="img-fluid"
                  alt="..."
                /> -->
                <img
                  src="https://picsum.photos/200/150?random=1"
                  class="img-fluid"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-body cardInfo">
                <!-- <h2 class="card-title">{{ lesson.lessonName }}</h2>
                <p class="card-text">{{ lesson.teacherName }}</p>
                <p class="card-text">{{ lesson.time }}</p> -->
                <h2 class="card-title">lessonName</h2>
                <p class="card-text">teacherName</p>
                <p class="card-text">lesson.time</p>
              </div>
            </div>
            <!-- <div class="col-md-5">
              <div class="card-body">
                <n-ellipsis
                  style="max-width: 360px"
                  line-clamp="3"
                  tooltip="false"
                >
                  <p class="card-text" v-html="lesson.lessonInfo"></p>
                </n-ellipsis>
              </div>
            </div> -->
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
                <a
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#scoreEditModal"
                  @click="select(lesson.lessonId)"
                  >評論課程</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup >
import tutorlink from "@/api/tutorlink.js";
import {  ReorderThreeOutline } from "@vicons/ionicons5";
import { ref, onMounted, computed } from "vue";
import { useToolsStore } from "@/stores/useToolsStore.js";
import { storeToRefs } from "pinia";


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