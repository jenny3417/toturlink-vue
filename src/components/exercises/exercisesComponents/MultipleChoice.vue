<template>
    <div class="choiceWrap">
        <snap class="title">{{ count }}</snap>. <snap class="title">請問哪些是數字?</snap>

        <div class="checkboxWrap">
            <!-- 多選題 -->
            <label for="11"><input type="checkbox" name="1" id="11" checked> 123456</label>
            <label for="22"><input type="checkbox" name="1" id="22" checked> 123456</label>
            <label for="33"><input type="checkbox" name="1" id="33"> 123456</label>
            <label for="44"><input type="checkbox" name="1" id="44" checked> 123456</label>
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
    margin: 20px;
    border-radius: 10px;
    padding-left: 10px;
}



.title {
    font-size: 30px;
    color: rgb(29, 160, 116);
}
</style>