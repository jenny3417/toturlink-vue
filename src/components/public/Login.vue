<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="loginModalLabel">登入</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    登入表單
                    <google data-bs-dismiss="modal"></google>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">登入</button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#registerModal">註冊</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import google from '../login/Google.vue'    
</script>
    
<style></style>