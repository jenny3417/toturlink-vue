<template>
    <div class="choiceWrap">
        <snap class="title">{{ count }}</snap>. <snap class="title">請問1+1的值為多少?</snap>

        <!-- 單選 -->
        <div class="radioWrap">
            <label for="1"><input type="radio" name="1" id="1"> 1　　</label><br>
            <label for="2"><input type="radio" name="1" id="2" checked> 2　　</label><br>
            <label for="3"><input type="radio" name="1" id="3"> 3　　</label><br>
            <label for="4"><input type="radio" name="1" id="4"> 4　　</label><br>
        </div>

    </div>
</template>
    
<script setup>
const props = defineProps({
    count: Number,
})
</script>
    
<style scoped>
.choiceWrap {
    min-width: 100px;
    padding: 20px 50px;
    /* border: 1px solid #555; */
    border-radius: 10px;
}

label {
    display: block;
    font-size: 20px;
    background-color: #eee;
    border-radius: 10px;
    padding-left: 10px;
}

.radioWrap {


    /* 在水平方向上居中对齐 */
}

.title {
    font-size: 30px;
    color: rgb(29, 160, 116);
}
</style>