import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 使用函式表達式命名與檔名一樣的變數並被defineStore('自訂義id',函式)賦值
export const useCartStore = defineStore('cartNum', () => {
    // 靜態值
    // option API的 state: () => { return {originPrice:0}}  
    const originPrice = ref(200)

    // 計算
    // option API的getters: {discountPrice: (state) => originPrice.counter * 2}
    const discountPrice = computed(() => originPrice.value * 0.85)

    // 函示
    // option API的actions: { increment(){this.originPrice *=2}}
    function increment() {
        originPrice.value *= 2
    }

    return { originPrice, discountPrice, increment }
})