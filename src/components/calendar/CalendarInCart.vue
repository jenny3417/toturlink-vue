<template>
    <div class="calenderStyle">
        <div class="calenderTitle">
            <div class="d-flex">
                <div class="changeBtn d-flex ">
                    <!-- 前一週按鈕 -->
                    <button class="btn" @click="previousWeek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path
                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                    <!-- 顯示日期範圍 -->
                    <div class="calenderDate">{{ startDate.getFullYear() }}/{{ startDate.getMonth() + 1 }}/{{
                        startDate.getDate() }} - {{ endDate.getFullYear() }}/{{ endDate.getMonth() + 1 }}/{{
        endDate.getDate() }}</div>
                    <!-- 後一週按鈕 -->
                    <button class="btn" @click="nextWeek">
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
                <!-- 以此類推顯示星期一到星期六的日期 -->
            </div>

            <!-- 顯示行事曆內容 -->
            <div class="calenderContent d-flex row row-cols-7">
                <!-- 以迴圈產生各個時間格子 -->
                <div class="col text-center calenderTimeStyle" v-for="date in 7" :key="date">
                    <!-- 確認訂單頁面的時間無法被選取 -->
                    <div v-for="time in 23" :key="time" @click="handleTimeClick(time, date)">
                        <!-- 如果時間已被選取，顯示已選取樣式及彈出視窗；否則只顯示時間 -->
                        <template v-if="isTimeSelected(time, date)">
                            <n-popconfirm trigger="hover" @positive-click="handlePositiveClick"
                                @negative-click="handleNegativeClick" :show-icon="false" negative-text="取消"
                                positive-text="確認">
                                <template #trigger>
                                    <!-- 顯示已選取的時間，如果是目前的小時，也套用 'currentHour' 樣式 -->
                                    <div
                                        :class="['calenderTime', { 'selectedTime': isTimeSelected(time, date), 'currentHour': isCurrentHour(time, date) }]">
                                        {{ time < 10 ? '0' + time : time }}:00 </div>
                                </template>
                                <!-- 顯示選取的課程詳細內容 -->
                                <div class="text-right" v-for="item in selectedTimes">
                                    <div v-if="item.millisecond === getSelectedTimeMillisecond(time, date)">
                                        <h2>{{ item.class }}</h2>
                                        <h4>{{ item.teacher }}</h4>
                                        <div>課程時間:{{ time < 10 ? '0' + time : time }}:00~{{ time + 1 < 10 ? '0' + (time + 1)
                                            : time + 1 }}:00 </div>
                                        </div>
                                    </div>
                            </n-popconfirm>
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
</template>
<script setup>
import { ref } from 'vue';

// 處理確認按鈕點擊事件
const handlePositiveClick = () => {
    console.log("送出");
}
// 處理取消按鈕點擊事件
const handleNegativeClick = () => {
    console.log("取消");

}

// 起始日期和結束日期的狀態
const startDate = ref(new Date());
const endDate = ref(new Date());

// 預選的課程時間
const selectedTimes = ref([
    { millisecond: 1693447200000, str: "2023/8/31 10:00", teacher: "小名", class: "英文課" },
    { millisecond: 1693353600000, str: "2023/8/30 8:00", teacher: "小光", class: "日文課" },
    { millisecond: 1693177200000, str: "2023/8/28 7:00", teacher: "小華", class: "國文課" },
    { millisecond: 1693184400000, str: "2023/8/28 9:00", teacher: "小花", class: "數學課" },
    { millisecond: 1693782000000, str: "2023/9/4 7:00", teacher: "小天", class: "物理課" }
]);

// 處理時間格子的點擊事件
const handleTimeClick = (time, date) => {
    const selectedDate = new Date(startDate.value);
    selectedDate.setDate(selectedDate.getDate() + date - 1);
    selectedDate.setHours(time);
    const currentTime = new Date();
    if (selectedDate < currentTime) {
        return; // 禁止選取之前的時間
    }

    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`
    const dateObj = new Date(str);
    const millisecond = dateObj.getTime();
    const index = selectedTimes.value.findIndex(
        selected => selected.millisecond === millisecond
    );

    if (index === -1) {
        selectedTimes.value.push({ millisecond, str });
    } else {
        selectedTimes.value.splice(index, 1);
    }

};

// 檢查特定時間格子是否已選取
const isTimeSelected = (time, date) => {
    const selectedDate = new Date(startDate.value);
    selectedDate.setDate(selectedDate.getDate() + date - 1);
    selectedDate.setHours(time);
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`
    const dateObj = new Date(str);
    const millisecond = dateObj.getTime();
    return selectedTimes.value.some(
        selected => selected.millisecond === millisecond && selected.str === str
    );
};

// 取得特定時間格子的毫秒數表示
const getSelectedTimeMillisecond = (time, date) => {
    const selectedDate = new Date(startDate.value);
    selectedDate.setDate(selectedDate.getDate() + date - 1);
    selectedDate.setHours(time);
    const str = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()} ${selectedDate.getHours()}:00`
    const dateObj = new Date(str);
    const millisecond = dateObj.getTime();
    return millisecond
}

// 取得指定日期與偏移天數後的日期
const getDayDate = (baseDate, dayOffset) => {
    const dateCopy = new Date(baseDate);
    dateCopy.setDate(baseDate.getDate() + dayOffset);
    return dateCopy.getDate();
};

// 更新起始日期與結束日期，使其為當週的日期
const updateWeekDates = () => {
    const currentDate = startDate.value;
    const startDay = currentDate.getDate() - currentDate.getDay();
    startDate.value = new Date(currentDate);
    startDate.value.setDate(startDay);
    endDate.value = new Date(currentDate);
    endDate.value.setDate(startDay + 6);
};

// 切換至前一週的處理函式
const previousWeek = () => {
    startDate.value.setDate(startDate.value.getDate() - 7);
    endDate.value.setDate(endDate.value.getDate() - 7);
    updateWeekDates();
};

// 切換至下一週的處理函式
const nextWeek = () => {
    startDate.value.setDate(startDate.value.getDate() + 7);
    endDate.value.setDate(endDate.value.getDate() + 7);
    updateWeekDates();
};

// 目前的時間
const currentTime = new Date();

// 檢查特定時間格子是否為目前小時
const isCurrentHour = (time, date) => {
    const currentHour = currentTime.getHours();
    const currentDate = new Date(startDate.value);
    currentDate.setDate(currentDate.getDate() + date - 1);
    const isCurrentMonth = currentDate.getMonth() === currentTime.getMonth();

    return isCurrentMonth && time === currentHour && currentDate.getDate() === currentTime.getDate();
};

// 初始化，更新起始日期與結束日期
updateWeekDates();

</script>
      

      
    
<style scoped>
.calenderWeek {
    background-color: #84a59d;
    padding: 20px;
}

.calenderContent {
    padding: 20px;
    border: 3px solid #84a59d;
}

.calenderTime {
    color: #9a8c98;
    padding: 5px;
    transition: .3s;
    cursor: pointer;
}

.calenderTimeStyle>div {
    box-sizing: border-box;
    border: 1px solid white;
    transition: .3s;
}

.selectedTime {
    color: #ff006e;
}

.calenderDate {
    width: 200px;
    text-align: center;
}

.calenderTimeStyle>div:hover {
    border: 1px solid #d5bdaf;
}

.changeBtn {
    align-items: center;

}

@keyframes pulse {
    0% {
        border: 3px solid #b9faf8;
    }

    50% {
        border: 3px solid white;
    }

    100% {
        border: 3px solid #b9faf8;
    }
}

.currentHour {
    box-sizing: border-box;
    animation: pulse 1s infinite;
}</style>