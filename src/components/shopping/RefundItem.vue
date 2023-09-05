<template>
    <div class="content-with-loading card-body">
        <div class="cart-item-row row divider-line">
            <!-- 主圖＋介紹-->
            <div class="col-12 col-lg-6 px-2 px-lg-3">
                <div class="main d-flex">
                    <!-- 課程圖片 -->
                    <div class="cart-item-image">
                        <a href="/product/1001112702764163" class="" title="課程名稱" target="_self">
                            <img src="https://fakeimg.pl/250x150/" alt="image">
                        </a>
                    </div>
                    <!-- 課程名稱 -->
                    <div class="cart-item-description ps-3">
                        <a href="/product/1001112702764163" class="" title="課程名稱" target="_self">
                            <span class="product-name fw-bold">N5日文文法</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 課程類型 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-2 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                <span class="cart-price-black">影音課程</span>
            </div>
            <!-- 課程數量 -->
            <div class="align-self-center col-8 col-lg-2 p-0 margin-top text-lg-center">
                5堂
            </div>
            <!-- 小計 -->
            <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                金額:$261
            </div>
            <!-- 退款進度條 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                <n-timeline>
                    <n-timeline-item type="success" title="申請退款" time="2018-04-03 20:46" />
                    <n-timeline-item type="success" title="審核中" time="2018-04-03 20:46" />
                    <n-timeline-item type="success" title="退款成功" content="已將金額退回您的帳號" time="2018-04-03 20:46" />
                </n-timeline>
            </div>
        </div>
    </div>
    <n-divider />
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {

    }
});
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