<template setup>
  <div style="margin-left: 100px; display: flex; justify-content: center">
    <div class="container1">
      <div v-for="videoclass in videoclasses" class="video">
        <router-link :to="videoclass.targetUrl">
          <div class="image-container">
            <div class="image-wrapper">
              <div style="padding-left: 30px">
                <h5>{{ videoclass.title }}</h5>
                <!-- <p>{{ videoclass.teacherName }}</p> -->
              </div>
              <div class="overlay">
                <h5 style="font-weight: 800">編輯/管理課程</h5>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoclasses: [
        {
          title: "title 1",
          targetUrl: "/editVideoCourse",
          teacherName: "jack",
        },
        {
          title: "title 2",
          targetUrl: "/editVideoCourse",
          teacherName: "joe",
        },
        {
          title: "title 3",
          targetUrl: "/editVideoCourse",
          teacherName: "jassica",
        },
        {
          title: "title 4",
          targetUrl: "/editVideoCourse",
          teacherName: "julia",
        },
        {
          title: "title 5",
          targetUrl: "/editVideoCourse",
          teacherName: "jordon",
        },
      ],
    };
  },
};
</script>

<style scoped>
.video {
  width: 700px;
  margin: 20px 0;
  /* flex-direction: column; */
  border: 1px solid #eee;
}
.container1 {
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  width: 70vw;
}

.image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 125px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 700px;
  height: 125px;
  background-color: rgba(0, 0, 0, 0.4); /* 透明灰色 */
  opacity: 0; /* 初始不显示 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.video:hover .overlay {
  opacity: 1; /* 鼠标悬停时显示遮罩 */
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
