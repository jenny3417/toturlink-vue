<template>
    <h3>基本資料</h3>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">姓名</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="idcard" autocomplete="off">
        <label for="floatingInput">身分證</label>
    </div>
    <input type="file" class="form-control">
    <hr>
    <button class="btn btn-light" type="button" @click="applyteacher">申請</button>
</template >
  
<script setup="js">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import tutorlink from '@/api/tutorlink.js';
const router = useRouter();
const name = ref('');
const idcard = ref('');

const applyteacher = () => {
    const API_URL = '/apply'
    const data = {
        name: name.value,
        idcard: idcard.value,
    }
    console.log(data)
    // 請求
    if (data.name != '' && data.idcard != '') {
        tutorlink.post(API_URL, data).then((response) => {
            console.log(response.data)
        })
    } else {
        // 錯誤處理
        console.log('錯誤')
        alert('請填寫完整')
    }
}
</script>
<style scoped>
label {
    color: black;
    font-weight: bold;
}
</style>
