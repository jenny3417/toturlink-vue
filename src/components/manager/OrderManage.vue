<template>
<h1>
        <Ban style="width: 40px; margin: 0 10px;" />訂單管理
    </h1>
    <div>
        <div class="title">
            檢舉列表
        </div>
        <div class="content">
            <div class="col-3">
                <PageSize @pageSizeChange="changeHandler"></PageSize>
            </div>
            <div class="table-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>課程名稱</th>
                            <th>課程類型</th>
                            <th>購買人</th>
                            <th>訂單金額</th>
                            <th>訂單成立日期</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in orderList">
                            <td>{{ list.orderId }}</td>
                            <td>{{ list.lessonName }}</td>
                            <td>{{ list.lessonType ? '視訊課程' : '影音課程' }}</td>
                            <td>{{ list.uerName }}</td>
                            <td>{{ list.price }}</td>
                            <td>{{ formatDate(list.createTime) }}</td>
        
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                </nav>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import tutorlink from '@/api/tutorlink.js';
import { ref, onMounted } from 'vue';
const orderList = ref([]);
onMounted(async () => {
    try {
        const response = await tutorlink.get("/purchase/manager/all");
        console.log(response.data);
        orderList.value = response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})
const formatDate = (date) => {
    var processingDate = new Date(date);
    var year = processingDate.getFullYear();
    var month = (processingDate.getMonth() + 1).toString().padStart(2, '0');
    var day = processingDate.getDate().toString().padStart(2, '0');
    var hours = processingDate.getHours().toString().padStart(2, '0');
    var minutes = processingDate.getMinutes().toString().padStart(2, '0');
    var localFormat = `${year}/${month}/${day} ${hours}:${minutes}`;
    return localFormat;
}
</script>
    
<style scoped></style>