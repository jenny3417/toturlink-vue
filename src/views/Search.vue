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
                <div class="list-group position-sticky listGroupStyle">
                    <li class="list-group-item active listTitle" aria-current="true">類別</li>
                    <a href="#" class="list-group-item list-group-item-action listContent">全部課程</a>
                    <a href="#" class="list-group-item list-group-item-action listContent">線上課程</a>
                    <a href="#" class="list-group-item list-group-item-action listContent">影音課程</a>
                </div>
            </div>
            <div class="col-md-9 lessonList">
                <div class="card mb-3 cardStyle">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://picsum.photos/200/200?random=1" class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import Navbar from "@/components/public/Navbar.vue"
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { Search } from '@vicons/ionicons5'

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
</style>