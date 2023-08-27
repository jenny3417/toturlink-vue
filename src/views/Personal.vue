<template>
    <navbar></navbar>
    <div>
        <div class="bar">
            <div style="height: 40px;"></div>
            <router-link class="account" to="">帳號設定</router-link>
        </div>
    </div>
    <div style="display: flex;">
        <div class="per-title">
            <router-link to="/personal/info" class="per-router">基本設定</router-link> |
            <router-link to="" class="per-router" @click="">登入紀錄</router-link> |
            <router-link to="/personal/beteacher" class="per-router">刪除帳號</router-link>
        </div>
    </div>
    <div class="per-content">
        <router-view></router-view>
    </div>
</template>
    
<script setup lang='js'>
import navbar from "../components/Navbar.vue"

</script>
    
<style>
.bar {
    /* position: fixed; */
    width: 15%;
    background-color: rgb(199, 188, 188);
    height: 100vh;
    /* margin-left: 100px; */
    padding: 0;
    /* display: block;*/
    float: left;
}


.account {
    color: black;
    font-weight: bold;
    font-size: 20px;
    margin: 20%;
}

.per-router {
    color: black;
    font-size: 20px;
    font-weight: bold;
}

.per-router:hover {
    color: red;
    font-size: 20px;
    font-weight: bold;
}

.per-title {
    float: left;
    margin: 15px;
}

.per-content {
    display: flex;
    padding: 20px 20px 20px 20px;
    background-color: rgb(248, 246, 243);
    border: 2px solid rgb(116, 113, 113);
    border-radius: 5px;
    width: 50%;
    margin: 0 auto;
}
</style>