<template >
    <div class="ansWrap">
        <n-card hoverable>
            <n-collapse>
                <p>來自 王一 於 2023/01/01 00:00 :</p>
                <p>為什麼1+1等於2</p>
                <hr>
                <div class="queWrap">
                    <textarea rows="4" placeholder="在這裡輸入回應...."></textarea>
                    <n-space justify="right">
                        <n-button strong secondary type="primary">
                            送出
                        </n-button>
                    </n-space>

                </div>
            </n-collapse>
        </n-card>
    </div>
</template>

<script setup>

</script>

<style scoped>
.ansWrap {}

textarea {
    width: 100%;
}

.n-button {
    display: block;
    padding: 0 100px;
    margin-top: 20px;
}
</style>