<template>
    <h3>基本資料</h3>
    <span>姓名:</span><n-input v-model:value="value" type="text" />
    <span>身分證字號:</span><n-input v-model:value="value" type="text" />
    <span>身分證照片:</span>
    <n-upload multiple="false" :default-file-list="fileList" list-type="image-card" :max="1"
        :image-group-props="{ width: '1000px' }">
        正面
    </n-upload>
    <br>
    <n-upload multiple="false" :default-file-list="fileList" list-type="image-card" :max="1" width="300" height="200">
        反面
    </n-upload>
    <br>
    <span>審核狀態</span>
</template >
  
<script>
</script>
<style>
.n-space {
    font-weight: bold;
    vertical-align: bottom;
}
</style>
