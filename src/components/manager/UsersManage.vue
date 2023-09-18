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
                            <th>用戶編號</th>
                            <th>用戶身分</th>
                            <th>用戶姓名</th>
                            <th>用戶信箱</th>
                            <th>最近登入</th>
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
import Paging from "../manager/Paging.vue";
import PageSize from "../manager/PageSize.vue";

const users = ref([])

// 分頁用變數
const totalPages = ref(0);
const datas = reactive({
    start: 0,
    rows: 0,
    sortType: "id",
});


const loadusers = async () => {
    const API_URL = "/allusers";
    const response = await tutorlink.post(API_URL, datas);
    //取得所有用戶放進users變數
    users.value = response.data.user;
    // 計算總共幾頁
    totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows)
    console.log(response.data)
    console.log("totalPages：", totalPages.value)
}

//paging 由子元件觸發
const clickHandler = page => {
    datas.start = page - 1
    loadusers()
}

//一頁幾筆資料
const changeHandler = value => {
    datas.rows = value
    datas.start = 0
    console.log("pagesize：", datas)
    loadusers()
}

loadusers();

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