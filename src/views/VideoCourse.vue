<template>
  <Navbar></Navbar>
  <div class="black-back">
    <div class="infoLeft">
      <h4 class="courseTitle">課程名稱:{{ 課程名稱 }}</h4>
      <div>
        <p>評分</p>
      </div>
      <p>建立者:{{ 老師名稱 }}</p>
      <p>最近更新日期:{{ 日期 }}</p>
      <p>使用語言:{{ 語言 }}</p>
    </div>
    <div class="spacer2"></div>
    <div class="infoRight">
      <div @click="openVideoModal">
        <video
          id="my-video"
          ref="videoPlayer"
          class="video-js vjs-default-skin"
          muted
          preload="auto"
          :poster="currentVideo.poster"
        >
          <source :src="currentVideo.src" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
  <div class="container-content">
    <div class="contentLeft">
      <div class="willLearn box">
        <h3>您會學到</h3>
        <ul>
          <li v-for="willLearn in willLearnList">
            {{ willLearn.content }}
          </li>
        </ul>
      </div>
      <div class="courseList box">
        <h3>課程章節預覽</h3>
        <div class="playlist">
          <ul>
            <li v-for="(video, index) in videoList" :key="index">
              {{ video.title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="directions box">
        <h3>說明</h3>
        <p>{{ directions[0].content }}</p>
      </div>
      <div class="teacher box">
        <h3>講師</h3>
        <p>講師姓名:{{ teacher[0].teacherName }}</p>
        <p>講師介紹:{{ teacher[0].teacherInfo }}</p>
      </div>
      <div class="score box">
        <h3>{{}}課程評等 {{}}則評等</h3>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="contentRight">
      <div class="pricebox">
        <h4>${{ price }}</h4>
        <div class="price-container">
          <div class="price-top">
            <button type="button" class="btn btn-dark">加入購物車</button>
            <button type="button" class="btn btn-outline-danger">收藏</button>
          </div>
          <div class="price-down">
            <button type="button" class="btn btn-outline-dark">立即購買</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import { ref, onMounted } from "vue";
import Navbar from "../components/public/Navbar.vue";
// import { useModal } from "vue-final-modal";

export default {
  setup() {
    onMounted(() => {
      initVideoSourc();
    });
    const currentVideo = ref({
      src: "src/assets/video/test2.mp4",
      poster: "src/assets/videoImg/2020-01-22.png",
    });
    function initVideoSourc() {
      var myPlayer = videojs("my-video", {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        height: 180,
        width: 350,
        playbackRates: [0.75, 1, 1.25, 1.5, 2],
        controls: true,
        autoplay: false,
      });
    }
    const videoList = ref([
      {
        title: "影片 1",
        src: "src/assets/video/test.mp4",
      },
      {
        title: "影片 2",
        src: "src/assets/video/test2.mp4",
      },
      {
        title: "影片 3",
        src: "src/assets/video/test3.mp4",
      },
    ]);
    const willLearnList = ref([
      {
        classId: 1,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing",
      },
      {
        classId: 2,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing",
      },
      {
        classId: 3,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing",
      },
    ]);
    const directions = ref([
      {
        classId: 1,
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicingLorem ipsum dolor sit amet consectetur adipisicing elit. Porro, iusto. Quisquam, placeat ut vero cumque odit tempore laudantium repudiandae blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, iusto. Quisquam, placeat ut vero cumque odit tempore laudantium repudiandae blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, iusto. Quisquam, placeat ut vero cumque odit tempore laudantium repudiandae blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, iusto. Quisquam, placeat ut vero cumque odit tempore laudantium repudiandae blanditiis?",
      },
    ]);
    const teacher = ref([
      {
        teacherid: 1,
        teacherName: "Lorem",
        teacherInfo:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, iusto. Quisquam, placeat ut vero cumque odit tempore laudantium repudiandae blanditiis?",
      },
    ]);
    const price = ref(2000);
    return {
      currentVideo,
      videoList,
      willLearnList,
      directions,
      teacher,
      price,
    };
  },
  components: { Navbar },
};
</script>

<style scoped>
.black-back {
  background-color: #011627;
  width: 100vw;
  height: 300px;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* align-items: center; */
  padding: 50px 50px;
  color: white;
  margin: 0;
  margin-bottom: 30px;
  justify-content: center;
}
.spacer2 {
  width: 400px;
}
.container-content {
  width: 100vw;
  display: flex;
  /* justify-content: space-around; */
  padding: 0 150px;
  justify-content: center;
}

.box {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
}
.contentLeft {
  margin-bottom: 50px;
  margin-left: 80px;
  margin-right: 20px;
  width: 550px;
}
.spacer {
  min-width: 20px; /* 调整间距的宽度 */
  margin: 0;
}

.contentRight {
  margin-bottom: 50px;
  margin-right: 80px;
}

.pricebox {
  border: 1px solid #ccc;
  padding: 10px 50px;
  position: sticky;
  top: 80px;
  background-color: white; /* 添加背景颜色，以便在覆盖内容时不会显示透明 */
  z-index: 1; /* 确保元素在其他内容上方 */
  width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-top {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 10px;
  justify-content: center;
}

.price-down {
  display: flex;
  justify-content: center;
  width: 100%;
}
.price-down button {
  width: 100%;
}

.btn {
  border-radius: 0;
}

.playlist ul {
  list-style: none;
  margin-bottom: 0;
}
</style>
