import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'

export const useShoppingCartStore = defineStore('shoppingCart', () => {

    const shoppingCartItem = ref([]);

    const orderItem = ref([]);

    const refundItem = ref([]);

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
                    status: originalData.status,
                    payment: originalData.payment,
                    lessonId: originalData.lessonId
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    async function orderAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/purchase/all");
                orderItem.value = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    async function refundAjax(userId) {
        if (userId) {
            try {
                const response = await tutorlink.get("/purchase/refund");
                refundItem.value = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    //---------------------------
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

    //訂單總金額-------------------
    const totalPrice = computed(() => {
        return shoppingCartItem.value.reduce((total, item) => {
            const count = isNaN(item.count) ? 1 : item.count;
            return total + item.price * count;
        }, 0);
    });


    //刪除購物車------------------------
    const deleteCartItem = async (cid) => {
        const index = shoppingCartItem.value.findIndex(item => item.id === cid);
        console.log(index);
        if (index !== -1) {
            const id = shoppingCartItem.value[index].id
            shoppingCartItem.value.splice(index, 1);
            try {
                const response = await tutorlink.delete(`/shoppingcart/deleteCartItem/${id}`);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    const convertToBackendFormat = (cartItem) => {
        return {
            cartId: cartItem.id,
            lessonName: cartItem.title,
            lessonType: cartItem.type === 1,
            price: cartItem.price,
            image: cartItem.img,
            quantity: cartItem.count,
            selectedTimes: cartItem.selectedTimes,
            addTime: cartItem.addTime,
            status: cartItem.status,
            payment: cartItem.payment,
            lessonId: cartItem.lessonId
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


    // 綠界傳入的值格式

    //綠界
    const ECpayObj = {
        totalAmount: 50,            // 交易總金額
        tradeDesc: "課程",              // 交易描述
        itemName: "課程",               // 訂單名稱
        returnURL: "http://localhost:5173/member/shoppingcart/step3",              // 交易結果回傳網址
        clientBackURL: "http://localhost:5173/member/shoppingcart/step3",          // 商店轉跳網址
    }



    const pay = () => {
        for (let i = 0; i < shoppingCartItem.value.length; i++) {
            const order = {
                lessonId: shoppingCartItem.value[i].lessonId,
                orderStates: 0,
                cartId: shoppingCartItem.value[i].id,
                createTime: new Date(),
                calender: "",
            }
            const total = totalPrice.value;
            ECpayObj.totalAmount = total.toString();
            // 如果是視訊課程要新增行事曆
            if (shoppingCartItem.value[i].type === 1) {
                for (let j = 0; j < shoppingCartItem.value[i].selectedTimes.length; j++) {
                    order.calender = shoppingCartItem.value[i].selectedTimes[j];
                    ECpay(ECpayObj);
                    sendOrder(order);
                }
            } else {
                ECpay(ECpayObj);
                sendOrder(order);
            }
        }
    }

    const ECpay = async (ECpayObj) => {
        try {
            // 選擇綠界付款後轉址網頁的方法
            console.log(ECpayObj);
            const result2 = await tutorlink.post('/ecpay', JSON.stringify(ECpayObj))
            const newPage = window.open('', '_parent');
            newPage.document.open();
            newPage.document.write(result2.data);
            newPage.document.close();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const sendOrder = async (order) => {
        try {
            const result = await tutorlink.post('/shoppingcart/pay', order)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const applyRefund = async (oId) => {
        try {
            console.log(oId);
            console.log(typeof (oId));
            const result = await tutorlink.put(`/purchase/clickrefund/${oId}`)
            location.reload();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return { shoppingCartItem, updateItemCount, totalPrice, getCurrentCount, shoppingCartAjax, deleteCartItem, getSelectedTimes, getIndex, pay, orderAjax, orderItem, refundAjax, refundItem, applyRefund };
});
