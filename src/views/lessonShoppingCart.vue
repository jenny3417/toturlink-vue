<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>
<template>
    <Navbar></Navbar>
    <div class="container">
        <div>
            <h2><b>購物車</b></h2>
        </div>

        <div class="cart-block">
            <div style="margin-right: 100px;">商品</div>
            <div>科目</div>
            <div>時間</div>
            <div>堂數</div>
            <div>小計</div>
            <div style="padding-right:8px ;">刪除</div>
        </div>

        <div class="cart-input-block">
            <img src="../assets/lessonImage/user-avatar.png">
            <div style="margin-right: 110px;">XXX老師的韓文課程</div>
            <div style="margin-right: 185px;">韓文</div>
            <div style="margin-right: 140px;">50分鐘</div>
            <div style="margin-right: 150px;">1X NT$324/堂</div>
            <div style="margin-right: 180px;">324</div>
            <button type="button" onclick="alert('你正要刪除課程')" class="img-button"><img src="../assets/lessonImage/wrong.jpg"
                    class="wrong"></button>
        </div>
        <br>
        <h2>選擇付款方式</h2>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="on" checked>
            <label class="btn btn-light" for="btnradio1">
                <h4>信用卡付款</h4><br>Visa, MasterCard, JCB
            </label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-light" for="btnradio2">
                <h4>LINE PAY</h4><br>適用台灣
            </label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-light" for="btnradio3">
                <h4>超商付款</h4><br>適用台灣
            </label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
            <label class="btn btn-light" for="btnradio4">
                <h4>ATM轉帳</h4><br>適用台灣
            </label>
        </div>
        <br>
        <h2>購物明細</h2>
        <div class="lesson-deatil-block">
            <div style="font-size: x-large; margin: 8px;">XXX老師的韓文課程</div>
            <div class="lesson-deatil">
                課程內容 : <div>韓文</div> | <div>50分鐘</div> | <div>1堂</div>
            </div>
            <hr>
            <div style="display: flex; justify-content: space-between; margin: 8px;">
                <div style="font-size: x-large;">總價</div>
                <div style="font-size: x-large;">NT$324</div>
            </div>
            <hr>
            <div style="display: flex;margin: 8px; gap: 5px; ">
                <div>預約截止日:
                </div>
                <div>2023/11/22</div>
            </div>
        </div>
        <div class="btndiv">
            <button type="submit" class="btn btn-success">確認並支付</button>
        </div>
    </div>
</template>
<style>
.container {
    position: relative;
    top: 100px;
}

.cart-block {
    display: flex;
    justify-content: space-between;
    font-size: x-large;

}


.cart-input-block {
    display: flex;
    border: 3px solid silver;
    align-items: center;
    font-size: large;
}

.cart-input-block img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
}

.btn-group {
    display: flex;
}

.btn-group label {
    width: 120px;
    height: 120px;
    margin: 32px;

}

.lesson-deatil-block {
    border: 3px solid silver;
}

.lesson-deatil {
    display: flex;
    gap: 8px;
    font-size: medium;
    margin: 8px;
}

.btndiv {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}

.img-button {
    border: none;
    background-color: #fff;
    cursor: pointer;
    font-size: 48px;
}
</style>