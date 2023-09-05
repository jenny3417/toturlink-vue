<template>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                精選主題
            </div>
        </div>
        <theme class="wow animate__slideInUp"></theme>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                線上課程
            </div>
        </div>
        <card class="wow animate__slideInUp"></card>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                影音課程
            </div>
        </div>
        <card class="wow animate__slideInUp"></card>
    </div>
    <div class="section_title" style="height: auto;">
        <div class="title">
            <div class="item-title">
                最新開課
            </div>
        </div>
        <card class="wow animate__slideInUp"></card>
    </div>
    <div class="section_title scoreSection" style="height: auto;">
        <div class="title justify-content-center">
            <div class="item-title">
                好評推薦
            </div>
        </div>
        <scorecard class="wow animate__slideInUp"></scorecard>
    </div>
</template>
    
<script setup>
import theme from './Theme.vue';
import card from "./Card.vue"
import scorecard from '../score/ScoreCard.vue';

import { ref } from 'vue'
const ratings = ref(5);

</script>
    
<style scoped>
.title {
    display: flex;
    margin-top: 40px;
    margin-bottom: 10px;
}

.item-title {
    box-sizing: border-box;
    padding: 8px 16px;
    font-size: 30px;
    font-weight: 500;
    color: #9d8189;
    border: none;
}

.scoreSection {
    margin: 0 auto;
    width: 80%;
}
</style>