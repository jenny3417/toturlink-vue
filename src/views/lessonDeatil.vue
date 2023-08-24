<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar></Navbar>
    <div class="container">
        <h2>課程明細</h2>
        <!-- <div class="input-deatil-block">
            <div>
                112
            </div>
            <div>
                2023/8/23(四)14:00~14:50
            </div>
            <div>
              
            </div>
        </div> -->
        <div class="deatil-block">
            <img src="../assets/lessonImage/user-avatar.png">
            <div class="text-deatil-block">
                <div>
                    老師
                </div>
                <div>
                    上課時間
                </div>
                <div>
                    課程內容
                </div>
            </div>
        </div>
        <div class="lesson-status">
            <div>
                課程狀態 :
            </div>
            <div style="border: 1px solid black; width: 100px; margin-left: 8px; text-align: center;">
                已預約
            </div>
        </div>
        <hr>
        <div style="margin-left: 48px; font-size: x-large;">
            如需取消課，需在開課前12小時完成取消的動作，如果12小時內想要更改課時，需事先告知，<br>
            並等到上課時間開始後即可回報此問題，『取消預約』將在開課後轉變為『回報問題』
        </div>
        <br>
        <div style="margin-left: 48px;">
            <div style="background-color: #c0c0c0; width: fit-content;">
                上堂課總結
            </div>
            <div style="margin-left: 16px;">
                <b>Good</b>
            </div>
        </div>
        <hr>
        <div style="display: flex; flex-direction: row; gap: 24px;">
            <div style="border: 1px solid red; width: 100px; margin-left: 8px; text-align: center; color: red;">
                即將上課
            </div>
            <button type="button" style="width: 100px; background-color: white; border-color: gray; color: gray;"
                data-bs-toggle="modal" data-bs-target="#lessonModal">取消預約</button>

        </div>
    </div>

    <!-- 互動視窗 -->
    <div class="modal fade" id="lessonModal" tabindex="-1" aria-labelledby="lessonModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">取消預約</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>請說明為甚麼要取消預約，並詢問方便預約的時間</div>
                    <textarea style="width: 100%;"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-light" data-bs-dismiss="modal">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    position: relative;
    top: 100px;
}

.deatil-block {
    display: flex;
    margin-top: 80px;
    margin-left: 48px;
    flex-direction: row;
    align-items: center;

}

.deatil-block img {
    width: 64px;
    height: 64px;
}

.text-deatil-block {
    display: flex;
    gap: 400px;
    margin-left: 16px;
}

.input-deatil-block {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    gap: 320px;
    justify-content: space-around;
    position: relative;
    top: 130px;
}

.lesson-status {
    display: flex;
    position: relative;
    top: 8px;

    margin-left: 48px;
}

.lesson-status div {
    font-size: large;
}
</style>