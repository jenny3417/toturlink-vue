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
                    <button type="button" class="btn btn-dark">
                        <SearchCircleSharp style="width:20px;" />查詢
                    </button>
                </div>
                <button type="button" class="btn btn-dark">重置</button>
            </div>
            <div class="table-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>用戶編號</th>
                            <th>用戶信箱</th>
                            <th>用戶密碼</th>
                            <th>用戶姓名</th>
                            <th>用戶身分</th>
                            <th>登入時間</th>
                            <th>審核狀態</th>
                            <th>編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ id }}</td>
                            <td>{{ mail }}</td>
                            <td>{{ pwd }}</td>
                            <td>{{ name }}</td>
                            <td>{{ identity }}</td>
                            <td>{{ logintime }}</td>
                            <td>{{ teacherstate }}</td>
                            <td>{{ edit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import { People, SearchCircleSharp } from "@vicons/ionicons5"
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const loadusers = async () => {
    const API_URL = "/allusers";
    const response = await tutorlink.post(API_URL);
    console.log(response.data);
}
loadusers();

</script>
    
<style scoped>
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