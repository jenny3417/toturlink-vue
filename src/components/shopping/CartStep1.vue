<template>
  <navbar></navbar>
  <div class="contailer-lg">
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
      <div> <shopping-cart-item v-for="(item, index) in shoppingCartItem" :index="index"
          v-model="shoppingCartItem[index]" /></div>
      <div class="row px-0 mx-0  pe-2">
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center">總金額</h5>
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center">
          $<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" />
        </h5>
      </div>
    </div>
    <button type="button" class="btn btn-outline-success" @click="proceedToStep2">
      去結帳
    </button>
  </div>
</template>
    
<script setup>
import ShoppingCartItem from "@/components/shopping/ShoppingCartItem.vue"
import Navbar from "@/components/public/Navbar.vue"
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
const cartStore = useShoppingCartStore();
const { shoppingCartItem, totalPrice } = storeToRefs(cartStore);
import { useRouter } from 'vue-router';
const router = useRouter();
const proceedToStep2 = () => {
  // 檢查每個購物車項目的時間
  const allItemsComplete = shoppingCartItem.value.every(item => {
    if (item.type === 0) {
      // 如果 type 為 0，直接返回 true，表示該項目不需要選擇時間
      return true;
    }
    return item.selectedTimes.length === item.count;
  });
  if (allItemsComplete) {
    // 如果所有的項目都完整，到下一頁
    router.push({ name: 'step2' });
  } else {
    // 如果有不完整的項目，顯示錯誤消息
    alert('請確保所有需要選擇時間的課程都已選擇完時間！');
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
</style>