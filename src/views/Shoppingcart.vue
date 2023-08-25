<template>
  <navbar></navbar>
  <!-- <steps></steps> -->

  <!-- <div class="step">
    <h1>進度條</h1>
  </div>
  <div class="item-title">
    <div class="lesson-info">課程資訊</div>
    <div>類別</div>
    <div>數量</div>
    <div>小計</div>
  </div>
  <item></item> -->

  <div class="cart-header-gold cart-list-header">
    <div class="row px-0 mx-0">
      <div class="product-info-title col-10 col-lg-6 offset-1 offset-md-0 item-center mx-0">課程資訊</div>
      <div class="col-1 item-center p-0 d-none d-lg-flex">類別</div>
      <div class="col-2 item-center p-0 d-none d-lg-flex">數量</div>
      <div class="col-1 item-center p-0 d-none d-lg-flex">小計</div>
      <div class="col-2 item-center p-0 d-none d-lg-flex"></div>
    </div>
  </div>
  <item></item>
</template>
    
<script setup>
// import steps from "../components/ShoppingCartSteps.vue"
import navbar from "../components/Navbar.vue"
import item from "../components/ShoppingCartItems.vue"


</script>
    

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 1rem;
  font: inherit;
}

.cart-header-gold{
  width: 80%;
  background-color: aquamarine;
  margin: 5px auto;
}
</style>