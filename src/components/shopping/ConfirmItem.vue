<template>
    <div v-for="(item, index) in shoppingCartItem" :index="index">
        <div class="card-body">
            <div class="cart-item-row row divider-line">
                <!-- 主圖＋介紹-->
                <div class="col-12 col-lg-6 px-2 px-lg-3">
                    <div class="main d-flex">
                        <!-- 課程圖片 -->
                        <div class="imgStyle">
                            <a :href='item.link' :title='item.title' target="_self">
                                <img :src='str + item.img' alt="image">
                            </a>
                        </div>
                        <!-- 課程名稱 -->
                        <div class="ps-3">
                            <a :href='item.link' :title='item.title' target="_self">
                                <span class="fw-bold">{{ item.title }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- 課程類型 -->
                <div
                    class="offset-8 offset-lg-0 col-4 col-lg-2 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                    <span>{{ item.type ? '視訊課程' : '影音課程' }}</span>
                </div>
                <!-- 課程數量 -->
                <div class="align-self-center col-8 col-lg-2 p-0 margin-top text-lg-center">
                    {{ item.count }}
                </div>
                <!-- 小計 -->
                <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                    {{ item.price * item.count }}
                </div>
                <!-- 確認時間 -->
                <div v-if="item.type !== 0"
                    class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                    <a class="timeBtn my-1" type="button" data-bs-toggle="modal" :data-bs-target="'#' + index">上課時間</a>
                    <!-- 彈出視窗 -->
                    <div class="modal fade" :id="index" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">上課時間</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <!-- 彈出視窗內容 -->
                                <div class="modal-body">
                                    <ul>
                                        <li v-for="time in item.selectedTimes" :key="time">
                                            {{ new Date(time).toLocaleString() }}
                                        </li>
                                    </ul>
                                </div>
                                <!-- 彈出視窗的確認 -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <n-divider />
    </div>
</template>
<script setup>
import { ref } from "vue"


import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from 'pinia'
const props = defineProps({
    shoppingCartItem: Array,
    index: Number,
})
const cartStore = useShoppingCartStore();
const { shoppingCartItem } = storeToRefs(cartStore);
const str = ref('data:imagae/png;base64,');
</script>

<style scoped>
li {
    list-style-type: none;
}

.n-divider {
    margin: 1px;
}

.timeBtn {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #635f58;
    color: #fffcf2;
    border-radius: 0;
    transition: .2s;
    margin-left: 10px;
}

.timeBtn:hover {
    cursor: pointer;
    background-color: #81786a;
}

.imgStyle {
    overflow: hidden;
    width: 250px;
    height: 150px;
    border-radius: 10px;
}

.imgStyle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
</style>