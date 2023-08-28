<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="text-center">
                    <h1 class="modal-title fs-2" id="scoreEditModalLabel">給予評分</h1>
                </div>
                <div class="container">
                    <div class="d-flex row my-5">
                        <div class="col-3 fs-4 text-end">標籤：</div>
                        <div class="scoreLabelStyle col-9 d-flex flex-wrap">
                            <div v-for="item in 12" class="scoreLabel">氣氛輕鬆</div>
                        </div>
                    </div>
                    <div class="d-flex row my-5">
                        <div class="col-3 fs-4 text-end">評分：</div>
                        <div class="scoreLabelStyle col-9"><span v-for="rating in  ratings " :key="rating"
                                class="rateStyle">
                                <svg xmlns="http://www.w3.org/2000/svg" @click="setRating(rating)"
                                    :class="{ 'selected': rating <= selectedRating }" width="16" height="16" fill="gray"
                                    class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </span></div>

                    </div>
                    <div class="d-flex row my-5">
                        <div class="col-3 fs-4 text-end">心得：</div>
                        <div class="scoreLabelStyle col-9 ">
                            <textarea class="form-control scoreText" id="floatingScore"></textarea>
                        </div>
                    </div>


                </div>
            </div>


            <div class="submitBtn">
                <button type="button" class="btn btn-secondary submitBtnStyle" data-bs-dismiss="modal">送出</button>
                <button type="button" class="btn btn-primary submitBtnStyle" data-bs-dismiss="modal">取消</button>
            </div>


        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
const ratings = ref(5);
const selectedRating = ref(5);

const setRating = (rating) => {
    selectedRating.value = rating;
}
</script>
    
<style scoped>    .scoreLabel {
        background-color: #ffe5ec;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 15px;
        display: block;
    }

    .rateStyle {
        margin: 2px;
    }

    .scoreText {
        height: 100px;
        width: 85%;
    }

    .submitBtn {
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .submitBtnStyle {
        margin: 5px;
    }

    .selected {
        fill: gold;
    }
</style>