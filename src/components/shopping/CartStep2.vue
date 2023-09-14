<template>
    <navbar></navbar>
    <div class="container">
        <div class="card px-0">
            <div class="cart-list-header">
                <div class="row px-0 mx-0">
                    <div class="col-10 col-lg-6 mx-0">課程資訊</div>
                    <div class="col-2 p-0 d-none d-lg-flex justify-content-center">課程類型</div>
                    <div class="col-2 p-0 d-none d-lg-flex justify-content-center">數量</div>
                    <div class="col-1 p-0 d-none d-lg-flex justify-content-center">小計</div>
                    <div class="col-1 p-0 d-none d-lg-flex"></div>
                </div>
            </div>
            <confirm-item></confirm-item>
            <n-divider></n-divider>
            <div class="px-2 py-2">
                <h5 class="col-6 col-lg-6 mx-0">付款方式</h5>
                <!-- <n-space vertical>
                <n-radio-group v-model:value="value" name="radiobuttongroup1">
                    <n-radio-button v-for="paymentmethod in paymentmethods" :key="paymentmethod.value"
                        :value="paymentmethod.value" :label="paymentmethod.label" />
                </n-radio-group>
            </n-space> -->
                <div class="d-flex">
                    <div class="payStyle" :class="[{ 'paySelected': isPaySelected('LinePay') }]">
                        <img src="/LINE-Pay.png" alt="" style="width:100%" @click="payMethod('LinePay')">
                    </div>
                    <div class="payStyle" :class="[{ 'paySelected': isPaySelected('藍新') }]">
                        <img src="/LINE-Pay.png" alt="" style="width:100%" @click="payMethod('藍新')">
                    </div>
                    <div class="payStyle" :class="[{ 'paySelected': isPaySelected('綠界') }]">
                        <img src="/LINE-Pay.png" alt="" style="width:100%" @click="payMethod('綠界')">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=" priceStyle">

        <div class="d-flex totalPriceStyle">
            <h3 class="payBy">
                已選擇付款方式 : {{ value }}
            </h3>
            <div class="d-flex align-items-center">
                <div class="row px-2 mx-0 pe-2 " style="width: 200px;">
                    <h5 class="col-6 col-lg-6 mx-0 text-lg-center py-2 my-0">總金額</h5>
                    <h5 class="col-6 col-lg-6 mx-0 text-lg-center py-2 my-0">
                        $<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" />
                    </h5>
                </div>
                <div>
                    <a class="toOrder" @click="proceedToStep3">
                        完成
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
      
<script setup>
import ConfirmItem from "@/components/shopping/ConfirmItem.vue"
import Navbar from "@/components/public/Navbar.vue"
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const cartStore = useShoppingCartStore();
const { shoppingCartItem, totalPrice } = storeToRefs(cartStore);
const value = ref(null);


// const paymentmethods = [
//     {
//         value: "0",
//         label: "LinePay"
//     },
//     {
//         value: "1",
//         label: "其他"
//     },
// ].map((s) => {
//     s.value = s.value.toLowerCase();
//     return s;
// });
const proceedToStep3 = () => {
    if (value.value === null) {
        alert('請選擇付款方式！');
    } else {
        router.push({ name: 'step3' });
    }
};

const payMethod = (str) => {
    value.value = str;
}

const isPaySelected = (str) => {
    if (str == value.value) {
        return true
    } else {
        return false
    }
}
</script>

<style scoped>
.cart-list-header {
    font-size: 1.125rem;
    padding: 0.3rem 0;
    background-color: beige;
    border-color: aliceblue;
}

.card {
    width: 85%;
    margin: 15px auto;
}

.btn-outline-success {
    margin: 15px auto;
    display: flex;
    justify-content: center;
}

.n-card {
    background-color: aqua;
}

.rlink {
    color: #198754;
}

.rlink:hover {
    color: aliceblue;
}

.priceStyle {
    width: 100%;
    position: fixed;
    bottom: 0px;
}

.totalPriceStyle {
    margin: 0 auto;
    background-color: #403d39;
    min-width: 57%;
    max-width: 57%;
    color: #fffcf2;
    padding: 15px 20px;
    align-items: center;
    justify-content: space-between;
}

.toOrder {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fffcf2;
    color: #000;
    border-radius: 0;
    transition: .2s;
    margin-left: 10px;
}

.toOrder:hover {
    cursor: pointer;
    background-color: #e0c9c9;
}

.payStyle {
    border: 0.2px solid #cccccc;
    margin-right: 10px;
    border-radius: 5px;
    padding: 20px 32px;
    width: 200px;
    box-shadow: 0 0;
}

.payStyle:hover {
    cursor: pointer;
    background-color: #cccccc;
}

.paySelected {
    background-color: #cccccc;
}

.payBy {
    margin: 0;
}
</style>