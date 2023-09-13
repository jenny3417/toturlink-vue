<template>
    <div class="calenderStyle">
        <div class="calenderTitle">
            <div class="d-flex justify-content-center">
                <div class="changeBtn d-flex ">
                    <!-- 前一週按鈕 -->
                    <button class="btn changeDate" @click="previousWeek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path
                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                    <!-- 顯示日期範圍 -->
                    <div class="calenderDate">
                        {{ startDate.getFullYear() }}/{{ startDate.getMonth() + 1 }}/{{ startDate.getDate() }} ~ {{
                            endDate.getFullYear() }}/{{ endDate.getMonth() + 1 }}/{{ endDate.getDate() }}
                    </div>
                    <!-- 後一週按鈕 -->
                    <button class="btn changeDate" @click="nextWeek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path
                                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- 顯示星期標題 -->
            <div class="calenderWeek d-flex row row-cols-7">
                <div class="col text-center">
                    <div>日</div>
                    <div>{{ getDayDate(startDate, 0) }}</div>
                </div>
                <div class="col text-center">
                    <div>一</div>
                    <div>{{ getDayDate(startDate, 1) }}</div>
                </div>
                <div class="col text-center">
                    <div>二</div>
                    <div>{{ getDayDate(startDate, 2) }}</div>
                </div>
                <div class="col text-center">
                    <div>三</div>
                    <div>{{ getDayDate(startDate, 3) }}</div>
                </div>
                <div class="col text-center">
                    <div>四</div>
                    <div>{{ getDayDate(startDate, 4) }}</div>
                </div>
                <div class="col text-center">
                    <div>五</div>
                    <div>{{ getDayDate(startDate, 5) }}</div>
                </div>
                <div class="col text-center">
                    <div>六</div>
                    <div>{{ getDayDate(startDate, 6) }}</div>
                </div>
                <!-- 以此類推顯示星期一到星期六的日期 -->
            </div>

            <!-- 顯示行事曆內容 -->
            <div class="calenderContent d-flex row row-cols-7">
                <!-- 以迴圈產生各個時間格子 -->
                <div class="col text-center calenderTimeStyle" v-for="date in 7" :key="date">
                    <div v-for="time in 23" :key="time" @click="handleTimeClick(time, date)">
                        <!-- 如果時間已被選取，顯示已選取樣式及彈出視窗；否則只顯示時間 -->
                        <template v-if="isTimeSelected(time, date)">
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <!-- 
                                        'calenderTime'：這是一個固定的CSS類別，它總是應用於這個HTML元素。
                                    { 'selectedTime': isTimeSelected(time, date), 'currentHour': isCurrentHour(time, date) }：這是一個JavaScript對象（Object），其中包含了條件式的CSS類別。這個對象中有兩個屬性：
                                        'selectedTime'：如果isTimeSelected(time, date)函數的結果為true，則這個類別將被應用。
                                        'currentHour'：如果isCurrentHour(time, date)函數的結果為true，則這個類別將被應用。
                                    總結起來，這行程式碼的作用是動態地設定HTML元素的CSS類別，具體應用的類別取決於isTimeSelected(time, date)和isCurrentHour(time, date)函數的返回值。這樣可以根據特定條件添加或刪除CSS類別，以改變元素的外觀。 -->
                                    <div
                                        :class="['calenderTime', { 'selectedTime': isTimeSelected(time, date), 'currentHour': isCurrentHour(time, date) }]">
                                        {{ time < 10 ? '0' + time : time }}:00 </div>
                                            <!-- 格式化時間以確保它始終包含兩位數的數字 -->
                                </template>
                                <!-- 顯示選取的課程詳細內容 -->
                                <div class="text-right" v-for="item in selectedTimes">
                                    <div v-if="item === getSelectedTimeMillisecond(time, date)">
                                        <h4>{{ shoppingCartItem[index].title }}</h4>
                                        <div>課程時間:{{ time < 10 ? '0' + time : time }}:00~{{ time + 1 < 10 ? '0' + (time + 1)
                                            : time + 1 }}:00 </div>
                                        </div>
                                    </div>
                            </n-popover>
                        </template>
                        <template v-else-if="isTimeUnavailable(time, date)">
                            <n-popover trigger="hover">
                                <template #trigger>
                                    <div class="calenderTime unavailable">{{ time < 10 ? '0' + time : time }}:00 </div>
                                </template>
                                <!-- 顯示選取的課程詳細內容 -->
                                <div class="text-right" v-for="item in unavailableTime">
                                    <div v-if="item.millisecond === getSelectedTimeMillisecond(time, date)">
                                        <h6>該時段無法選擇</h6>
                                        <div>{{ time < 10 ? '0' + time : time }}:00~{{ time + 1 < 10 ? '0' + (time + 1) :
                                            time + 1 }}:00 </div>
                                        </div>
                                    </div>
                            </n-popover>
                        </template>
                        <!-- 未選取的時間只顯示時間本身 -->
                        <template v-else>
                            <div
                                :class="['calenderTime', { 'selectedTime': isTimeSelected(time, date), 'currentHour': isCurrentHour(time, date) }]">
                                {{ time < 10 ? '0' + time : time }}:00 </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{ selectedTimes }}
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
const { cartStore, getSelectedTimes } = useShoppingCartStore();
const { shoppingCartItem } = storeToRefs(cartStore);
// 目前的時間
const currentTime = new Date();
// 起始日期和結束日期的狀態
const startDate = ref(new Date());
const endDate = ref(new Date());

const props = defineProps({
    shoppingCartItem: Array,
    index: Number,
})
const index = props.index;
const selectedTimes = props.shoppingCartItem[index].selectedTimes;

const unavailableTime = ref([
    { millisecond: 1694070000000, teacher: "小花", class: "數學課" },
]);





/**
 * 處理時間格子的點擊事件，用於選取或取消選取特定的時間。
 * @param {number} time - 選取的時間（小時數，24小時制）。
 * @param {number} date - 日期偏移，從星期日（1）到星期六（7）。
 */
const handleTimeClick = (time, date) => {

    // 創建一個新的日期對象，基於起始日期
    const selectedDate = new Date(startDate.value);

    // 設置日期偏移以獲取特定日期，輸入值date為1~7，故要-1
    selectedDate.setDate(selectedDate.getDate() + date - 1);

    // 設置小時以獲取特定時間
    selectedDate.setHours(time);

    // 獲取當前時間
    const currentTime = new Date();

    // 如果選取的時間早於當前時間，則禁止選取
    if (isTimeUnavailable(time, date) || selectedDate < currentTime) {
        return;
    }

    // 創建時間的字串表示，格式為 'YYYY/MM/DD HH:00'
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`;

    // 獲取時間的毫秒表示
    const millisecond = new Date(str).getTime();

    // 在已選取的時間列表中尋找該時間的索引
    const index = selectedTimes.indexOf(millisecond);

    const currentCountindex = props.index;
    const currentCount = useShoppingCartStore().getCurrentCount(currentCountindex);
    console.log(currentCountindex);
    console.log(currentCount);

    if (selectedTimes.length <= currentCount) {
        // 如果找不到該時間，則將其添加到已選取的時間列表中
        if (index === -1 && selectedTimes.length < currentCount) {
            selectedTimes.push(millisecond);
        } else if (index !== -1) {
            // 如果找到了該時間，則從已選取的時間列表中移除它
            selectedTimes.splice(index, 1);
        }
    }
};


/**
 * 檢查特定時間格子是否在unavailableTime中。
 * @param {number} time - 要檢查的時間（小時數，24小時制）。
 * @param {number} date - 日期偏移，從星期日（1）到星期六（7）。
 * @returns {boolean} - 如果時間格子在unavailableTime中，返回 true；否則返回 false。
 */
const isTimeUnavailable = (time, date) => {

    // 創建一個新的日期對象，基於起始日期
    const selectedDate = new Date(startDate.value);

    // 設置日期偏移以獲取特定日期，輸入值date為1~7，故要-1
    selectedDate.setDate(selectedDate.getDate() + date - 1);

    // 設置小時以獲取特定時間
    selectedDate.setHours(time);

    // 創建時間的字串表示，格式為 'YYYY/MM/DD HH:00'
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`;

    // 獲取時間的毫秒表示
    const millisecond = new Date(str).getTime();

    // 檢查該時間是否在unavailableTime中
    return unavailableTime.value.some(
        unavailable => unavailable.millisecond === millisecond
    );
};

/**
 * 檢查特定時間格子是否已被選取。
 * @param {number} time - 要檢查的時間（小時數，24小時制）。
 * @param {number} date - 日期偏移，從星期日（1）到星期六（7）。
 * @returns {boolean} - 如果時間格子已被選取，返回 true；否則返回 false。
 */
const isTimeSelected = (time, date) => {
    // 創建一個新的日期對象，基於起始日期
    const selectedDate = new Date(startDate.value);

    // 設置日期偏移以獲取特定日期，輸入值date為1~7，故要-1
    selectedDate.setDate(selectedDate.getDate() + date - 1);

    // 設置小時以獲取特定時間
    selectedDate.setHours(time);

    // 創建時間的字串表示，格式為 'YYYY/MM/DD HH:00'
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`;

    // 獲取時間的毫秒表示
    const millisecond = new Date(str).getTime();


    const selectedTimes = useShoppingCartStore().getSelectedTimes();
    
    // console.log(selectedTimes);

    // 使用 Array.prototype.some 方法檢查是否有任何已選取的時間與給定時間匹配
    return selectedTimes.includes(millisecond);
};

/**
 * 獲取指定時間格子的時間表示（以毫秒為單位）。
 * @param {number} time - 要計算的小時數。
 * @param {number} date - 要計算的日期偏移，以星期幾為單位。
 * @returns {number} - 返回指定時間格子的時間表示，以毫秒為單位。
 */
const getSelectedTimeMillisecond = (time, date) => {
    // 創建一個新的日期對象，複製起始日期
    const selectedDate = new Date(startDate.value);

    // 設置日期部分為基準日期的日期加上日期偏移，輸入值date為1~7，故要-1
    selectedDate.setDate(selectedDate.getDate() + date - 1);

    // 設置小時部分為指定的小時
    selectedDate.setHours(time);

    // 創建一個日期字串，表示選定的日期和時間
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`;

    // 獲取日期對象的時間表示，以毫秒為單位
    const millisecond = new Date(str).getTime();

    // 返回計算後的時間表示
    return millisecond;
};

/**
 * 獲取指定日期的偏移日期的日期部分（即日）。
 * @param {Date} baseDate - 基準日期，用於計算偏移日期。
 * @param {number} dayOffset - 要計算的日期偏移，以天為單位。
 * @returns {number} - 返回指定日期偏移的日期部分（即日）。
 */
const getDayDate = (baseDate, dayOffset) => {
    // 創建一個新的日期對象，複製基準日期
    const dateCopy = new Date(baseDate);

    // 設置日期部分為基準日期的日加上偏移量
    dateCopy.setDate(baseDate.getDate() + dayOffset);

    // 返回計算後的日期部分，即日
    return dateCopy.getDate();
};


/**
 * 更新起始日期和結束日期，使其成為當週的日期範圍。
 */
const updateWeekDates = () => {
    // 獲取目前的日期
    const currentDate = startDate.value;

    // 計算當週的第一天（星期日）的日期
    const startDay = currentDate.getDate() - currentDate.getDay();

    // 設置起始日期為當週的第一天
    startDate.value = new Date(currentDate);
    startDate.value.setDate(startDay);

    // 設置結束日期為當週的最後一天（即起始日期 + 6天）
    endDate.value = new Date(currentDate);
    endDate.value.setDate(startDay + 6);
};

/**
 * 切換到上一週的行事曆。
 */
const previousWeek = () => {
    // 獲取目前起始日期
    const currentDate = startDate.value;

    // 計算目前週的第一天
    const startDay = currentDate.getDate() - currentDate.getDay();

    // 創建新的起始日期，減去 7 天以回到前一週
    const newStartDate = new Date(currentDate);
    newStartDate.setDate(startDay - 7);

    // 添加條件檢查以禁止切換到現在之前的日期
    if (startDate.value >= new Date()) {
        // 如果可以，設定新的起始日期為前一週的起始日期
        startDate.value = newStartDate;

        // 設定新的結束日期為前一週的最後一天（起始日期減一天）
        endDate.value = new Date(currentDate);
        endDate.value.setDate(startDay - 1);
    }
    // 調用函數以確保日期範圍保持在當週
    updateWeekDates();
};


/**
 * 切換到下一週的行事曆。
 */
const nextWeek = () => {
    // 添加 7 天以更新起始和結束日期
    startDate.value.setDate(startDate.value.getDate() + 7);
    endDate.value.setDate(endDate.value.getDate() + 7);

    // 調用函數以確保日期範圍保持在當週
    updateWeekDates();
};

/**
 * 檢查特定時間格子是否為當前小時。
 * @param {number} time - 要檢查的時間（小時數，24小時制）。
 * @param {number} date - 日期偏移，從星期日（1）到星期六（7）。
 * @returns {boolean} - 如果時間格子為當前小時，返回 true；否則返回 false。
 */
const isCurrentHour = (time, date) => {
    // 獲取當前的小時
    const currentHour = currentTime.getHours();

    // 創建一個新的日期對象，基於起始日期
    const currentDate = new Date(startDate.value);

    // 設置日期偏移以獲取特定日期，輸入值date為1~7，故要-1
    currentDate.setDate(currentDate.getDate() + date - 1);

    // 檢查是否是當前月份
    const isCurrentMonth = currentDate.getMonth() === currentTime.getMonth();

    // 返回結果，如果是當前小時、當前月份、且與當前日期相符，則返回 true
    return isCurrentMonth && time === currentHour && currentDate.getDate() === currentTime.getDate();
};

// 初始化，更新起始日期與結束日期
updateWeekDates();
</script>
      

      
    
<style scoped>
.calenderWeek {
    background-color: #84a59d;
    padding: 10px 20px;
    font-size: medium;
}

.changeDate {
    color: #9a8c98;
}

.changeDate:hover {
    color: #d5bdaf;
}

.calenderContent {
    padding: 10px 20px;
    border: 3px solid #84a59d;
}

.calenderTime {
    color: #9a8c98;
    padding: 5px;
    transition: .3s;
    cursor: pointer;
    font-size: small;
}

.calenderTimeStyle>div {
    box-sizing: border-box;
    border: 1px solid white;
    transition: .3s;
}

.selectedTime {
    color: #ff006e;
}

.unavailable {
    background-color: #9a8c98;
    color: aliceblue;
}

.calenderDate {
    color: #9a8c98;
    width: 200px;
    text-align: center;
    font-size: medium;
}

.calenderTimeStyle>div:hover {
    border: 1px solid #d5bdaf;
}

.changeBtn {
    align-items: center;

}

@keyframes pulse {
    0% {
        background-color: #b9faf8;
    }

    50% {
        background-color: white;
    }

    100% {
        background-color: #b9faf8;
    }
}

.currentHour {
    box-sizing: border-box;
    background-color: #198754;
    /* 使用 #198754 作為背景顏色 */
    color: white;
    /* 文字顏色設為白色，以確保可讀性 */
}
</style>