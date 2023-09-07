<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="loginModalLabel">登入您的 TutorLink 帳戶</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" v-model="mail" autocomplete="off"
                            oncopy="return false" onpaste="return false" oncut="return false" oncontextmenu="return false">
                        <label for="floatingInput">電子信箱</label>
                        <div v-if="mailwaring" class="warning-text">請輸入信箱</div>
                        <div v-if="mailcheck" class="warning-text">請檢查輸入格式是否正確</div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingInput" v-model="pwd" autocomplete="off"
                            oncopy="return false" onpaste="return false" oncut="return false" oncontextmenu="return false">
                        <label for="floatingInput">密碼</label>
                        <div v-if="mailwaring" class="warning-text">請輸入密碼</div>
                    </div>
                    <google data-bs-dismiss="modal"></google>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import google from '../login/google.vue'   
</script>
    
<style scoped></style>