<template>
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#insertReportModal">新增檢舉</a>
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
                                    <option value="爛">教得有夠爛</option>
                                    <option value="翹課">老師沒來上課</option>
                                    <option value="抄襲">假影片或是抄襲</option>
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

const submitReport = () => {
    let obj = {
        reportType: reportType.value,
        reportContent: reportContent.value
    }

    // 請求寫這裡

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