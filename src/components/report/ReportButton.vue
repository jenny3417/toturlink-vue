<template>
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#insertReportModal">新增檢舉</a>
    <div class="modal fade modal-lg" id="insertReportModal" tabindex="-1" aria-labelledby="scoreEditModalLabel"
        aria-hidden="true" width="900">
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
                            <div class="col-3 fs-4 text-end">標籤：</div>

                        </div>
                        <div class="d-flex row my-5">
                            <div class="col-3 fs-4 text-end">評分：</div>


                        </div>
                        <div class="d-flex row my-5">
                            <div class="col-3 fs-4 text-end">心得：</div>
                        </div>


                    </div>
                </div>


                <div class="submitBtn">
                    <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">送出</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">取消</button>
                </div>


            </div>
        </div>
    </div>
</template>
    
<script setup>

</script>
    
<style></style>