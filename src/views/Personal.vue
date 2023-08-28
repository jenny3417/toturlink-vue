<template>
    <navbar></navbar>
    <div class="accordion bar" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne">
                    帳號設定
                </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                    <router-link to="/personal/info" class="account">基本資料</router-link><br>
                    <router-link to="" class="account">登入紀錄</router-link><br>
                    <router-link to="" class="account">刪除帳號</router-link>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo">
                    成為老師
                </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                    <router-link to="/personal/apply" class="account">申請老師</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="per-content">
        <router-view></router-view>
    </div>
</template>
    
<script setup lang='js'>
import Navbar from "../components/public/Navbar.vue"

</script>
    
<style>
.bar {
    position: fixed;
    width: 15%;
    height: 100vh;
    padding: 0;
    display: block;
    float: left;
    background-color: antiquewhite;
}


.account {
    color: black;
    font-weight: bold;
    font-size: 20px;
    margin: 20%;
}

.per-content {
    padding: 20px 20px 20px 20px;
    background-color: rgb(248, 246, 243);
    border: 2px solid rgb(116, 113, 113);
    border-radius: 5px;
    width: 50%;
    margin: 30px auto;
}

router-link:hover {
    color: gray;
}
</style>