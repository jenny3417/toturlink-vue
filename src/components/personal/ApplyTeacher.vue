<template>
    <div class="apply" v-if="checkstate">
        <h3>成為老師</h3>
        <hr>
        <div v-if="first" class="form-floating mb-3">
            <p>姓名</p>
            <input type="text" class="" v-model="name" autocomplete="off" placeholder="請輸入姓名">
            <p>身分證</p>
            <input type="text" class="" v-model="idNumber" autocomplete="off" @blur="validateIdNumber" placeholder="請輸入身分證">
            <p v-if="isValid" class="success-text">身分證格式正確</p>
            <p v-else-if="idNumber.length > 0" class="warning-text">身分證長度不足或格式錯誤</p>
            <p>來自哪裡</p>
            <select v-model="selectedCountry">
                <option v-for="country in countries" :value="country.name">{{ country.name }}</option>
            </select>
            <p>主要授課科目</p>
            <select v-model="selectedlessons">
                <option v-for="lesson in lessons " :value="lesson.language">{{ lesson.language }}</option>
            </select>
            <p>您會說哪些語言(可複選)</p>
            <div>
                <label v-for="(lang, index) in languages" :key="index">
                    <input type="checkbox" v-model="selectlang" :value="lang.language"> {{ lang.language }}
                </label>
            </div>
        </div>
        <div v-if="second" class="form-floating mb-3">
            <p>是否有教學經驗</p>
            <select v-model="selectexp">
                <option v-for="texp in teachexp" :value="texp.exp">{{ texp.exp }}</option>
            </select>
            <p>您目前的工作狀態</p>
            <select v-model="selectjobstate">
                <option v-for="job in jobs" :value="job.state">{{ job.state }}</option>
            </select>
            <p>預期每周可授課時數</p>
            <select v-model="selecthours">
                <option v-for="hour in hours" :value="hour.hours">{{ hour.hours }}</option>
            </select>
            <p>期望達成多少月收目標</p>
            <select v-model="selectsalary">
                <option v-for="sry in salary" :value="sry.salary">{{ sry.salary }}</option>
            </select>
            <p>提供自己的優勢有利通過審核，請輸入至少10字元</p>
            <input type="text" v-model="selectgood" autocomplete="off" placeholder="ex: TOEFL 115、證照、留學4年">
        </div>
        <hr>
        <div class="buttonset">
            <button v-if="backbtn" class="btn btn-dark" type="button" @click="back">返回</button>
            <button v-if="buttoncontinues" class="btn btn-dark" type="button" @click="continues">繼續</button>
            <button v-if="applybutton" class="btn btn-dark" type="button" @click="applyteacher">申請</button>
        </div>
    </div>
    <div class="apply" v-if="state">
        <h1>審核中</h1>
    </div>
</template >
  
<script setup="js">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import tutorlink from '@/api/tutorlink.js';
const router = useRouter();

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

const lessons = [
    { language: '請選擇授課科目' },
    { language: '中文' },
    { language: '英文' },
    { language: '西班牙文' },
    { language: '阿拉伯文' },
    { language: '俄文' },
    { language: '法文' },
    { language: '德文' },
    { language: '日文' },
    { language: '葡萄牙文' },
    { language: '意大利文' },
    { language: '荷蘭文' },
    { language: '韓文' },
    { language: '土耳其文' },
    { language: '希臘文' },
    { language: '瑞典文' },
    { language: '丹麥文' },
    { language: '挪威文' },
    { language: '芬蘭文' },
    { language: '波蘭文' },
    { language: '匈牙利文' },
    { language: '捷克文' },
    { language: '斯洛伐克文' },
    { language: '俄羅斯文' },
    { language: '印度尼西亞文' },
    { language: '泰文' },
    { language: '越南文' },
    { language: '韓文' },
    { language: '阿拉伯文' },
    { language: '希伯來文' },
    { language: '菲律賓文' }
];

const languages = [
    { id: 1, language: '中文' },
    { id: 2, language: '英文' },
    { id: 3, language: '西班牙文' },
    { id: 4, language: '阿拉伯文' },
    { id: 5, language: '俄文' },
    { id: 6, language: '法文' },
    { id: 7, language: '德文' },
    { id: 8, language: '日文' },
    { id: 9, language: '葡萄牙文' },
    { id: 10, language: '意大利文' },
    { id: 11, language: '荷蘭文' },
    { id: 12, language: '韓文' },
    { id: 13, language: '土耳其文' },
    { id: 14, language: '希臘文' },
    { id: 15, language: '瑞典文' },
    { id: 16, language: '丹麥文' },
    { id: 17, language: '挪威文' },
    { id: 18, language: '芬蘭文' },
    { id: 19, language: '波蘭文' },
    { id: 20, language: '匈牙利文' },
    { id: 21, language: '捷克文' },
    { id: 22, language: '斯洛伐克文' },
    { id: 23, language: '俄羅斯文' },
    { id: 24, language: '印度尼西亞文' },
    { id: 25, language: '泰文' },
    { id: 26, language: '越南文' },
    { id: 27, language: '韓文' },
    { id: 28, language: '阿拉伯文' },
    { id: 29, language: '希伯來文' },
    { id: 30, language: '菲律賓文' }
];

const teachexp = [
    { exp: '請選擇授課經驗' },
    { exp: '無教學經驗' },
    { exp: '曾有1~2年線上授課經驗' },
    { exp: '曾有2~3年線上授課經驗' },
    { exp: '曾有3~4年線上授課經驗' },
    { exp: '曾有4年以上線上授課經驗' },
    { exp: '曾有1~2年影音授課經驗' },
    { exp: '曾有2~3年影音授課經驗' },
    { exp: '曾有3~4年影音授課經驗' },
    { exp: '曾有4年以上影音授課經驗' },
]

const jobs = [
    { state: '請選擇工作狀態' },
    { state: '我有其他正職工作' },
    { state: '我有其他兼職工作' },
    { state: '尋求一份正職工作' },
    { state: '學生' }
]

const hours = [
    { hours: '請選擇授課時數' },
    { hours: '15小時以下' },
    { hours: '15~25小時' },
    { hours: '25~35小時' },
    { hours: '35~45小時' },
    { hours: '45小時+' },
]

const salary = [
    { salary: '請選擇月收目標' },
    { salary: '10,000元以下' },
    { salary: '10,000~20,000元' },
    { salary: '20,000~30,000元' },
    { salary: '30,000~40,000元' },
    { salary: '40,000元以上' },
]




// 初始化v-if值
const first = ref(true)
const second = ref(false)
const buttoncontinues = ref(true)
const applybutton = ref(false)
const backbtn = ref(true)
const checkstate = ref(true)
const state = ref(false)

const continues = () => {
    first.value = false
    second.value = true
    buttoncontinues.value = false
    applybutton.value = true
}

const back = () => {
    first.value = true
    second.value = false
    buttoncontinues.value = true
    applybutton.value = false
}

// 申請老師欄位初始值
const name = ref('');
const idNumber = ref('');
const selectedCountry = ref('請選擇國家')
const selectedlessons = ref('請選擇授課科目')
const selectlang = ref([])
const selectexp = ref('請選擇授課經驗')
const selectjobstate = ref('請選擇工作狀態')
const selecthours = ref('請選擇授課時數')
const selectsalary = ref('請選擇月收目標')
const selectgood = ref('')




const applyteacher = () => {
    const API_URL = '/apply'
    let langs = selectlang.value
    let langobj = {}
    for (var i = 0; i < langs.length; i++) {
        langobj[i] = langs[i]
    }
    console.log(langobj)
    const applydata = {
        name: name.value,
        idNumber: idNumber.value,
        country: selectedCountry.value,
        lessons: selectedlessons.value,
        lang: selectlang.value,
        exp: selectexp.value,
        jobstate: selectjobstate.value,
        hours: selecthours.value,
        salary: selectsalary.value,
        good: selectgood.value,
    }
    tutorlink.post(API_URL, applydata).then((response) => {
    })
    // 請求
    // if (applydata.name != '' && applydata.idcard != '') {
    // } else {
    //     // 錯誤處理
    //     console.log('錯誤')
    //     alert('請填寫完整')
    // }
}



onMounted(() => {
    const API_URL = `/checkstate`
    tutorlink.post(API_URL)
        .then((response) => {
            if (response.data == '已申請') {
                // console.log(response.data)
                checkstate.value = false
                state.value = true
            }
        }
        )
})

</script>
<style scoped>
.langs input {
    margin: 0;
    width: 5%;
}

p {
    margin: 5px;
    font-weight: bold;
}

input,
select {
    margin-left: 5px;
    width: 30%;
    height: 32px;
}

.apply {
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;
    height: inherit;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
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

::placeholder {
    padding-left: 10px;
    /* 在這裡設定字體特效，例如顏色、字體大小等 */
    color: #FF5733;
    /* 修改文字顏色 */
    font-style: italic;
    /* 斜體字體 */
    font-size: 10px;
    /* 修改字體大小 */
    font-weight: bold;
    /* 修改字體粗細 */
}
</style>
