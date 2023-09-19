<template>
    <div v-for="(item, index) in refundItem" :key="index">
        <div class="content-with-loading card-body">
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
                                <span v-if="item.lessonType==1">{{ formatDateTime(item.lessonTime) }}</span>
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
                    金額:{{ item.price }}
                </div>
                <!-- 退款進度條 -->
                <div
                    class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                    <span>退款成功</span>
                    <!-- <n-timeline>
                        <n-timeline-item type="success" title="申請退款" time="2018-04-03 20:46" />
                        <n-timeline-item type="success" title="審核中" time="2018-04-03 20:46" />
                        <n-timeline-item type="success" title="退款成功" content="已將金額退回您的帳號" time="2018-04-03 20:46" />
                    </n-timeline> -->
                </div>
            </div>
        </div>
        <n-divider />
    </div>
</template>

<script setup>
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; // 確保引入購物車的 Pinia Store
import { storeToRefs } from 'pinia'
const cartStore = useShoppingCartStore();
const { refundItem } = storeToRefs(cartStore);
const formatDateTime=(dateTimeStr)=> {
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

.n-timeline {
    justify-content: flex-end
}

/* 媒體查詢：螢幕寬度大於 768px 時套用水平排列的樣式 */
</style>