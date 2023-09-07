<template>
  <div class="container">
    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab === "addVideoList" ? "建立您的內容" : "規劃您的課程" }}
      </button>
      <button type="submit" class="demo submit-button">提交以待審核</button>

      <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import addVideoList from "@/components/videoCourse/AddVideoList.vue";
import addCourseInfo from "@/components/videoCourse/AddCourseInfo.vue";

export default defineComponent({
  components: {
    addVideoList,
    addCourseInfo,
  },
  data() {
    return {
      currentTab: "addVideoList",
      tabs: ["addVideoList", "addCourseInfo"],
    };
  },
  created() {
    setTimeout(() => {
      this.currentTab = "addVideoList"; // 直接設置 currentTab
    }, 1000);
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    },
  },
});
</script>
<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  margin-left: 100px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button:active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
.tab {
  margin: 20px auto;
}

.submit-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: black;
  color: white;
  margin-bottom: -1px;
  margin-right: -1px;
  margin-left: 20px;
}
.submit-button:hover {
  background: gray;
}
</style>
