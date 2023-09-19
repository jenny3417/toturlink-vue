<template>
    <h1>
        <BarChart style="width: 40px; margin: 0 10px;" />營收管理
    </h1>
    <div>
        <div class="d-flex my-4 justify-content-center">
            <div class="revenue mx-4 p-3 text-center">
                <h3>總營收</h3>
                <div>
                    <div id="chart"></div>
                </div>
            </div>
            <div class="revenue p-3 text-center">
                <h3>分類營收</h3>
                <div></div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="revenue mx-4 p-3 text-center">
                <h3>營收成長</h3>
                <div></div>
            </div>
            <div class="revenue p-3 text-center">
                <h3>最新訂單</h3>
                <div></div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import { ref, onMounted } from 'vue';
import { BarChart } from "@vicons/ionicons5"
import c3 from 'c3';
import 'c3/c3.css';

const chartElement = ref(null);

onMounted(() => {
    createChart(chartElement.value);
});

function createChart(element) {
    // 这里你可以定义你的图表数据和配置
    const chart = c3.generate({
        bindto: "#chart",
        data: {
            columns: [
                ['總營收', 30],
                ['利潤', 120],
            ],
            type: 'donut',
        }
    });
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

.revenue {
    background-color: rgb(181, 175, 168);
    border-radius: 10px;
    width: 45%;
    height: 350px;
}
</style>