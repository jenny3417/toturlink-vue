<template>
    <navbar></navbar>
    <div class="contailer-lg">
        <div class="card px-0">
            <n-card title="訂單紀錄">
                <n-tabs default-value="orders" justify-content="space-evenly" type="line" animated>
                    <n-tab-pane name="orders" tab="所有訂單">
                        <order-item></order-item>
                    </n-tab-pane>
                    <n-tab-pane name="topay" tab="待付款">
                        <n-gradient-text :size="24" type="success">
                            尚未有訂單
                        </n-gradient-text>
                    </n-tab-pane>
                    <n-tab-pane name="refund" tab="退款">
                        <refund-item></refund-item>
                    </n-tab-pane>
                </n-tabs>
            </n-card>
        </div>
    </div>
</template>
    
<script setup>
import navbar from "@/components/public/Navbar.vue"
import OrderItem from "../components/shopping/OrderItem.vue"
import RefundItem from "../components/shopping/RefundItem.vue";
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
import { ref } from 'vue';
const cartStore = useShoppingCartStore();
const { orderAjax, refundAjax } = cartStore;
const { orderItem } = storeToRefs(cartStore);
const allorderItem = ref([]);
const allrefundItem = ref([]);
async function fetchData() {
    // 啟用cookie使用者
    await orderAjax(getAllCookies());
    await refundAjax(getAllCookies());

    const { orderItem, refundItem } = storeToRefs(cartStore);
    allorderItem.value = orderItem.value;
    allrefundItem.value = refundItem.value;
}
const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    return cookieObj.UsersId;
}

fetchData();
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
</style>