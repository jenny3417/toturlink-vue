<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="insert-box-block" style="margin: 8px; margin-top: 100px; padding: 16px;">
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
                        <img v-if="uploadedImage" :src="uploadedImage" alt="upload">
                        <img v-else src="../assets/lessonImage/image-outline.svg" alt="upload">
                    </label>
                    <input type="file" id="file-input" @change="handleFileUpload">
                    <div style="font-size: large;">請按此上傳圖片</div>
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
            <RouterLink to="/lesson">
                <button type="button" class="cancel">取消</button>
            </RouterLink>
            <RouterLink to="/lesson">
                <button type="button" class="upload">送出</button>
            </RouterLink>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import CkEditor from '../components/lessons/CkEditor.vue';
import Navbar from '../components/public/Navbar.vue';

const uploadedImage = ref<string | null>(null); // 声明 uploadedImage 的类型为 string 或 null

const handleFileUpload = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; // 使用可选链（optional chaining）来安全地获取文件
    if (file) {
        uploadedImage.value = URL.createObjectURL(file);
    }
};

onBeforeUnmount(() => {
    if (uploadedImage.value) {
        URL.revokeObjectURL(uploadedImage.value);
    }
});
</script>
  
<style>
/* 邊框 */
.insertTable {
    border: 3px solid black;
}

.upload-Image {
    /* border: 3px solid black; */
    display: inline-block;
    cursor: pointer;
}

.upload-Image img {
    width: 120px;
    height: 120px;
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

.upload {
    border: 1px solid green;
    color: green;
    background-color: #fff;
    width: 120px;
    height: 60px;
    border-radius: 10%;
}

.upload:hover {
    border: 1px solid green;
    color: #fff;
    background-color: green;
}

.upload:active {
    border: 1px solid green;
    color: #fff;
    background-color: rgb(24, 83, 24);
}

.cancel {
    border: 1px solid red;
    color: red;
    background-color: #fff;
    width: 120px;
    height: 60px;
    border-radius: 10%;
}

.cancel:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}

.cancel:active {
    border: 1px solid red;
    color: #fff;
    background-color: rgb(107, 16, 16);
}
</style>