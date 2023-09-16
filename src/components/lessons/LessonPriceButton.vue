<template>
    <div class="container">
        <div style="text-align: center; display: flex; flex-direction: column; margin-top: 24px;">
            <div class="shopping-btn">
                <button type="submit">
                    <div class="price" v-html="priceMultiplier(1)"></div>
                </button>
                <button type="submit">
                    <div class="price" v-html="priceMultiplier(5)"></div>
                </button>
                <button type="submit">
                    <div class="price" v-html="priceMultiplier(10)"></div>
                </button>
            </div>
        </div>
    </div>
</template>
    
<script setup>

const props = defineProps({
    price: {
        type: Number
    }
})
console.log('子套件', props.price);
const priceMultiplier = (multiplier) => {
    const totalPrice = props.price * multiplier;
    return `NT:$${totalPrice}<br>${multiplier}堂課/50分鐘`;
};
</script>
    
<style scoped>
.shopping-btn {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.shopping-btn button {
    border-radius: 15px;
    width: 160px;
    height: 80px;
    background-color: #fff;
}

.shopping-btn button:hover {
    background-color: #edede9;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    /* 这里的阴影样式可以根据你的需求进行调整 */
}
</style>