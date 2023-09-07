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
      <!-- <div v-for="item in shoppingCartItem ">
        <shopping-cart-item :title="item.title" :price="item.price" :img="item.img" :link="item.link" :type="item.type"
          v-model:count="item.count"></shopping-cart-item>
      </div> -->
      <div v-for="item in shoppingCartItem" :key="item.title">
        <shopping-cart-item :title="item.title" :price="item.price" :img="item.img" :link="item.link" :type="item.type"
          :count="item.count" :selected-time="item.selectedTime" />
      </div>
      <div class="row px-0 mx-0  pe-2">
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center">總金額</h5>
        <h5 class="col-6 col-lg-6 mx-0 text-lg-center">
          $<n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice" />
        </h5>
      </div>
    </div>
    <button type="button" class="btn btn-outline-success">
      <router-link to="/member/shoppingcart/step2" class="rlink">結帳</router-link>
    </button>
  </div>
</template>
    
<script setup>
import ShoppingCartItem from "@/components/shopping/ShoppingCartItem.vue"
import Navbar from "@/components/public/Navbar.vue"
import { ref, computed,watch } from "vue";


import { useShoppingCartStore } from '@/stores/useShoppingCartStore';
// const { shoppingCartItem, totalPrice } = useShoppingCartStore();



// const shoppingCartItem = ref([
//   { title: "課程名稱1", type: 0, price: 1200, img: "https://fakeimg.pl/250x150/", link: "/product/1001112702764163" ,count:1,selectedTime:[]},
//   { title: "課程名稱2", type: 1, price: 300, img: "https://fakeimg.pl/250x150/", link: "/product/1001112702764163" ,count:2,selectedTime:[]},
//   { title: "課程名稱3", type: 1, price: 400, img: "https://fakeimg.pl/250x150/", link: "/product/1001112702764163" ,count:3,selectedTime:[]},
// ])
// // 計算總金額
// const totalPrice = computed(() => {
//     return shoppingCartItem.value.reduce((total, item) => {
//         // 檢查 count 是否為有效值，如果不是的話就視為 0
//         const count = isNaN(item.count) ? 1 : item.count;
//         return total + item.price * count;
//     }, 0);
// });

const { shoppingCartItem, totalPrice, updateCount } = useShoppingCartStore();

// 監視 shoppingCartItem 的變化，並在變化時更新 totalPrice
watch(shoppingCartItem, () => {
  // 在這裡重新計算 totalPrice
  totalPrice.value = shoppingCartItem.value.reduce((total, item) => {
    const count = isNaN(item.count) ? 1 : item.count;
    return total + item.price * count;
  }, 0);
});

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

.rlink {
  color: #198754;
}

.rlink:hover {
  color: aliceblue;
}
</style>