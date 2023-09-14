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
      <!-- <div v-for="(item, index) in shoppingCartItem1" :key="item.id">
        <shopping-cart-item :index="index" v-model="shoppingCartItem1[index]" />
      </div> -->
      <shopping-cart-item />
    </div>
    <div class="d-flex justify-content-end align-items-center totalPriceStyle">
      <div class="row px-2 mx-0 pe-2 " style="width: 200px;">
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center py-2 my-0">總金額</h5>
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center py-2 my-0">
          $<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" />
        </h5>
      </div>
      <div>
        <a class="toOrder" @click="proceedToStep2">
          去結帳
        </a>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import ShoppingCartItem from "@/components/shopping/ShoppingCartItem.vue"
import Navbar from "@/components/public/Navbar.vue"
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = useShoppingCartStore();
const { shoppingCartAjax } = cartStore;
const { totalPrice } = storeToRefs(cartStore);
const router = useRouter();
const { shoppingCartItem } = storeToRefs(cartStore);

const shoppingCartItem1 = ref([]);

async function fetchData() {
  // 啟用cookie使用者
  await shoppingCartAjax(getAllCookies());
  // await shoppingCartAjax(3);

  const { shoppingCartItem } = storeToRefs(cartStore);
  shoppingCartItem1.value = shoppingCartItem.value;
}


// 取得cookies
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
    alert('請確保所有視訊課程節數與選擇時段數量相等');
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

.totalPriceStyle {
  color: #fffcf2;
  padding: 15px 20px;
  background-color: #403d39;
  position: fixed;
  bottom: 0px;
  right: 400px;
}

.toOrder {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f28482;
  color: #fffcf2;
  border-radius: 0;
  transition: .2s;
  margin-left: 10px;
}

.toOrder:hover {
  cursor: pointer;
  background-color: #f2a2a1;
}
</style>