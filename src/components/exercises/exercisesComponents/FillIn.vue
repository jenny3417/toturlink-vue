<template>
    <div class="choiceWrap">
        <snap class="title">{{ count }}</snap>. <snap class="title">請說明1+1如何等於2?</snap>

        <div class="checkboxWrap">
            <!-- 填充題 -->
            <textarea name="" id="" cols="30" rows="10" value="我不知道"></textarea>
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

textarea {
    font-size: 20px;
}

.title {
    font-size: 30px;
    color: rgb(218, 7, 7);
}
</style>