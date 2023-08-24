<template>
    <navbar></navbar>

    <div class="wrap">

        <div class="myLearn">
            <img class="head" src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="">
            <h1 class="myLearn">
                我的學習
            </h1>
        </div>
        <br>
        <div class="quickLink">
            <router-link class="routerLink" to="/aaa"><img
                    src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="" style="width: 30px;">
                我的課程</router-link>
            <router-link class="routerLink" to="/aaa"><img
                    src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="" style="width: 30px;">
                我的課程</router-link>
            <router-link class="routerLink" to="/aaa"><img
                    src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="" style="width: 30px;">
                我的課程</router-link>
            <router-link class="routerLink" to="/aaa"><img
                    src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="" style="width: 30px;">
                我的課程</router-link>
            <router-link class="routerLink" to="/aaa"><img
                    src="https://i1.sndcdn.com/avatars-000051935710-pbcpf7-t500x500.jpg" alt="" style="width: 30px;">
                我的課程</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>
    
<script setup lang='ts'>
import navbar from "../components/Navbar.vue"


</script>
    
<style scope>
.wrap {
    position: relative;
    width: 100%;
    padding: 100px;
    background-color: beige;
}

.head {
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
}

.myLearn {
    display: inline;

}

.quickLink {
    position: absolute;
    bottom: 0px;
    left: 5%;
    font-size: 25px;

}

.routerLink {
    margin: 10px;
    color: rgb(124, 124, 124);
    transition: all;
    transition-duration: 0.5s;
}

.routerLink:hover {
    margin: 10px;
    color: rgb(63, 164, 162);
    transition: all;
    transition-duration: 0.5s;
}
</style>