import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useShoppingCartStore = defineStore('shoppingCart', () => {

    const shoppingCartItem = ref([]);


    async function shoppingCartAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/shoppingcart/step1");
                shoppingCartItem.value = response.data.map(originalData => ({
                    id: originalData.cartId,
                    title: originalData.lessonName,
                    type: originalData.lessonType ? 1 : 0,
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

    const getSelectedTimes = (itemIndex) => {
        if (shoppingCartItem.value[itemIndex]) {
            return shoppingCartItem.value[itemIndex].selectedTimes || [];
        }
        return [];
    };

    //訂單總金額
    const totalPrice = computed(() => {
        return shoppingCartItem.value.reduce((total, item) => {
            const count = isNaN(item.count) ? 1 : item.count;
            return total + item.price * count;
        }, 0);
    });


    //刪除
    const deleteCartItem = async (cid) => {
        const index = shoppingCartItem.value.findIndex(item => item.id === cid);
        console.log(index);
        if (index !== -1) {
            const id = shoppingCartItem.value[index].id
            shoppingCartItem.value.splice(index, 1);
            try {
                const response = await tutorlink.delete(`/shoppingcart/deleteCartItem/${id}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const convertToBackendFormat = (cartItem) => {
        return {
            cartId: cartItem.id,
            lessonName: cartItem.title,
            lessonType: cartItem.type === 1, // 根据类型设置为 true 或 false
            price: cartItem.price,
            image: cartItem.img,
            quantity: cartItem.count,
            selectedTimes: cartItem.selectedTimes,
            addTime: cartItem.addTime,
            status: cartItem.status
        };
    };

    const updateItemCount = async (cid) => {
        const index = shoppingCartItem.value.findIndex(item => item.id === cid); // 找到要修改的購物車項目
        const jsonData = JSON.stringify(convertToBackendFormat(shoppingCartItem.value[index]));
        console.log(jsonData);
        // 更新購物車項目的數量
        if (index !== -1) {
            const id = shoppingCartItem.value[index].id;
            try {
                const response = await tutorlink.put(`/shoppingcart/updateItemCount/${id}`, jsonData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (shoppingCartItem.value[index].selectedTimes.length > shoppingCartItem.value[index].count) {
            shoppingCartItem.value[index].selectedTimes = [];
        }
    };

    const getIndex = (cid) => {
        const index = shoppingCartItem.value.findIndex(item => item.id === cid);
        console.log(index);
    }

    return { shoppingCartItem, updateItemCount, totalPrice, getCurrentCount, shoppingCartAjax, deleteCartItem, getSelectedTimes, getIndex };
});
