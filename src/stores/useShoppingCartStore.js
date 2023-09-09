import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shoppingCart', () => {
    const shoppingCartItem = ref([
        { title: '課程名稱1', type: 0, price: 1200, img: 'https://fakeimg.pl/250x150/', link: '/product/1001112702764163', count: 1, selectedTimes: [] },
        { title: '課程名稱2', type: 1, price: 300, img: 'https://fakeimg.pl/250x150/', link: '/product/1001112702764163', count: 2, selectedTimes: [1694070000000, 1694080000000] },
        { title: '課程名稱3', type: 1, price: 400, img: 'https://fakeimg.pl/250x150/', link: '/product/1001112702764163', count: 3, selectedTimes: [] }
    ]);


    //訂單總金額
    const totalPrice = computed(() => {
        return shoppingCartItem.value.reduce((total, item) => {
            const count = isNaN(item.count) ? 1 : item.count;
            return total + item.price * count;
        }, 0);
    });

    const updateCount = (item, newCount) => {
        // 更新購物車項目的數量
        item.count = newCount;
    };

    return { shoppingCartItem, updateCount, totalPrice };
});
