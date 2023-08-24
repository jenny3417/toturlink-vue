<script setup lang="ts">
import CkEditor from '@/components/CkEditor.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar></Navbar>
    <div class=container>

        <div class="insert-box-block" style="margin: 8px; margin-top: 100px;  padding:16px;">

            <div class="picture-container-block" style="position: relative;">
                <div class="text-input-block" style="display: flex; padding: 16px;">
                    課程名稱 : <input type="text">
                </div>
                <div class="lesson-select-block" style="display: flex; padding: 16px;">
                    課程類別 :
                    <select>
                        <option selected>日文</option>
                        <option>韓文</option>
                        <option>德文</option>
                        <option>英文</option>
                        <option>法文</option>
                    </select>
                </div>
                <div class="picture-update-block">
                    <label for="file-input" class="upload-Image">
                        <img src="../assets/lessonImage/image_icon.png" alt="upload">
                    </label>
                    <input type="file" id="file-input">
                </div>
            </div>


            <div class="textarea-block" style="padding: 16px;">
                課程內容 : <CkEditor></CkEditor>
            </div>
            <div class="text-input-block" style="display: flex; padding: 16px">
                價格 : <input type="text">
            </div>
        </div>
        <div class="button-submit-block">
            <button type="button" class="">取消</button>
            <button type="submit" class="">送出</button>
        </div>


    </div>
</template>

<style>
/* 邊框 */
.insertTable {
    border: 3px solid black;
}

.upload-Image {
    border: 3px solid black;
    display: inline-block;
    cursor: pointer;
}

.upload-Image img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

input[type="file"] {
    display: none;
}

.picture-update-block {
    position: absolute;
    right: 50px;
    top: 0px;
}

.button-submit-block {
    display: flex;
    justify-content: center;
}


.button-submit-block button {
    margin: 8px;
}

/* .text-input-block,
.lesson-select-block,
.textarea-block {
    font-size: xx-large;
} */
</style>