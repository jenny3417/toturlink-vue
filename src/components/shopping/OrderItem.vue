<template>
    <div v-for="(groupedItems, cartId) in groupedOrderItems" :key="cartId">
        {{ groupedItems }}
        <div class="content-with-loading card-body" v-for="(item, index) in groupedItems" :key="index">
            <div class="cart-item-row row divider-line">
                <!-- 主圖＋介紹-->
                <div class="col-12 col-lg-6 px-2 px-lg-3">
                    <div class="main d-flex">
                        <!-- 課程圖片 -->
                        <div>
                            <a :href='item.link' :title='item.lessonName' target="_self">
                                <img :src='item.image' alt="image">
                            </a>
                        </div>
                        <!-- 課程名稱 -->
                        <div class="ps-3">
                            <a :href='item.link' :title='item.lessonName' target="_self">
                                <span class="fw-bold">{{ item.lessonName }}</span>
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
                        :data-bs-target="'#' + index">課程退費</button>
                    <!-- 退費彈出視窗 -->
                    <div class="modal fade modal-lg" :id=index tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
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
                                        <li v-for="time in item.selectedTimes" :key="time">
                                            <!-- {{ new Date(time).toLocaleString() }} -->
                                            {{ 123 }}
                                        </li>
                                    </ul>
                                </div>
                                <!-- 彈出視窗的確認與取消 -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">確認退款</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
            <!-- <span>課程完成度:</span> -->
            <p></p>
            <!-- 進度條 -->
            <!-- <n-progress type="line" :percentage="60" :indicator-placement="'inside'" processing /> -->
        </div>
        <n-divider />
    </div>
</template>
<script setup>
import { ref,computed  } from "vue";
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from 'pinia'
const cartStore = useShoppingCartStore();
const { orderItem } = storeToRefs(cartStore);

const groupedOrderItems = computed(() => {
  const groupedItems = {};
  orderItem.value.forEach((item) => {
    const cartId = item.cartId.toString();
    if (!groupedItems[cartId]) {
      groupedItems[cartId] = [];
    }
    groupedItems[cartId].push(item);
  });
  return groupedItems;
});
</script>

<style scoped>
.n-divider {
    margin: 1px;
}
</style>