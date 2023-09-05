<template>
    <div class="info-title">
        <div style="display: flex;">
            <img src="../../assets/icon/user.png">
            <h3>姓名</h3>
        </div>
        <br>
        <h3>個人資料</h3>
        <br>
        <!-- <n-space> -->
        註冊信箱:<n-input v-model:value="responseData.userEmail" type="text" readonly />
        姓名:<n-input v-model:value="value" type="text" />
        生日:<n-input v-model:value="value" type="text" />
        手機:<n-input v-model:value="value" type="text" />
        居住地:<n-input v-model:value="value" type="text" />
        <!-- </n-space> -->
        <hr>
        <p>更改密碼(至少需要8格字元，包含英文及數字)</p>
        <n-space>
            <n-input type="password" show-password-on="click" placeholder="  舊密碼" :maxlength="50" />
            <n-input type="password" show-password-on="click" placeholder="  新密碼" :maxlength="50" />
            <n-input type="password" show-password-on="click" placeholder="  確認密碼" :maxlength="50" />
        </n-space>
        <br>
        <n-button strong secondary>確認修改</n-button>
        <hr>
        <p>第三方帳號登入管理</p>
        <p><img src="../../assets/icon/search.png"> Google登入</p>
        <p><img src="../../assets/icon/facebook.png"> FaceBook登入</p>
        <p><img src="../../assets/icon/apple.png"> Apple登入</p>
        <p><img src="../../assets/icon/line.png"> Line登入</p>
    </div>
</template>
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
// import { onMounted, onBeforeMount } from 'vue'

const responseData = ref({});

console.log("mounted")
const API_URL = `/infomation`
tutorlink.post(API_URL)
    .then((response) => {
        responseData.value = response.data
        console.log(response.data)
    }
    )


</script>
<style scoped>
.info-title {
    display: inline;
    color: black;
    border-color: white;
    vertical-align: middle;
    font-weight: bold;
}

.info-title img {
    width: 36px;
}

.info-title h3 {
    margin: 0;
    padding: 0;
    color: black;
}

.info-title .owenr {
    padding: 5px;
    background-color: rgb(218, 218, 216);
    color: black;
}

.info-title input {
    margin: 5px;
    /* border-radius: 5px; */
    border: 1px solid rgb(14, 13, 13);
    padding: 2px;
    color: black;
}

.info-title p {
    color: black;
}
</style>