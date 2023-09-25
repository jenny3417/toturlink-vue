<template>
  <Carousel v-bind="settings" :breakpoints="breakpoints">
    <Slide v-for="(lesson, index) in sortData" :id="index">
      <router-link :to="{ name: 'searchsubject', params: { subjectId: lesson.subjectId } }">
        <div class="item" :style="getBackgroundStyle(index)">
          <h4>{{ lesson.subjectContent }}</h4>
        </div>
      </router-link>
    </Slide>
    <template #addons> </template>
  </Carousel>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";
import tutorlink from "../../api/tutorlink.js";
import "vue3-carousel/dist/carousel.css";
import { ref, onMounted } from "vue";

onMounted(async () => {
  try {
    const response = await tutorlink.get("/allSubjects");
    sortData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const imgData = ref([
  { imageUrl: "https://images.unsplash.com/photo-1605066902012-ba3ed05b8a2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fG1hdGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" },
  { imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGh5c2ljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { imageUrl: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGlzdG9yeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { imageUrl: "https://images.unsplash.com/photo-1539632346654-dd4c3cffad8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZW5nbGlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { imageUrl: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxKYXBhbmVzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" },
  { imageUrl: "https://images.unsplash.com/photo-1600779469403-9bf0f2dc3522?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxiaW9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" }
]);
const getBackgroundStyle = (index) => {
  if (imgData.value[index] && imgData.value[index].imageUrl) {
    return `background-image: url('${imgData.value[index].imageUrl}')`;
  }
  return "";
};
const sortData = ref([]);
const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  400: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  770: {
    itemsToShow: 3,
    snapAlign: "center",
  },
  1000: {
    itemsToShow: 4,
    snapAlign: "center",
  },
  // 1024 and up
  1300: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  1500: {
    itemsToShow: 6,
    snapAlign: "start",
  },
};
</script>

<style scoped>
.item {
  text-align: left;
  width: 200px;
  height: 200px;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  flex-direction: column-reverse;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

h4 {
  color: #fff;
  font-weight: 700;
  font-size: 28px;
  margin-top: 0rem;
}
</style>
