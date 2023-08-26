<template>
    <div class="content-with-loading card-body">
        <div class="cart-item-row row divider-line">
            <!-- 主圖＋介紹-->
            <div class="col-12 col-lg-6 px-2 px-lg-3">
                <div class="main d-flex">
                    <div class="cart-item-image">
                        <a href="/product/1001112702764163" class="" title="課程名稱" target="_self">
                            <img src="https://fakeimg.pl/250x150/" alt="image">
                        </a>
                    </div>
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
            <div class="align-self-center col-8 col-lg-2 p-0 margin-top">
                <n-space vertical>
                    <n-input-number v-model:value="value" :min="0" button-placement="both" />
                </n-space>
            </div>
            <!-- 小計 -->
            <div class="col-4 p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                261
            </div>
            <!-- 刪除 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                <button class="btn btn-outline-primary my-1" type="submit">刪除課程</button>
                <button class="btn btn-outline-primary" type="submit">選擇時間</button>
            </div>
        </div>
    </div>
    <n-divider />
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref(0)
        }
    }
});
</script>

<style scoped></style>