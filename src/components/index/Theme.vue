<template>
  <Carousel v-bind="settings" :breakpoints="breakpoints">
    <Slide v-for="(lesson, index) in sortData" :id="index">
      <router-link
        :to="{ name: 'searchsubject', params: { subjectId: lesson.subjectId } }"
      >
        <div
          class="item"
          :style="'background-image: url(' + imgData[index].imageUrl + ')'"
        >
          <h4>{{ lesson.subjectContent }}</h4>
        </div></router-link
      >
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
    console.log("sortData:", sortData.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const imgData = ref([
  { imageUrl: "https://picsum.photos/200/200?random=1" },
  { imageUrl: "https://picsum.photos/200/200?random=2" },
  { imageUrl: "https://picsum.photos/200/200?random=3" },
  { imageUrl: "https://picsum.photos/200/200?random=4" },
  { imageUrl: "https://picsum.photos/200/200?random=5" },
  { imageUrl: "https://picsum.photos/200/200?random=6" },
  { imageUrl: "https://picsum.photos/200/200?random=7" },
]);

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
}

h4 {
  color: #fff;
  font-weight: 400;
  font-size: 1.4375rem;
  margin-top: 0rem;
}
</style>
