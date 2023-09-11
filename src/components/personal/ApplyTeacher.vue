<template>
    <div class="apply">
        <br>
        <div v-if="nametype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">姓名</label>
            <n-progress type="line" :percentage="10" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="idcardtype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" v-model="idNumber" autocomplete="off"
                @blur="validateIdNumber" placeholder="">
            <label for="floatingInput">身分證</label>
            <p v-if="isValid" class="success-text">身分證格式正確</p>
            <p v-else-if="idNumber.length > 0" class="warning-text">身分證長度不足或格式錯誤</p>
            <n-progress type="line" :percentage="20" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="countrytype">
            <select v-model="selectedCountry" class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option v-for="country in countries" :value="country.name">{{ country.name }}</option>
            </select>
            <n-progress type="line" :percentage="30" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="lessontype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">主要授課科目</label>
            <n-progress type="line" :percentage="40" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="languagetype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">您會說哪些語言</label>
            <n-progress type="line" :percentage="50" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="teachtype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">是否有教學經驗</label>
            <n-progress type="line" :percentage="60" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="jobtype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">您目前的工作狀態</label>
            <n-progress type="line" :percentage="70" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="hourtype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">預期每週可授課時數</label>
            <n-progress type="line" :percentage="80" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="salrytype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">期望在土魠林克達成多少月收入目標</label>
            <n-progress type="line" :percentage="90" :indicator-placement="'inside'" processing />
        </div>
        <div v-if="advantagetype" class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name" autocomplete="off">
            <label for="floatingInput">提供自己的優勢有利更快通審核</label>
            <n-progress type="line" :percentage="100" :indicator-placement="'inside'" processing />
        </div>
        <div class="buttonset">
            <button class="btn btn-dark" type="button" @click="back">返回</button>
            <button v-if="buttoncontinues" class="btn btn-dark" type="button" @click="continues">繼續</button>
            <button v-if="applybutton" class="btn btn-dark" type="button" @click="applyteacher">申請</button>
        </div>
        <hr>
    </div>
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

// const selectedCountry = ref("countries")
const selectedCountry = ref('請選擇國家')
const countries = [{ name: '請選擇國家' },
{ name: '中國' },
{ name: '印度' },
{ name: '美國' },
{ name: '印度尼西亞' },
{ name: '巴基斯坦' },
{ name: '巴西' },
{ name: '尼日利亞' },
{ name: '孟加拉國' },
{ name: '俄羅斯' },
{ name: '墨西哥' },
{ name: '日本' },
{ name: '埃塞俄比亞' },
{ name: '菲律賓' },
{ name: '埃及' },
{ name: '越南' },
{ name: '剛果民主共和國' },
{ name: '土耳其' },
{ name: '伊朗' },
{ name: '德國' },
{ name: '泰國' },
{ name: '英國' },
{ name: '法國' },
{ name: '意大利' },
{ name: '南非' },
{ name: '緬甸' },
{ name: '坦桑尼亞' },
{ name: '韓國' },
{ name: '哥倫比亞' },
{ name: '肯尼亞' },
{ name: '西班牙' },
{ name: '阿根廷' },
{ name: '烏克蘭' },
{ name: '烏幹達' },
{ name: '波蘭' },
{ name: '阿爾及利亞' },
{ name: '伊拉克' },
{ name: '蘇丹' },
{ name: '烏茲別克斯坦' },
{ name: '阿富汗' },
{ name: '摩洛哥' },
{ name: '沙特阿拉伯' },
{ name: '秘魯' },
{ name: '馬來西亞' },
{ name: '委內瑞拉' },
{ name: '烏干達' },
{ name: '尼泊爾' },
{ name: '摩洛哥' },
{ name: '加納' },
{ name: '委內瑞拉' },
{ name: '柬埔寨' },
{ name: '塞內加爾' },
{ name: '烏幹達' },
{ name: '尼泊爾' },
{ name: '摩洛哥' },
{ name: '加納' },
{ name: '委內瑞拉' },
{ name: '柬埔寨' },
{ name: '塞內加爾' },
{ name: '台灣' }
]

// 初始化v-if值
const nametype = ref(true)
const idcardtype = ref(false)
const countrytype = ref(false)
const lessontype = ref(false)
const languagetype = ref(false)
const teachtype = ref(false)
const jobtype = ref(false)
const hourtype = ref(false)
const salrytype = ref(false)
const advantagetype = ref(false)
const buttoncontinues = ref(true)
const applybutton = ref(false)

const types = [
    nametype,
    idcardtype,
    countrytype,
    lessontype,
    languagetype,
    teachtype,
    jobtype,
    hourtype,
    salrytype,
    advantagetype
];

// 繼續
const continues = () => {
    console.log(types.length)
    if (types[types.length - 1].value !== true) {
        for (let i = 0; i < types.length; i++) {
            if (types[i].value === true) {
                types[i].value = false;
                if (i < types.length - 1) {
                    types[i + 1].value = true;
                }
                break; // 退出循環
            }
        }
    } else {
        buttoncontinues.value = false;
        applybutton.value = true
    }
}
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
.apply {
    width: 50%;
    margin: 0 auto;
}

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

.buttonset {
    display: flex;
    justify-content: space-between
}
</style>
