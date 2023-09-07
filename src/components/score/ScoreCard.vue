<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="data in datas" :key="data">
            <div class="card scoreCard p-4" width="278px">
                <div class="d-flex">
                    <div class="text-start">
                        <h2 class="mb-3">{{ data.lesson.lessonName }}</h2><span class="scoreDate">{{
                            formatDate(data.createTime) }}</span><span v-for="rating in  data.rate " :key="rating"
                            class="rateStyle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold"
                                class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <article class="my-3 text-start">
                    {{ data.rateContent }}
                </article>
                <div class="text-end student">
                    <div>
                        <span>學生</span>
                        <p class="studentName"> {{ data.users.userDetailUserName }}</p>
                    </div>
                </div>
            </div>

        </Slide>

        <template #addons>

        </template>
    </Carousel>
</template>
    
<script setup >
import { ref } from 'vue'
import tutorlink from '../../api/tutorlink'
import { format } from 'date-fns';


const ratings = ref(5);
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
const settings = {
    itemsToShow: 1,
    snapAlign: 'center',
};

const breakpoints = {
    // 700px and up
    400: {
        itemsToShow: 1,
        snapAlign: 'center',
    },
    770: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    1000: {
        itemsToShow: 3,
        snapAlign: 'center',
    },
};


const datas = ref([])


const fetchData = async () => {
    try {
        const response = await tutorlink.get("/comment");
        datas.value = response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return format(parsedDate, 'yyyy/MM/dd');
};

const formatTags = (str) => {
    return str.split(',')
}
fetchData()
</script>
    
<style scoped>
.scoreCard {
    margin: 20px;
    min-height: 400px;
    /* justify-content: space-between */
}

.scoreDate {
    font-size: 18px;
    margin-right: 20px;
}

.student {
    margin-top: auto;
}

.rateStyle {
    margin: 2px;
}

.studentName {
    margin-bottom: 0;
}
</style>