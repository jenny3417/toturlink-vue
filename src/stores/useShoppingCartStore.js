import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useShoppingCartStore = defineStore('shoppingCart', () => {

    const shoppingCartItem= ref([]);

    async function shoppingCartAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/shoppingcart/step1");
                shoppingCartItem.value = response.data.map(originalData => ({
                    title: originalData.lessonName,
                    type: originalData.lessonType ? 0 : 1,
                    price: originalData.price,
                    img: originalData.image,
                    link: '/product/1001112702764163',
                    count: originalData.quantity,
                    selectedTimes: originalData.selectedTimes,
                    addTime: originalData.addTime,
                    status: originalData.status
                  }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const getCurrentCount = (itemIndex) => {
        if (shoppingCartItem.value[itemIndex]) {
            return shoppingCartItem.value[itemIndex].count;
        }
        return 0;
    };

    //訂單總金額
    const totalPrice = computed(() => {
        return shoppingCartItem.value.reduce((total, item) => {
            const count = isNaN(item.count) ? 1 : item.count;
            return total + item.price * count;
        }, 0);
    });

    const updateCount = (item, oldCount) => {
        // 更新購物車項目的數量
        item.count = oldCount;
        if (item.selectedTimes.length > oldCount) {
            item.selectedTimes = [];
        }
    };

    const removeCartItem = (index) => {
        if (index >= 0 && index < shoppingCartItem.value.length) {
            shoppingCartItem.value.splice(index, 1);
        }
    };

    return { shoppingCartItem, updateCount, totalPrice, getCurrentCount, removeCartItem, shoppingCartAjax };
});
