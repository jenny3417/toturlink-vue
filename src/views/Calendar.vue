<template>
    <navbar></navbar>
    <div class="container">
        <h1>我的行事曆</h1>
        <div class="calenderStyle">
            <div class="calenderTitle">
                <div class="calenderDate d-flex">
                    <div class="changeBtn d-flex">
                        <button class="btn" @click="previousWeek"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                <path
                                    d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                            </svg></button>
                        <button class="btn" @click="nextWeek"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path
                                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg></button>
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
                    <div class="col text-center" v-for="date in 7">
                        <div v-for="time in 23" class="calenderTime" @click="handleTimeClick(time, date)">{{ time < 10 ? "0"
                            + time : time }}:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
    
<script setup>

import { ref, onMounted } from 'vue'
import navbar from "../components/public/Navbar.vue"

const startDate = ref(new Date())
const endDate = ref(new Date())

const handleTimeClick = (time, date) => {
    const selectedDate = new Date(startDate.value);
    selectedDate.setDate(selectedDate.getDate() + date - 1);
    selectedDate.setHours(time);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const day = selectedDate.getDate();
    const hour = selectedDate.getHours();

    console.log('年:', year);
    console.log('月:', month);
    console.log('日:', day);
    console.log('時:', hour);
}


const getDayDate = (baseDate, dayOffset) => {
    const dateCopy = new Date(baseDate);
    dateCopy.setDate(baseDate.getDate() + dayOffset);
    return dateCopy.getDate();
}

const updateWeekDates = () => {
    const currentDate = startDate.value;
    const startDay = currentDate.getDate() - currentDate.getDay();
    startDate.value = new Date(currentDate);
    startDate.value.setDate(startDay);
    endDate.value = new Date(currentDate);
    endDate.value.setDate(startDay + 6);
}

const previousWeek = () => {
    startDate.value.setDate(startDate.value.getDate() - 7);
    endDate.value.setDate(endDate.value.getDate() - 7);
    updateWeekDates();

}

const nextWeek = () => {
    startDate.value.setDate(startDate.value.getDate() + 7);
    endDate.value.setDate(endDate.value.getDate() + 7);
    updateWeekDates();

}
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

.calenderDate {

    align-items: center;
}

.calenderTime:hover {

    background-color: #d5bdaf;
}
</style>