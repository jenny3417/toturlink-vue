<template>
    <navbar></navbar>
    <div>
        <div class="bar">
            <div style="height: 40px;"></div>
            <router-link class="account" to="">帳號設定</router-link>
        </div>
    </div>
    <div style="display: block; float: left;">
        <div class="info-title">
            <router-link to="" class="info-router">基本設定</router-link>|
            <router-link to="" class="info-router" @click="">登入紀錄</router-link>|
            <router-link to="/information/beteacher" class="info-router">刪除帳號</router-link>
        </div>
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
    margin-left: 100px;
    padding: 0;
    /* display: block;*/
    float: left;
}

/* .bar img {
    width: 20px;
} */

.account {
    color: black;
    font-weight: bold;
    font-size: 20px;
    margin: 20%;
}

.info-router {
    color: black;
    font-size: 20px;
    font-weight: bold;
}

.info-router:hover {
    color: red;
    font-size: 20px;
    font-weight: bold;
}

.info-title {
    /* position: fixed; */
    float: left;
    margin: 15px;
}
</style>