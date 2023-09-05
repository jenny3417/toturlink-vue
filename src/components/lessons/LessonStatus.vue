<script setup>
import { ref } from 'vue';

const showModal = ref(false);

</script>

<template>
    <div id="container">
        <div class="modal fade" id="statusModal" tabindex="-1" aria-labelledby="statusModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="statusModalLabel">課程明細</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="deatil-block">
                            <img src="@/assets/lessonImage/person-circle-outline.svg">
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
                                等待確認中
                            </div>
                        </div>
                        <hr>
                        <div style="margin-left: 8px; font-size: x-large;">
                            課程預約請求已送出，老師將在 8/21 18:00前回覆，若不在時間內回覆的話，此課堂預約請求將不成立
                        </div>
                        <br>

                        <hr>
                        <div style="display: flex; flex-direction: row; gap: 24px;">
                            <div
                                style="border: 1px solid brown; width: 100px; margin-left: 8px; text-align: center; color: red;">
                                等待預約中
                            </div>
                            <button type="button"
                                style="width: 100px; background-color: white; border-color: gray; color: gray;"
                                data-bs-toggle="modal" data-bs-target="#lessonModal">取消預約</button>
                        </div>
                    </div>
                </div>
            </div>
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

<style scoped>
.container {
    position: relative;
    top: 100px;
}

.deatil-block {
    display: flex;
    flex-direction: row;
    align-items: center;

}

.deatil-block img {
    width: 64px;
    height: 64px;
}

.text-deatil-block {
    display: flex;
    gap: 320px;

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

}

.lesson-status div {
    font-size: large;
}
</style>