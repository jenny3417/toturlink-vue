<template>
    <!-- <div class="item-body">
        <div class="lesson-info">
            <img src="https://fakeimg.pl/150x90/" alt="課程圖片">
            <div class="lesson-name">課程名稱</div>
        </div>
        <div>影音課程</div>
        <div>1</div>
        <div>$55</div>
    </div> -->
    <div class="cart-header-gold cart-list-header">
        <div class="row px-0 mx-0">
            <div class="product-info-title col-10 col-lg-6 offset-1 offset-md-0 item-center mx-0">
                <img src="https://fakeimg.pl/150x90/" alt="">課程資訊
            </div>
            <div class="col-1 item-center p-0 d-none d-lg-flex item-info">類別</div>
            <div class="col-2 item-center p-0 d-none d-lg-flex item-info">數量</div>
            <div class="col-1 item-center p-0 d-none d-lg-flex item-info">小計</div>
            <div class="col-2 item-center p-0 d-none d-lg-flex item-info">x</div>
        </div>
    </div>
</template>
<script>
export default {

}
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
.item-info{
    align-items: center
}
</style>