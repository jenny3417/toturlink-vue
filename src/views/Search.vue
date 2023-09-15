<template>
    <navbar></navbar>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between mt-5">
            <div style="width: 45%;">
                <div class="input-group">
                    <input class="searchInput form-control" type="text" placeholder="請輸入要查詢的課程" aria-label="請輸入要查詢的課程"
                        aria-describedby="button-addon2" />
                    <div class="searchIcon d-flex" id="button-addon2">
                        <n-icon size="20">
                            <search />
                        </n-icon>
                    </div>
                </div>
            </div>
            <div style="width: 15%;">
                <select class="form-select" aria-label="Default select example">
                    <option selected hidden>篩選</option>
                    <option value="price">價格：由高到低</option>
                    <option value="time">時間：由新到舊</option>
                    <option value="all">全部課程</option>
                </select>
            </div>
        </div>

        <div class="row mt-5 lessonContent">
            <div class="col-md-3 mb-5 mb-md-0 listStyle">
                <div class="list-group listGroupStyle">
                    <li class="list-group-item active listTitle" aria-current="true">類別</li>
                    <a href="#" class="list-group-item list-group-item-action listContent">全部課程</a>
                    <a href="#" class="list-group-item list-group-item-action listContent">線上課程</a>
                    <a href="#" class="list-group-item list-group-item-action listContent">影音課程</a>
                </div>
            </div>
            <div class="col-md-9 lessonList" v-for="lesson in lessonList">
                <div class="card mb-4 cardStyle">
                    <div class="row g-0 align-items-center" style="height: 320px;">
                        <div class="col-md-4">
                            <div class="cardImg">
                                <img :src="lesson.lessonUrl" class="img-fluid" alt="...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card-body cardInfo">
                                <h2 class="card-title">{{ lesson.lessonName }}</h2>
                                <p class="card-text">{{ lesson.teacherName }}</p>
                                <p class="card-text">優惠價：{{ lesson.price }} 元起
                                </p>
                                <div>
                                    <a class="toCart" @click=addToCart(lesson.lessonId)>加入購物車</a>
                                    <a class="toFavor unFavor" v-if="favoriateHover(lesson.lessonId)"
                                        @click="unfavoriate(lesson.lessonId)">取消收藏</a>
                                    <a v-else class="toFavor" @click="favoriate(lesson.lessonId)">加入收藏</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="card-body">

                                <p class="card-text">{{ lesson.lessonInfo }}</p>

                            </div>
                        </div>
                    </div>
                    <div class="dropdown-center tools">
                        <div data-bs-toggle="dropdown" aria-expanded="false">
                            <n-icon size="25">
                                <reorder-three-outline />
                            </n-icon>
                        </div>
                        <ul class="dropdown-menu">
                            <li>
                                <a class=" dropdown-item" data-bs-toggle="modal" data-bs-target="#insertReportModal"
                                    @click="select(lesson.lessonId)">
                                    檢舉課程</a>
                            </li>
                            <li>
                                <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#scoreEditModal"
                                    @click="select(lesson.lessonId)">評論課程</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import Navbar from "@/components/public/Navbar.vue"
import tutorlink from '@/api/tutorlink.js';

import { Search, ReorderThreeOutline } from '@vicons/ionicons5'
import { ref, onMounted } from 'vue'
import { useNotification } from 'naive-ui'
import { useFavoriateListStore } from '../stores/useFavoriateListStore.js'
import { useLessonsStore } from '../stores/useLessonsStore.js'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
import { useToolsStore } from '../stores/useToolsStore.js'

import { storeToRefs } from 'pinia'
const userID = ref("");

const notification = useNotification();
const cartStore = useShoppingCartStore();
const { shoppingCartItem } = storeToRefs(cartStore);

const loginTip = () => {
    notification["warning"]({
        content: '提示',
        meta: '請先登入',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right",
    })
}
const isFavoriate = () => {
    notification["success"]({
        content: '提示',
        meta: '已加入收藏',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right"
    })
}

const unFavoriateSign = () => {
    notification["success"]({
        content: '提示',
        meta: '已取消收藏',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right"
    })
}

const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    userID.value = cookieObj.UsersId;
}


// pinia
const favoriateListStore = useFavoriateListStore()
const lessonsStore = useLessonsStore()
const toolsStore = useToolsStore()
const { favoriateListAjax } = favoriateListStore
const { lessonsAjax } = lessonsStore
const { select } = toolsStore
const { favoriateList } = storeToRefs(favoriateListStore)
const { lessonList } = storeToRefs(lessonsStore)



onMounted(async () => {
    lessonsAjax()
    getAllCookies()
    favoriateListAjax(userID.value)
});


const currentTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
}
const favoriate = async (lid) => {
    if (userID.value) {
        let obj = { "time": currentTime() };
        const jsonData = JSON.stringify(obj);
        try {
            const response = await tutorlink.post(`favorite?lid=${lid}&uid=${userID.value}`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            favoriateList.value.push(response.data)
            isFavoriate()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        loginTip()
    }
}

const addToCart = async (lid) => {
    if (userID.value) {
        const Item={
            quantity:1
        }
        const jsonData = JSON.stringify(Item);
        try {
            const response = await tutorlink.post(`/shoppingcart/add`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            shoppingCartItem.value.push(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        loginTip()
    }
}
// 判斷是否有收藏
const favoriateHover = (lid) => {
    return favoriateList.value.some(item => item.lessonId === lid);
}

const unfavoriate = async (lid) => {
    const index = favoriateList.value.findIndex(item => item.lessonId === lid);
    if (index !== -1) {
        // console.log(favoriateList.value[index].favoriteId);
        const favoriteId = favoriateList.value[index].favoriteId
        favoriateList.value.splice(index, 1);
        try {
            const response = await tutorlink.delete(`favorite?id=${favoriteId}`);
            // console.log(response);
            unFavoriateSign()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}





</script>
    
<style scoped>
.form-control,
.form-select {
    border: 0.2px solid #6e665e;
    border-radius: 0;
}

.form-control:focus,
.form-control:hover,
.form-select:focus,
.form-select:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #fffcf2;
    outline: 0 none;
}

.searchIcon {
    z-index: 9;
    position: relative;
    right: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    color: aliceblue;
    background-color: #403d39;
    width: 50px;
    transition: .2s;
}

.searchIcon:hover {
    cursor: pointer;
    background-color: #635f58;
}

.listStyle {
    width: 25%;
}

.listTitle {
    padding-top: 26px;
    font-size: 30px;
    background-color: #403d39;
    border: none;
    height: 100px;
}

.listGroupStyle {
    width: 16%;
    position: fixed;
    border-radius: 0;
}

.listContent {
    transition: .3s;
}

.listContent:hover {
    background-color: #e3d5ca;
}

.lessonList {
    width: 73%;
    margin-left: auto;
}

.cardStyle {
    border-radius: 0;
}

.cardImg {
    overflow: hidden;
    margin: 0 auto;
    width: 200px;
    height: 250px;
    border-radius: 15px;
}

.cardImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.cardInfo {
    height: 200px;
    border-right: 0.2px solid #e3d5ca;
}

.toCart {
    padding: 10px 20px;
    font-size: 12px;
    background-color: #635f58;
    transition: .2s;
    color: #fffcf2;
    border-radius: 0;
}

.toFavor {
    padding: 10px 20px;
    font-size: 12px;
    background-color: #f28482;
    color: #fffcf2;
    border-radius: 0;
    transition: .2s;
    margin-left: 10px;
}

.toCart:hover {
    cursor: pointer;
    background-color: #81786a;
}

.toFavor:hover {
    cursor: pointer;
    background-color: #f2a2a1;
}

.unFavor {
    background-color: #4cce8d;
    /* color: #403d39; */
}

.unFavor:hover {
    background-color: #4aea9a;
}

.tools {
    position: absolute;
    right: 20px;
    top: 30px;
    color: gray;
}
</style>