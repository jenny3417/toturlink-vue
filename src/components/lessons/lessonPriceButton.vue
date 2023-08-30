<template>
    <div class="container">
        <div style="text-align: center;">
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
    
<script setup lang='ts'>
const basePrice = 324;

const priceMultiplier = (multiplier: number): string => {
    const totalPrice = basePrice * multiplier;
    return `NT:$${totalPrice}<br>${multiplier}堂課/50分鐘`;
};
</script>
    
<style>



</style>