<template>
    <navbar></navbar>
    <div class="container">
        <!-- <img src="../assets/icon/user.png" style="width: 24px;"> -->
        <div class="accordion-body">
            <router-link to="/member/personal/info" class="account">基本資料</router-link><br>
            <router-link to="" class="account">登入紀錄</router-link><br>
            <router-link to="" class="account">刪除帳號</router-link><br>
            <router-link to="/member/personal/apply" class="account">申請老師</router-link>
        </div>
        <div class="per-content">
            <!-- <n-scrollbar style="max-height: 800px"> -->
            <router-view></router-view>
            <!-- </n-scrollbar> -->
        </div>
    </div>
</template>
    
<script setup lang='js'>
import Navbar from "@/components/public/Navbar.vue"

</script>
    
<style scoped>
.account {
    color: black;
    font-weight: bold;
    font-size: 20px;

}

.account:hover {
    color: white;
    background-color: gray;
}

.accordion-body {
    float: left;
    padding-left: 10%;
    margin-top: 1%;
    /* background-color: rgba(255, 255, 255, 0.938); */
}

.per-content {
    padding: 20px 20px 20px 20px;
    background-color: rgba(255, 255, 255, 0.938);
    /* border: 2px solid rgb(116, 113, 113); */
    border-radius: 5px;
    width: 70%;
    margin-left: auto;
}
</style>