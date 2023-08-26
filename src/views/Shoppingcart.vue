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
    <item></item>
    <item></item>
    <item></item>
    </div>
  </div>
</template>
    
<script setup>
import navbar from "../components/Navbar.vue"
import item from "../components/shoppingcart/ShoppingCartItems.vue"


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