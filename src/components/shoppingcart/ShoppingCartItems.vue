<template>
    <div class="content-with-loading card-body">
        <div class="cart-item-row row divider-line">
            <!-- 主圖＋介紹-->
            <div class="col-12 col-lg-6 px-2 px-lg-3">
                <div class="main d-flex">
                    <div class="cart-item-image">
                        <a href="/product/1001112702764163" class="" title="原子習慣: 細微改變帶來巨大成就的實證法則" target="_self">
                            <img src="https://s2.eslite.dev/unsafe/fit-in/x150/s.eslite.dev/upload/product/o/2681759319001/ec1760858.jpg"
                                lazy="loaded">
                        </a>
                    </div>
                    <div class="cart-item-description ps-3">
                        <a href="/product/1001112702764163" class="" title="原子習慣: 細微改變帶來巨大成就的實證法則" target="_self">
                            <span class="product-name fw-bold">原子習慣:
                                細微改變帶來巨大成就的實證法則</span>
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
            <div class="col-4 sub-total p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1 text-lg-center">
                <span class="cart-price-red">261</span>
            </div>
            <!-- 刪除 -->
            <div class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0 text-lg-center">
                <div class="text-d-gray-6 cursor-pointer ms-1">
                </div>
                <div class="text text-mark">刪除</div>
            </div>
        </div>
    </div>
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

<style scoped>
.cart-item-row {
    /* background-color: aqua; */
}
</style>