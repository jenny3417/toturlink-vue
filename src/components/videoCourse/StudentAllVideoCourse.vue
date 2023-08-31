<template setup>
  <div style="width: 100vw">
    <div class="container">
      <div v-for="videoclass in videoclasses" class="video">
        <a :href="videoclass.targetUrl">
          <div class="image-container">
            <div class="image-wrapper">
              <img :src="videoclass.imageUrl" alt="Clickable Image" />
              <div class="overlay">
                <img :src="playIconUrl" alt="Play Icon" class="play-icon" />
              </div>
              <!-- 透明灰色遮罩 -->
            </div>
          </div>

          <h3>{{ videoclass.title }}</h3>
          <p>{{ videoclass.teacherName }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import playIcon from "@/assets/icon/play.png";
export default {
  data() {
    return {
      videoclasses: [
        {
          title: "title 1",
          imageUrl: "../src/assets/videoImg/202202.jpg",
          targetUrl: "http://localhost:5174/videoClassPage",
          teacherName: "jack",
        },
        {
          title: "title 2",
          imageUrl: "../src/assets/videoImg/202202.jpg",
          targetUrl: "http://localhost:5174/videoClassPage",
          teacherName: "joe",
        },
        {
          title: "title 3",
          imageUrl: "../src/assets/videoImg/202202.jpg",
          targetUrl: "http://localhost:5174/videoClassPage",
          teacherName: "jassica",
        },
        {
          title: "title 4",
          imageUrl: "../src/assets/videoImg/202202.jpg",
          targetUrl: "http://localhost:5174/videoClassPage",
          teacherName: "julia",
        },
        {
          title: "title 5",
          imageUrl: "../src/assets/videoImg/202202.jpg",
          targetUrl: "http://localhost:5174/videoClassPage",
          teacherName: "jordon",
        },
      ],
      playIconUrl: playIcon,
    };
  },
};
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
  background-color: rgba(0, 0, 0, 0.5); /* 透明灰色 */
  opacity: 0; /* 初始不显示 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.video:hover .overlay {
  opacity: 1; /* 鼠标悬停时显示遮罩 */
}

.overlay img {
  max-width: 50%; /* 调整图标大小 */
}

.play-icon {
  width: 50px;
  height: 50px;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
