<template>
    <div class="content-with-loading card-body">
        <div class="cart-item-row row divider-line">
            <!-- 主圖＋介紹-->
            <div class="col-12 col-lg-6 px-2 px-lg-3">
                <div class="main d-flex">
                    <!-- 課程圖片 -->
                    <div class="cart-item-image">
                        <a :href='shoppingCartItem[index].link' :title='shoppingCartItem[index].title' target="_self">
                            <img :src='shoppingCartItem[index].img' alt="image">
                        </a>
                    </div>
                    <!-- 課程名稱 -->
                    <div class="cart-item-description ps-3">
                        <a :href='shoppingCartItem[index].link' :title='shoppingCartItem[index].title' target="_self">
                            <span class="product-name fw-bold">{{ title }}</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 課程類型 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-2 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                <span class="cart-price-black">{{ shoppingCartItem[index].type ? '視訊課程' : '影音課程' }}</span>
            </div>
            <!-- 課程數量 -->
            <div class="align-self-center col-8 col-lg-2 p-0 margin-top">
                <n-space vertical>
                    <!-- <n-input-number v-model:value="item.count" :min="1" :max="type ? undefined : 1" button-placement="both" @change="updateCount"/> -->
                    <n-input-number v-model:value="shoppingCartItem[index].count" :min="1"
                        :max="shoppingCartItem[index].type ? undefined : 1" button-placement="both" @change="updateCount" />
                </n-space>
            </div>
            <!-- 小計 -->
            <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                $<n-number-animation ref="numberAnimationInstRef"
                    :from='shoppingCartItem[index].price * (shoppingCartItem[index].count - 1)'
                    :to='shoppingCartItem[index].price * shoppingCartItem[index].count' />
            </div>
            <div class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                <!-- 刪除 -->
                <button class="btn btn-outline-primary my-1" type="submit">刪除課程</button>
                <!-- 選擇時間 -->
                <button v-if="shoppingCartItem[index].type !== 0" class="btn btn-outline-primary" type="button" data-bs-toggle="modal"
                    :data-bs-target="'#'+index">選擇時間</button>
                <!-- 選擇時間彈出視窗 -->
                <div class="modal fade modal-lg" :id="index" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">選擇上課時間</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <!-- 選擇時間彈出視窗內容 -->
                            <div class="modal-body">
                                <calendar-component :shoppingCartItem="shoppingCartItem" :index="index"></calendar-component>
                                <!-- <c :shoppingCartItem="shoppingCartItem" :index="index"></c> -->
                            </div>
                            <!-- 彈出視窗的確認與取消 -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">確認</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="shoppingCartItem[index].type !== 0">
            <p></p>
            <span>已選時間:</span>
            <p></p>
            <!-- 進度條 -->
            <n-progress type="line" :percentage="60" :indicator-placement="'inside'" processing />
        </div>
    </div>
    {{ shoppingCartItem[index] }}
    <n-divider />
</template>
<script setup>
import C from "./C.vue";
import calendarComponent from "@/components/calendar/CalendarInCart.vue";
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from 'pinia'
const props = defineProps({
    shoppingCartItem: Array,
    index: Number,
})
const cartStore = useShoppingCartStore();
const { shoppingCartItem } = storeToRefs(cartStore);
</script>

<style scoped>
.n-divider {
    margin: 1px;
}</style>