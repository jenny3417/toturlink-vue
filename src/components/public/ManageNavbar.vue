<template>
    <div class="navbarholder">
        <nav class="navbar navbar-expand-lg" id="navbar">
            <router-link to="/" class="nav-link navbarTitleStyle d-flex"><img src="/LOGO-1color.svg"
                    class="navbarImg">TutorLink</router-link>
        </nav>
    </div>
</template>
<script setup>

import { ref } from "vue"
import { useShoppingCartStore } from '../../stores/useShoppingCartStore.js'
import { storeToRefs } from 'pinia'
import tutorlink from '@/api/tutorlink.js';


</script>

<style scoped>
.navbarholder {
    height: 61px;
    /* margin-bottom: 20px; */
}

header {
    position: fixed;
    margin-bottom: 10px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    /* box-shadow: 0 1px 5px #9d8189; */

}

.navbarImg {
    width: 40px;
    margin-right: 10px;
}

.navbarTitleStyle {
    width: 240px;
    font-size: 30px;
    color: #fffcf2;
    font-weight: 700;
    align-items: center;
    justify-content: center;
}

#navbar {
    background-color: #403d39f0;
    padding-left: 20px;
    padding-right: 20px;
}

.linkStyle {
    font-size: 16px;
    font-weight: 400;
    color: #fffcf2;
    margin-left: 35px;
    min-width: 60px;
}



.navbarTitleStyle:hover,
.linkStyle:hover {
    color: #d5bdaf;

}

.tag {
    position: relative;
    right: 10px;
    bottom: 10px;
}

.userBtn {
    width: 100px;
    padding: 5px 10px;
    background: #fff;
    font-size: 12px;
    color: #000;
    text-align: center;
    border-radius: 20px;
    border: 1.5px solid #000;
}

#navbar.scrolled {
    box-shadow: 0 2px 3px #272324;
}

.container {
    margin: 0 280px;
}
</style>