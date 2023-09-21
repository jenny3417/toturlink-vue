<template>
    <div v-for="(item, index) in orderItem" :key="index">
        <div class="content-with-loading card-body">
            <div class="cart-item-row row divider-line">
                <!-- 主圖＋介紹-->
                <div class="col-12 col-lg-6 px-2 px-lg-3">
                    <div class="main d-flex">
                        <!-- 課程圖片 -->
                        <div class="imgStyle">
                            <a :href='item.link' :title='item.lessonName' target="_self">
                                <img :src='str + item.image' alt="image">
                            </a>
                        </div>
                        <!-- 課程名稱 -->
                        <div class="ps-3">
                            <a :href='item.link' :title='item.lessonName' target="_self">
                                <span class="fw-bold">{{ item.lessonName }}</span>
                                <span v-if="item.lessonType == 1">{{ formatDateTime(item.lessonTime) }}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- 課程類型 -->
                <div
                    class="offset-8 offset-lg-0 col-4 col-lg-2 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                    <span>{{ item.lessonType ? '視訊課程' : '影音課程' }}</span>
                </div>
                <!-- 課程數量 -->
                <div class="align-self-center col-8 col-lg-2 p-0 margin-top text-lg-center">
                    1堂
                </div>
                <!-- 小計 -->
                <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                    金額:
                    ${{ item.price }}
                </div>
                <!-- 退費 -->
                <div
                    class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                    <button class="btn btn-outline-primary my-1" type="button" data-bs-toggle="modal"
                        :data-bs-target="'#' + index" v-if="item.lessonType == 1">課程退費</button>
                    <!-- 退費彈出視窗 -->
                    <div class="modal fade modal-lg" :id=index tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true" data-bs-backdrop="static">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <!-- <h5 class="modal-title" id="exampleModalLabel">選擇退款時間</h5> -->
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <!-- 退費彈出視窗內容 -->
                                <div class="modal-body">
                                    <ul>
                                        <li>
                                            <span>是否取消課程?</span>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 彈出視窗的確認與取消 -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                        @click="applyRefund(item.orderId)">確認退款</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <p></p> -->
            <!-- <span>課程完成度:</span> -->
            <!-- <p></p> -->
            <!-- 進度條 -->
            <!-- <n-progress type="line" :percentage="60" :indicator-placement="'inside'" processing /> -->
        </div>
        <n-divider />
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from 'pinia'
const str = ref('data:imagae/png;base64,');
const cartStore = useShoppingCartStore();
const { applyRefund } = useShoppingCartStore();
const { orderItem } = storeToRefs(cartStore);
const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    // 格式化日期时间为 "YYYY/M/D 下午h:mm:ss" 格式
    const formattedDateTime = date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, // 启用12小时制
    });
    return formattedDateTime;
}
</script>

<style scoped>
.n-divider {
    margin: 1px;
}

li {
    list-style-type: none;
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