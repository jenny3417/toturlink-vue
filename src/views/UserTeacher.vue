<template>
    <navbar></navbar>

    <div class="wrap">
        <div class="myLearn">
            <img class="head" src="../assets/icon/user.png">
            <h1 class="myLearn">
                我的課程
            </h1>
        </div>
        <br>
        <div class="quickLink">
            <router-link class="routerLink" to="/mylesson"><img src="../assets/icon/lesson.png" alt="" style="width: 30px;">
                我的課程</router-link>
            <router-link class="routerLink" to="/student/exercise"><img src="../assets/icon/blackboard.png" alt=""
                    style="width: 30px;">
                我的作業</router-link>
            <router-link class="routerLink" to=""><img src="../assets/icon/schedule.png" alt="" style="width: 30px;">
                我的行程</router-link>
            <router-link class="routerLink" to=""><img src="../assets/icon/youtube.png" alt="" style="width: 30px;">
                我的影音</router-link>
        </div>

    </div>
    <router-view></router-view>
</template>
    
<script setup lang="js">
import navbar from "../components/Navbar.vue"


</script>
    
<style scope>
.myLearn h1 {
    padding-left: 20px;
}

.wrap {
    display: block;
    position: relative;
    width: 100%;
    padding: 100px;
    margin: 0% auto;
    background-color: rgb(45, 43, 43);
    padding-left: 25%;
    padding-right: 25%;
}

.head {
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    border: solid;
    border-width: 3px;
    border-color: #fff;
    background-color: white;

}

.myLearn {
    display: inline;
    color: white;
    border-color: white;
    vertical-align: middle;
    font-weight: bold;
}


.quickLink {
    position: absolute;
    bottom: 2px;
    left: 25%;
    right: 25%;
    font-size: 25px;

}


.routerLink {
    margin: 10px;
    color: white;
    font-weight: bold;
    font-size: 20px;
}

.routerLink:hover {
    margin: 10px;
    /* color: rgb(165, 174, 189); */
    font-weight: bold;
    /* transition: all; */
    /* transition-duration: 0.5s; */
    border-bottom: 5px solid rgb(75, 180, 148);
}

.routerLink:focus {
    border-bottom: 5px solid rgb(230, 235, 234);
}

body::-webkit-scrollbar {
    display: none;
}
</style>