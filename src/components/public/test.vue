<template>
    <h2>原價:{{ originPrice }}</h2>
    <h2>折價:{{ discountPrice }}</h2>
    <button @click="increment">*2</button>
    <!-- 也可以使用 cartStore.increment()來執行函式 -->
    <!-- <button @click="cartStore.increment">*2</button> -->
</template>

    
<script setup>
import { useCartStore } from '../../stores/useCartStore.js'
// 以解構的方式import storeToRefs這個方法
import { storeToRefs } from 'pinia'

// 使用函式表達式給變數countStore賦值，這邊變數會習慣用import進來的檔案名稱並去除use命名，只要看到Store就是與pinia有關。
const cartStore = useCartStore()

// 使用解構的方式取得useCounterStore()內的函式
const { increment } = cartStore


// 使用useCounterStore()的變數，不能直接解構變數，會去除掉proxy也就是解包，會造成資料無法響應式，所以要用到storeToRefs這個方法把變數在塞回ref內
const { originPrice, discountPrice } = storeToRefs(cartStore)
</script>
    
<style></style>