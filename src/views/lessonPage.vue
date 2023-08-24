<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar></Navbar>
    <div class="container">

        <div class="Lesson-view">
            <div class="Lesson">
                <div class="delete-div">
                    <button type="button" class="img-button" data-bs-toggle="modal" data-bs-target="#deleteModal"><img
                            src="../assets/lessonImage/wrong.jpg" class="wrong"></button>

                </div>
                <span class="lesson-span">
                    課程名稱 : 韓文基礎課程
                </span>
                <br>
                <br>
                <br>
                <span class="lesson-span">
                    費用 : 2000
                </span>
                <div class="move-btn">
                    <button type="button" class="btn">編輯課程</button><button type="button" class="btn">查看課程評價</button>
                </div>

            </div>
        </div>
        <div style="text-align: center;margin-top: 5px; ">
            <RouterLink to="/lesson/insertLesson">
                <button type="submit" class="img-button"><img src="../assets/lessonImage/plus.png" class="add">
                    新增課程</button>
            </RouterLink>
        </div>
    </div>

    <!-- 刪除互動視窗 -->
    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">警告 ! 你正要刪除這門課程</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    你真的要刪除這門課程嗎
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">刪除</button>
                </div>
            </div>
        </div>
    </div>
</template>

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
.lesson-span {
    font-size: larger;
}



/* 按鈕 */
.move-btn {
    display: flex;
    gap: 5px;
    position: relative;
    top: -5px;
    right: 5px;
    float: right;
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
    border: 1px solid black;
    background-color: #fff;
    cursor: pointer;
    /* width: 110px;
    height: 40px; */
}

/* 新增按紐 */
.add {
    width: 60px;
    height: 60px;
}
</style>