<template>
    <h1>
        <People style="width: 40px; margin: 0 10px;" />用戶管理
    </h1>
    <div>
        <div class="title">
            用戶列表
        </div>
        <div class="content">
            <div class="content-body">
                用戶查詢
                <input type="text">
                <div style="display: flex;">
                    <button type="button" class="btn btn-dark">查詢
                    </button>
                </div>
                <button type="button" class="btn btn-dark">重置</button>
            </div>
            <br>
            <div class="col-3">
                <PageSize @pageSizeChange="changeHandler"></PageSize>
            </div>
            <div class="table-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>課程編號</th>
                            <th>課程類別</th>
                            <th>老師姓名</th>
                            <th>課程名稱</th>
                            <th>上課方式</th>
                            <th>課程價格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="{ UsersId, UserEmail, UserPassword, UserName, UserType, LastLoginTime, TeacherState } in users">
                            <td>{{ UsersId }}</td>
                            <td>{{ UserType }}</td>
                            <td>{{ UserName }}</td>
                            <td>{{ UserEmail }}</td>
                            <td>{{ LastLoginTime }}</td>
                        </tr>
                    </tbody>
                </table>
                <Paging :totalPages="totalPages" :thePage="datas.start + 1" @childClick="clickHandler"></Paging>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" @click="clickHandler(value)" v-for="(value, index) in totalPages"
                            :key="index"><a :class="{ 'page-link': true, 'currentPage': datas.start + 1 === value }">{{
                                value }}</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import { People } from "@vicons/ionicons5"
import tutorlink from '@/api/tutorlink.js';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import Paging from "../manager/Paging.vue";
import PageSize from "../manager/PageSize.vue";


// 分頁用變數
const totalPages = ref(0);
const datas = reactive({
    start: 0,
    rows: 0,
    sortType: "id",
});

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
</style>