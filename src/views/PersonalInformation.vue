<template>
    <navbar></navbar>
    <div class="bar">
        <div style="height: 40px;"></div>
        <router-link class="account" to=""><img src="../assets/icon/protection.png" style="width: 24px;">帳號設定</router-link>
    </div>
    <div class="" style="color: black;">
        <router-link to="/mylesson">基本設定</router-link>
        <router-link to="" @click="">登入紀錄</router-link>
        <router-link to="/student/exercise">刪除帳號</router-link>
    </div>
    <Footer></Footer>
</template>
    
<script setup lang='js'>
import navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue";

</script>
    
<style>
.bar {
    position: fixed;
    z-index: 998;
    width: 20%;
    height: 100%;
    background-color: rgb(199, 188, 188);
}


.account {
    color: black;
    font-weight: bold;
    font-size: 32px;
    margin: 20%;
}
</style>