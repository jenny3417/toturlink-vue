<template>
    <div class="Lesson-view">
        <div class="Lesson">
            <div style="display: flex; flex-direction: column;">
                <div>
                    <div class="delete-div">
                        <button type="button" class="img-button" data-bs-toggle="modal" data-bs-target="#deleteModal"><img
                                src="../assets/lessonImage/wrong.jpg" class="wrong"></button>

                    </div>
                    <div class="lesson-div">
                        課程名稱 : 韓文基礎課程
                    </div>
                </div>
                <br>
                <br>

                <div>
                    <div style="display: flex; justify-content: space-between;">
                        <div class="lesson-div">
                            費用 : 2000
                        </div>
                        <div class="move-btn">
                            <RouterLink to="/lesson/Edit">
                                <button type="button" class="btn">編輯課程</button>
                            </RouterLink>
                            <button type="button" class="btn">查看課程評價</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <deleteLesson></deleteLesson>
</template>
    
<script setup lang='ts'>
import deleteLesson from '@/components/deleteLesson.vue';
</script>
    
<style>
/* 邊框調整 */
.Lesson-view {
    margin-top: 100px;
    margin-left: 5px;
    margin-right: 5px;
    border: 1px solid black;
}

.Lesson {
    margin-left: 3px;
}

.delete-div {
    float: right;

}

/* 課程的字型大小 */
.lesson-div {
    font-size: larger;
}



/* 按鈕 */
.move-btn {
    display: flex;
    gap: 5px;
    position: relative;
    justify-content: flex-end;
    bottom: 8px;
    right: 8px;

}

/* 刪除按鈕 */
.wrong {
    width: 50px;
    height: 50px;
}

/* 按鈕套入圖片 */
.img-button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    font-size: 48px;
}

/* 編輯跟預覽評價按紐 */
.btn {
    border: 1px solid #759df0;
    background-color: #fff;
    cursor: pointer;
    /* width: 110px;
    height: 40px; */
    color: #759df0;
}

.btn:hover {
    background-color: #759df0;
    border: 1px solid #759df0;
    color: #fff;
}

/* 新增按紐 */
.add {
    width: 60px;
    height: 60px;
}
</style>