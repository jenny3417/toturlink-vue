<template>
    <navbar></navbar>
    <div class="container favoriatePage">
        <h1>我的收藏</h1>
        <div class="favoriateContant row row-cols-auto">
            <div class="card col m-auto my-3 p-0" style="width: 18rem;" v-for="item in 12">
                <img src="https://fakeimg.pl/400x300/" class="card-img-top cardImg" alt="...">
                <div class="card-body">
                    <h4 class="card-text">課程名稱</h4>
                    <p>老師名字</p>
                </div>
                <div class="card-body text-end">
                    <a class="card-text favoriateLink">詳細資訊...</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import navbar from "@/components/public/Navbar.vue"
</script>
<style>
.card {
    min-height: 150px;
}

.cardImg {
    width: 100%;
}

.favoriateLink {
    color: #9d8189;
}

.favoriateLink:hover {
    color: #d5bdaf
}
</style>