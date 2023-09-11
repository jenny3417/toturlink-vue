<template>
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#calendarModal">我的行程</a>
    <div class="modal fade modal-xl" id="calendarModal" tabindex="-1" aria-labelledby="calendarModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content container">
                <div class="modal-body">
                    <div class="container">
                        <users-calendar></users-calendar>
                    </div>
                </div>
                <!-- <div class="submitBtn">
                    <button type="button" class="btn btn-primary submitBtnStyle" data-bs-dismiss="modal">關閉</button>
                </div> -->
            </div>
        </div>
    </div>
</template>
    
<script setup>
import usersCalendar from './UsersCalendar.vue';
</script>
    
<style scoped>
.submitBtn {
    margin-left: auto;
    margin-bottom: 20px;
}

.submitBtnStyle {
    margin: 5px 10px;
    background-color: #9a8c98;
    border: none;
}

.submitBtnStyle:hover,
.submitBtnStyle:focus {
    background-color: #d5bdaf;
}
</style>