<template>
    <div class="container">
        <div class="offcanvas-header">
            <div class="d-flex align-items-center">
                <div class="imgStyle"><img src="" alt=""></div>
                <div>
                    <h3 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">使用者名稱</h3>
                    <div>剩餘代幣: <span>50</span> 點</div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">我的課程</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/myfavoriate" class="nav-link">我的收藏</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/calendar" class="nav-link">行事曆</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">訂單紀錄</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">退款進度</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/" class="nav-link">個人資料</router-link>
                </li>
            </ul>
        </div>
        <hr>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">課程管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">營收概況</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">登出</a>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup>

</script>
    
<style scoped>
a {
    font-size: 22px;
    color: #9d8189;
}

a:hover,
a:focus {
    color: #d5bdaf;
}

.imgStyle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #9d8189;
    margin-right: 20px;
}
</style>