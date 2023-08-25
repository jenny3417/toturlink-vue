<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="checkInfo">
            <lessonInfo></lessonInfo>
        </div>
        <div class="checkBtn-block">
            <RouterLink to="/lesson/Edit">
                <button type="button" class="checkBtn cancel">取消</button>
            </RouterLink>
            <RouterLink to="/lesson">
                <button type="button" class="checkBtn upload">送出</button>
            </RouterLink>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import lessonInfo from '@/components/lessonInfo.vue';
import Navbar from '../components/Navbar.vue';
</script>
    
<style>
.checkInfo {
    border: 3px solid black;
    margin-top: 120px;
}

.checkBtn-block {
    display: flex;
    justify-content: space-evenly;
    margin-top: 32px;
}

.checkBtn {
    width: 120px;
    height: 60px;
    border-radius: 10%;
    background-color: #fff;
}

.upload {
    border: 1px solid green;
    color: green;
}

.upload:hover {
    border: 1px solid green;
    color: #fff;
    background-color: green;
}

.upload:active {
    border: 1px solid green;
    color: #fff;
    background-color: rgb(24, 83, 24);
}

.cancel {
    border: 1px solid red;
    color: red;
}

.cancel:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}

.cancel:active {
    border: 1px solid red;
    color: #fff;
    background-color: rgb(107, 16, 16);
}
</style>