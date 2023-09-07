<template>
    <div class="content-with-loading card-body">
        <div class="cart-item-row row divider-line">
            <!-- 主圖＋介紹-->
            <div class="col-12 col-lg-6 px-2 px-lg-3">
                <div class="main d-flex">
                    <!-- 課程圖片 -->
                    <div class="cart-item-image">
                        <a :href='link' :title='title' target="_self">
                            <img :src='img' alt="image">
                        </a>
                    </div>
                    <!-- 課程名稱 -->
                    <div class="cart-item-description ps-3">
                        <a :href='link' :title='title' target="_self">
                            <span class="product-name fw-bold">{{ title }}</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 課程類型 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-2 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                <span class="cart-price-black">{{ type ? '視訊課程' : '影音課程' }}</span>
            </div>
            <!-- 課程數量 -->
            <div class="align-self-center col-8 col-lg-2 p-0 margin-top">
                <n-space vertical>
                    <n-input-number v-model:value="item.count" :min="1" :max="type ? undefined : 1" button-placement="both" @change="updateCount"/>
                </n-space>
            </div>
            <!-- 小計 -->
            <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                $<n-number-animation ref="numberAnimationInstRef" :from='price * (count - 1)' :to='price * count' />
            </div>
            <div class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                <!-- 刪除 -->
                <button class="btn btn-outline-primary my-1" type="submit">刪除課程</button>
                <!-- 選擇時間 -->
                <button v-if="type !== 0" class="btn btn-outline-primary" type="button" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">選擇時間</button>
                <!-- 選擇時間彈出視窗 -->
                <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">選擇上課時間</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <!-- 選擇時間彈出視窗內容 -->
                            <div class="modal-body">
                                <calendar-component v-model:count="item.count" @selectTime="selectTime"></calendar-component>
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
        <div v-if="type !== 0">
            <p></p>
            <span>已選時間:</span>
            <p></p>
            <!-- 進度條 -->
            <n-progress type="line" :percentage="60" :indicator-placement="'inside'" processing />
        </div>
    </div>
    <n-divider />
</template>
<script setup>
import { ref } from "vue";
import calendarComponent from "@/components/calendar/CalendarInCart.vue";
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
const props = defineProps({
    title: String,
    price: Number,
    img: String,
    link: String,
    type: Boolean,
    count: Number, 
})

const shoppingCartStore = useShoppingCartStore(); // 使用購物車 Store

const item = shoppingCartStore.shoppingCartItem.find(item => item.title === props.title); // 通過商品標題查找對應的購物車項目

// const updateCount = (item, newCount) => {
//   // 更新購物車項目的數量
//   item.count = newCount;
// };

// const count = ref(props.count);

// const emit = defineEmits();

// const updateCount = (newCount) => {
//     // 向父組件發送數量更新事件
//     emit("update:count", newCount); 
// };


// const selectTime = (selectedTime) => {
//     for(let i=0; i<selectedTime.value.length; i++){
//         console.log(selectedTime.value[i].millisecond)
//     }
// }









</script>

<style scoped>
.n-divider {
    margin: 1px;
}
</style>