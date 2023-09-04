<template>
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#calendarModal">我的行程</a>
    <div class="modal fade modal-xl" id="calendarModal" tabindex="-1" aria-labelledby="calendarModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <calendar-component></calendar-component>
                    </div>
                </div>

                <div class="submitBtn">
                    <button type="button" class="btn btn-primary submitBtnStyle" data-bs-dismiss="modal">關閉</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import CalendarComponent from './CalendarComponent.vue';
</script>
    
<style scoped>
.submitBtn {
    margin: 0 auto;
    margin-bottom: 20px;
}

.submitBtnStyle {
    margin: 5px;
}
</style>