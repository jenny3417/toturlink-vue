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


    //刪除------------------------------------
    const deleteCartItem = async (cid) => {
        const index = shoppingCartItem.value.findIndex(item => item.id === cid);
        console.log(index);
        if (index !== -1) {
            const id = shoppingCartItem.value[index].id
            shoppingCartItem.value.splice(index, 1);
            try {
                const response = await tutorlink.delete(`/shoppingcart/deleteCartItem/${cid}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }



    // const addToCart = async (newCartItem) => {
    //     try{

    //     } catch (error) {
    //         console.error('添加失敗:', error);
    //     }
    // }


    const updateCount = (item, oldCount) => {
        // 更新購物車項目的數量
        item.count = oldCount;
        if (item.selectedTimes.length > oldCount) {
            item.selectedTimes = [];
        }
        updateCartItem();
    };

    // const updateCartItem = async (newCartItem) => {
    //     try {
    //         // 发送请求将新的购物车商品添加到服务器
    //         const response = await tutorlink.post("/shoppingcart/addCartItem", newCartItem);

    //         // 如果成功添加到服务器，更新本地购物车数据
    //         if (response.status === 200) {
    //             // 在此处，您可以使用服务器返回的数据更新购物车项的其他属性（例如，服务器可能返回一个新的cartId）
    //             const addedCartItem = {
    //                 id: response.data.cartId,
    //                 title: newCartItem.title,
    //                 type: newCartItem.type,
    //                 price: newCartItem.price,
    //                 img: newCartItem.img,
    //                 link: '/product/1001112702764163', // 这里可能需要根据实际情况设置
    //                 count: newCartItem.count,
    //                 selectedTimes: [], // 根据实际情况设置
    //                 addTime: new Date(), // 根据实际情况设置
    //                 status: 1 // 根据实际情况设置
    //             };

    //             // 将新的购物车项添加到购物车数组中
    //             shoppingCartItem.value.push(addedCartItem);
    //         }
    //     } catch (error) {
    //         console.error('添加购物车商品失败:', error);
    //     }
    //     console.log(123);
    // };


    return { shoppingCartItem, updateCount, totalPrice, getCurrentCount, shoppingCartAjax, deleteCartItem };
});
