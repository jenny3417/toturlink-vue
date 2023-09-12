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
            window.location.reload();
        }
    };


    const deleteCartItem = async (cartId) => {
        try {
            const response = await tutorlink.delete(`/shoppingcart/deleteCartItem/${cartId}`);
            await shoppingCartAjax(getAllCookies());
            removeCartItem(cartId)
            console.log('删除成功');
        } catch (error) {
            console.error('删除失敗:', error);
        }
    };

    const getAllCookies = () => {
        var cookies = document.cookie.split(';');
        var cookieObj = {};
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim().split('=');
            var cookieName = cookie[0];
            var cookieValue = cookie[1];
            cookieObj[cookieName] = cookieValue;
        }
        return cookieObj.UsersId;
    }

    const updateCartItem = async (newCartItem) => {
        try {
            // 发送请求将新的购物车商品添加到服务器
            const response = await tutorlink.post("/shoppingcart/addCartItem", newCartItem);

            // 如果成功添加到服务器，更新本地购物车数据
            if (response.status === 200) {
                // 在此处，您可以使用服务器返回的数据更新购物车项的其他属性（例如，服务器可能返回一个新的cartId）
                const addedCartItem = {
                    id: response.data.cartId,
                    title: newCartItem.title,
                    type: newCartItem.type,
                    price: newCartItem.price,
                    img: newCartItem.img,
                    link: '/product/1001112702764163', // 这里可能需要根据实际情况设置
                    count: newCartItem.count,
                    selectedTimes: [], // 根据实际情况设置
                    addTime: new Date(), // 根据实际情况设置
                    status: 1 // 根据实际情况设置
                };

                // 将新的购物车项添加到购物车数组中
                shoppingCartItem.value.push(addedCartItem);
            }
        } catch (error) {
            console.error('添加购物车商品失败:', error);
        }
    };


    return { shoppingCartItem, updateCount, totalPrice, getCurrentCount, removeCartItem, shoppingCartAjax, deleteCartItem, updateCartItem };
});
