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
            <div class="row px-0 mx-0  pe-2">
                <h5 class="col-6 col-lg-6 mx-0 text-lg-center">總金額</h5>
                <h5 class="col-6 col-lg-6 mx-0 text-lg-center">
                    $<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" />
                </h5>
            </div>
            <n-divider></n-divider>
            <h5 class="col-6 col-lg-6 mx-0">付款方式</h5>
            <n-space vertical>
                <n-radio-group v-model:value="value" name="radiobuttongroup1">
                    <n-radio-button v-for="paymentmethod in paymentmethods" :key="paymentmethod.value"
                        :value="paymentmethod.value" :label="paymentmethod.label" />
                </n-radio-group>
            </n-space>
        </div>
        <button type="button" class="btn btn-outline-success" @click="proceedToStep3">
            完成
        </button>
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

const paymentmethods = [
    {
        value: "0",
        label: "LinePay"
    },
    {
        value: "1",
        label: "其他"
    },
].map((s) => {
    s.value = s.value.toLowerCase();
    return s;
});
const proceedToStep3 = () => {
    if (value.value === null) {
        alert('請選擇付款方式！');
    } else {
        router.push({ name: 'step3' });
    }
};
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
</style>