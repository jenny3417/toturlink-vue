<template>
    <header>
        <nav class="navbar navbar-expand-lg" id="navbar">
            <div class="container-fluid">
                <router-link to="/" class="nav-link navbarTitleStyle d-flex"><img src="../../public/LOGO-1.svg" alt=""
                        class="navbarImg">TutorLink</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav" v-if="true">
                        <router-link to="/shoppingcart" class="nav-link linkStyle">購物車</router-link>
                        <router-link to="/myfavoriate" class="nav-link linkStyle">收藏</router-link>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">使用者</a>
                    </div>
                    <div class="navbar-nav" v-else>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#registerModal">註冊</a>
                        <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal"
                            data-bs-target="#loginModal">登入</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- 登入彈出視窗 -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="loginModalLabel">登入</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    登入表單
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">登入</button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#registerModal">註冊</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 註冊彈出視窗 -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="registerModalLabel">註冊</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    註冊表單
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">註冊</button>
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target="#loginModal">登入</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 右側選單 -->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
        <rightmenu></rightmenu>
    </div>
</template>
<script setup>
import rightmenu from './Rightmenu.vue';

// 滾動改顏色
// import { ref, onMounted } from 'vue';
// const navbar = ref("null");
// onMounted(() => {
//     navbar.value = document.querySelector(".navbar");
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 0) {
//             navbar.value.classList.add('scrolled');
//         }
//         else {
//             navbar.value.classList.remove('scrolled');
//         }
//     });
// });



</script>

<style>
header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
}

.navbarImg {
    width: 50px;
    margin-right: 10px;
}

.navbarTitleStyle {
    font-size: 40px;
    color: #9d8189;
    font-weight: 700;
}

#navbar {
    background-color: #ffe5d9;
    /* background-color: #d4a37316; */
    padding-left: 20px;
    padding-right: 20px;
    transition: background-color 0.3s ease;
}

.linkStyle {
    font-size: 22px;
    font-weight: 400;
    color: #9d8189;
    margin-left: 20px;
}

.navbarTitleStyle:focus {
    color: #9d8189;
}

.navbarTitleStyle:hover,
.linkStyle:hover,
.linkStyle:focus {
    color: #d5bdaf;

}


/* #navbar.scrolled {
    background-color: #d5bdaf;
} */
</style>