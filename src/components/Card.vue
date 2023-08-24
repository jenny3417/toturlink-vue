<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 10" :key="slide">
            <div class="card">
                <div class="card-img">
                    <div style="height: 100%;">
                        <img src="https://www.xa-art.com/Upload/202306/product_2023062610163501.jpg" alt="image">
                    </div>
                </div>
                <div class="card-title">
                    <div class="searchTab"><span>線上課程</span><span>熱門</span></div>
                    <h2>如詩如畫的寫意花卉水彩Loosewatercolor｜傳莉的線上課程</h2>
                    <p style="color: gray;">傳莉</p>
                </div>
                <div class="card-price">
                    <div class="all-price">
                        <div class="origin-price"><span>NT$</span><span>3,600</span></div>
                        <div class="new-price"><span style="font-size: 22px;">NT$</span><span>2,400</span></div>
                    </div>
                </div>
                <div class="card-date">
                    <div><span>1小時15分</span></div>
                </div>

            </div>

        </Slide>

        <template #addons>

        </template>
    </Carousel>
</template>
    
<script setup lang="ts">
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
    // 1024 and up
    1300: {
        itemsToShow: 4,
        snapAlign: 'start',
    },
    1500: {
        itemsToShow: 5,
        snapAlign: 'start',
    },
};
</script>
    
<style scoped>
.card {
    width: 248px;
    box-shadow: 0 0 5px #e5e5e5;
    height: 438px;
    margin-left: 15px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    text-align: left;
}

.card-img {
    height: 35%;
    transition: .3s;
    overflow: hidden;
    position: relative;
}

.card-img>div {
    overflow: hidden;
    height: 100%;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

div {
    font-weight: 400;
    color: #d4a373;
    font-size: 24px;
}

.searchTab {
    margin-bottom: 5px;
}

.searchTab span {
    border: 1px solid gray;
    border-radius: 20px;
    padding: 2px 10px;
    margin-right: 10px;
    font-size: 12px;
}

.card-title {
    height: 30%;
    padding-left: 15px;
    padding-right: 15px;
}

.card-title h2 {
    font-size: 22px;
    color: black;
    font-weight: 700;
}

.card-title p {
    color: gray;
    font-size: 16px;

}

.card-price {
    padding-left: 15px;
    padding-right: 15px;
    text-align: end;
    padding-top: 30px;
    padding-bottom: 10px;
}

.origin-price>span {
    color: gray;
    text-decoration: line-through;
    font-size: 20px;
}

.new-price>span {
    font-weight: 700;
    color: red !important;
    font-size: 28px;
}

.card-date {
    height: 10%;
    padding-left: 15px;
    padding-right: 15px;
}

.card-date div {
    border-top: 1px solid gray;
}

.card-date>div>span {
    font-size: 16px;
    color: gray;
}
</style>