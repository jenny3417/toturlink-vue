<template>
    <h1>
        <Ban style="width: 40px; margin: 0 10px;" />檢舉管理
    </h1>
    <div>
        <div class="title">
            檢舉列表
        </div>
        <div class="content">
            <!-- <div class="content-body">
                用戶查詢
                <input type="text">
                <div style="display: flex;">
                    <button type="button" class="btn btn-dark">查詢
                    </button>
                </div>
                <button type="button" class="btn btn-dark">重置</button>
            </div>
            <br> -->
            <div class="col-3">
                <PageSize @pageSizeChange="changeHandler"></PageSize>
            </div>
            <div class="table-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>檢舉編號</th>
                            <th>檢舉人姓名</th>
                            <th>檢舉課程</th>
                            <th>檢舉類型</th>
                            <th>檢舉內容</th>
                            <th>審核狀態</th>
                            <th>審核日期</th>
                            <th>刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in reportList">
                            <td>{{ list.reportId }}</td>
                            <td>{{ list.users.userDetailUserName }}</td>
                            <td>{{ list.lesson.lessonName }}</td>
                            <td>{{ list.reportType }}</td>
                            <td>{{ list.reportContent }}</td>
                            <td><span v-if="list.status == 0" class="report">未審核</span><span v-else
                                    class="isReport">已審核</span>
                            </td>
                            <td v-if="list.status != 0">{{ formatDate(list.processingDate) }}</td>
                            <td v-else>尚未處理</td>
                            <td>X</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging> -->
                <nav aria-label="Page navigation example">
                    <!-- <ul class="pagination">
                        <li class="page-item" @click="clickHandler(value)" v-for="(value, index) in totalPages"
                            :key="index"><a :class="{ 'page-link': true, 'currentPage': datas.start + 1 === value }">{{
                                value }}</a></li>
                    </ul> -->
                </nav>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import { Ban } from "@vicons/ionicons5"
import tutorlink from '@/api/tutorlink.js';
import { ref, onMounted } from 'vue';
const reportList = ref([]);
onMounted(async () => {
    try {
        const response = await tutorlink.get("/report");
        console.log(response.data);
        reportList.value = response.data
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
    
<style scoped>
thead tr th {
    color: white;
    font-weight: bold;
    background-color: #3a4c64;
    text-align: center;

}

tbody tr td {
    padding-left: 1%;
}

.table-body {
    margin-top: 10px;
}

.content-body {
    display: flex;
    align-items: center
}

input {
    margin-left: 10px;
}

button {
    margin-left: 10px;
    padding: 2px 5px 2px 5px;
    display: flex;
    align-items: center
}

h1 {
    margin: 5px 5px 15px 2%;
    padding: 5px;
}

.body {
    display: flex;
    flex-direction: column;
}

.title {
    background-color: #fbfbfb;
    width: 95%;
    margin: 0 auto;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 20px;
}

.content {
    background-color: #fbfbfb;
    width: 95%;
    margin: 0 auto;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 16px;
}

.report {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #ff0054;
    color: #fff;
}

.isReport {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #83c5be;
    color: #fff;
}
</style>