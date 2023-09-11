<template>
    <h3>申請成為老師</h3>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">姓名</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" v-model="idNumber" autocomplete="off"
            @blur="validateIdNumber" placeholder="">
        <label for="floatingInput">身分證</label>
        <p v-if="isValid" class="success-text">身分證格式正確</p>
        <p v-else-if="idNumber.length > 0" class="warning-text">身分證長度不足或格式錯誤</p>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">來自哪個國家</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">主要授課科目</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">您會說哪些語言</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">是否有教學經驗</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">您目前的工作狀態</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">預期每週可授課時數</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">期望在土魠林克達成多少月收入目標</label>
    </div>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
        <label for="floatingInput">提供自己的優勢有利更快通審核</label>
    </div>

    <hr>
    <button class="btn btn-light" type="button" @click="applyteacher">申請</button>
</template >
  
<script setup="js">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import tutorlink from '@/api/tutorlink.js';
const router = useRouter();
const name = ref('');
const idNumber = ref('');
const isValid = ref(false);

const validateIdNumber = () => {
    const reg = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/;
    if (reg.test(idNumber.value)) {
        const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  //把A取代成10,把B取代成11...的作法
        const ct = ["10", "11", "12", "13", "14", "15", "16", "17", "34", "18", "19", "20", "21",
            "22", "35", "23", "24", "25", "26", "27", "28", "29", "32", "30", "31", "33"];
        let i = s.indexOf((idNumber.value).charAt(0));
        let tempuserid = ct[i] + (idNumber.value).substr(1, 9); //若此身份證號若是A123456789=>10123456789
        let num = tempuserid.charAt(0) * 1;
        for (i = 1; i <= 9; i++) {
            num = num + tempuserid.charAt(i) * (10 - i);
        }
        num += tempuserid.charAt(10) * 1;

        if ((num % 10) == 0) {
            return isValid.value = true;
        }
        else {
            return isValid.value = false;
        }
    }
    else {
        return isValid.value = false;
    }
};

// const applyteacher = () => {
//     const API_URL = '/apply'
//     const data = {
//         name: name.value,
//         idcard: idcard.value,
//     }
//     console.log(data)
//     // 請求
//     if (data.name != '' && data.idcard != '') {
//         tutorlink.post(API_URL, data).then((response) => {
//             console.log(response.data)
//         })
//     } else {
//         // 錯誤處理
//         console.log('錯誤')
//         alert('請填寫完整')
//     }
// }

</script>
<style scoped>
label {
    color: black;
    font-weight: bold;
}

.warning-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.success-text {
    color: green;
    font-size: 12px;
    margin-top: 5px;
}
</style>
