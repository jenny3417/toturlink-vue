<template>
    <div class="modal fade modal" id="insertReportModal" tabindex="-1" aria-labelledby="insertReportModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <h1 class="modal-title fs-2" id="insertReportModalLabel">檢舉</h1>
                    </div>
                    <div class="container">
                        <div class="d-flex row my-5">
                            <div class="col-3 fs-4 text-end">類型：</div>
                            <div class="col-9"><select class="form-select" v-model="reportType">
                                    <option selected hidden>請選擇</option>
                                    <option value="騷擾、毀謗或言語攻擊">騷擾、毀謗或言語攻擊</option>
                                    <option value="不準時提供課程">不準時提供課程</option>
                                    <option value="課程規劃不當">課程規劃不當</option>
                                </select></div>


                        </div>
                        <div class="d-flex row my-5">
                            <div class="col-3 fs-4 text-end">內容：</div>
                            <div class=" col-9 ">
                                <textarea class="form-control" id="floatingScore" v-model="reportContent"></textarea>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="submitBtn">
                    <button type="button" class="btn btn-secondary submitBtnStyle" data-bs-dismiss="modal"
                        @click="submitReport">送出</button>
                    <button type="button" class="btn btn-primary submitBtnStyle" data-bs-dismiss="modal">取消</button>
                </div>


            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue';

const reportType = ref('');
const reportContent = ref('');
const date = ref('')
import tutorlink from '../../api/tutorlink'

const currentTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
}
const submitReport = () => {
    date.value = currentTime();
    let obj = {
        reportType: reportType.value,
        reportContent: reportContent.value,
        createTime: date.value
    }
    const jsonData = JSON.stringify(obj);
    const fetchData = async () => {
        try {
            const response = await tutorlink.post("/report", jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();

}
</script>
    
<style scoped>
.submitBtn {
    margin: 0 auto;
    margin-bottom: 20px;
}

.submitBtnStyle {
    margin: 5px;
}
</style>