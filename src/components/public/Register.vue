<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="registerModalLabel">註冊</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    註冊表單
                    <google data-bs-dismiss="modal" @login-status="loginStatusFromGoogle"></google>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">註冊</button>
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target="#loginModal">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import google from '../login/google.vue'
import { ref } from 'vue'

const status = ref(false)
const emits = defineEmits(['login-status'])

const loginStatusFromGoogle = (val) => {
    status.value = val
    emits('login-status', status.value)
}



</script>
    
<style></style>