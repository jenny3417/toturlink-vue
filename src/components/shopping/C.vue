<template>
    <button @click="add">123</button>
    {{ shoppingCartItem[index].title }}
    <br>
    {{ "count=" + shoppingCartItem[index].count }}
    <br>
    {{ "selectedTimes=" + shoppingCartItem[index].selectedTimes }}
    <br>
    {{ "selectedTimes=" + shoppingCartItem[index].selectedTimes.length }}
</template>
<script setup>
import { defineProps,onMounted  } from 'vue';
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/useShoppingCartStore'; 
const cartStore = useShoppingCartStore();
const { shoppingCartItem } = storeToRefs(cartStore);


const props = defineProps({
    shoppingCartItem: Array,
    index: Number,
})
const index = props.index;
const selectedTimes = props.shoppingCartItem[index].selectedTimes;
// onMounted(() => {
//     console.log('Props successfully loaded:', selectedTimes, index);
// });

const add = () => { // 通过参数传递 index
    selectedTimes.push(new Date().getTime());
    console.log(selectedTimes);
}

</script>