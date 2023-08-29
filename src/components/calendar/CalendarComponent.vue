<template>
    <div class="calenderStyle">
        <div class="calenderTitle">
            <div class="calenderDate d-flex">
                <div class="changeBtn d-flex">
                    <button class="btn" @click="previousWeek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path
                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                    <button class="btn" @click="nextWeek">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path
                                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                </div>
                <div>{{ startDate.getFullYear() }}/{{ startDate.getMonth() + 1 }}/{{ startDate.getDate() }} - {{
                    endDate.getFullYear() }}/{{ endDate.getMonth() + 1 }}/{{ endDate.getDate() }}</div>
            </div>
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
            </div>
            <div class="calenderContent d-flex row row-cols-7">
                <div class="col text-center" v-for="date in 7" :key="date">
                    <div v-for="time in 23" :key="time" @click="handleTimeClick(time, date)">
                        <div :class="['calenderTime', { 'selectedTime': isTimeSelected(time, date) }]">
                            {{ time < 10 ? '0' + time : time }}:00 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
    
<script setup>
import { ref } from 'vue';

const startDate = ref(new Date());
const endDate = ref(new Date());
const selectedTimes = ref([{ millisecond: 1693447200000, str: "2023/8/31 10:00" }]);


const handleTimeClick = (time, date) => {
    const selectedDate = new Date(startDate.value);
    selectedDate.setDate(selectedDate.getDate() + date - 1);
    selectedDate.setHours(time);
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

const getDayDate = (baseDate, dayOffset) => {
    const dateCopy = new Date(baseDate);
    dateCopy.setDate(baseDate.getDate() + dayOffset);
    return dateCopy.getDate();
};

const updateWeekDates = () => {
    const currentDate = startDate.value;
    const startDay = currentDate.getDate() - currentDate.getDay();
    startDate.value = new Date(currentDate);
    startDate.value.setDate(startDay);
    endDate.value = new Date(currentDate);
    endDate.value.setDate(startDay + 6);
};

const previousWeek = () => {
    startDate.value.setDate(startDate.value.getDate() - 7);
    endDate.value.setDate(endDate.value.getDate() - 7);
    updateWeekDates();
};

const nextWeek = () => {
    startDate.value.setDate(startDate.value.getDate() + 7);
    endDate.value.setDate(endDate.value.getDate() + 7);
    updateWeekDates();
};

updateWeekDates();
</script>
      

      
    
<style scoped>
.calenderWeek {
    background-color: #d5bdaf;
    padding: 20px;
}

.calenderContent {
    padding: 20px;
    background-color: #fae1dd;
}

.calenderTime {
    padding: 5px;
    transition: .3s;
}

.selectedTime {
    background-color: #d5bdaf;
}

.calenderDate {
    align-items: center;
}

.calenderTime:hover {
    background-color: #d5bdaf;
}
</style>