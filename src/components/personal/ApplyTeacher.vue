<template>
    <h3>基本資料</h3>
    <span>姓名:</span><n-input v-model:value="value" type="text" />
    <span>註冊信箱:</span><n-input v-model:value="value" type="text" />
    <span>身分證字號:</span><n-input v-model:value="value" type="text" />
    <span>出生年月日:</span><n-date-picker v-model:value="timestamp" type="date" />
    <span>居住地:</span><n-input v-model:value="value" type="text" />
</template >
  
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            timestamp: ref(118313526e4)
        };
    }
});
</script>
<style>
.n-space {
    font-weight: bold;
    vertical-align: bottom;

}

.n-space span {
    vertical-align: bottom;
}
</style>
