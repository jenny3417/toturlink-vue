<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
            <div class="card scoreCard p-4" width="278px">
                <div class="d-flex">
                    <div class="text-start">
                        <h2 class="mb-3">課程名稱</h2><span class="scoreDate">2023/8/24</span><span v-for="rating in  ratings "
                            :key="rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold"
                                class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <article class="my-3 text-start">
                    這門課程深入挖掘了現代文學的精髓，讓我對各種文學流派有更深入的理解。教授充滿激情，引導我們探索不同作品背後的意義，雖然有時候閱讀量稍大，但收穫良多。這門課程深入挖掘了現代文學的精髓，讓我對各種文學流派有更深入的理解。教授充滿激情，引導我們探索不同作品背後的意義，雖然有時候閱讀量稍大，但收穫良多。
                </article>
                <div class="text-end">
                    <div>
                        <span>學生</span>
                        <p class="studentName">Jhon</p>
                    </div>
                </div>
            </div>

        </Slide>

        <template #addons>

        </template>
    </Carousel>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue'
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
</script>
    
<style scoped>
.scoreCard {
    margin: 20px;
}

.scoreDate {
    font-size: 18px;

    margin-right: 20px;
}
</style>