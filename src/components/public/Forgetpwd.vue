<template>
    <ManageNavbar></ManageNavbar>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import google from '../login/google.vue'
import ManageNavbar from "@/components/public/ManageNavbar.vue"
import vueRecaptcha from 'vue3-recaptcha2';
import { useNotification } from 'naive-ui'
const router = useRouter()
const notification = useNotification()



// 欄位抓值用
const mail = ref('')
const pwd = ref('')

</script>
    
<style scoped>
button {
    font-weight: bold;
    margin: 5px 20px;
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


.thirdlogin {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center
}

.modal-body {
    padding-bottom: 0px;
}

.modal-header {
    color: rgba(76, 87, 102, 0.6);
    font-weight: bold;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}


.caption-text {
    font-size: 14px;
    color: rgba(76, 87, 102, 0.6);
}

hr {
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
}

.bar {
    min-width: 100%;
    background-color: #343a40;
    color: white;
}

.btn:hover {
    background-color: #51585e;
}

.line-text-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 36px 0 16px 0;
}

.line-text-box hr {
    height: 2px;
    border: none;
    background-color: #2f2f29;
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
}
</style>