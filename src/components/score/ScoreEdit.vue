<template>
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#scoreEditModal">新增評分</a>
    <div class="modal fade modal-lg" id="scoreEditModal" tabindex="-1" aria-labelledby="scoreEditModalLabel"
        aria-hidden="true" width="900">
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
                                <div v-for="tag in tags" class="scoreLabel" :class="[{ 'selectedTag': isTagSelected(tag) }]"
                                    @click="toggleTag(tag)">
                                    {{ tag }}</div>
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
                                <textarea class="form-control scoreText" id="floatingScore" v-model="experience"></textarea>
                            </div>
                        </div>


                    </div>
                </div>


                <div class="submitBtn">
                    <button type="button" class="btn btn-secondary submitBtnStyle" data-bs-dismiss="modal"
                        @click="submitScore">送出</button>
                    <button type="button" class="btn btn-primary submitBtnStyle" data-bs-dismiss="modal">取消</button>
                </div>


            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
import tutorlink from '../../api/tutorlink'
import { format } from 'date-fns';


const tags = ref(['氣氛輕鬆', '可以用英文講解', '初學者適合', '很好聊天', '教學熱忱', '課程安排嚴謹', '有出作業及考試'])
const userSelectTags = ref([])
const ratings = ref(5);
const selectedRating = ref(5);
const experience = ref('')
const date = ref('')

const toggleTag = (tag) => {
    if (isTagSelected(tag)) {
        removeTag(tag);
    } else {
        selectTag(tag);
    }
}
const selectTag = (tag) => {
    userSelectTags.value.push(tag)
}
const removeTag = (tag) => {
    const index = userSelectTags.value.indexOf(tag);
    if (index !== -1) {
        userSelectTags.value.splice(index, 1);
    }
}
const isTagSelected = (tag) => {
    return userSelectTags.value.includes(tag);
}


const setRating = (rating) => {
    selectedRating.value = rating;
}
const currentTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
}

const submitScore = () => {
    date.value = currentTime();
    let obj = {
        // 陣列轉字串

        rateTags: userSelectTags.value.join(','),
        rate: selectedRating.value,
        rateContent: experience.value,
        createTime: date.value
        // 字串轉陣列
        // .split(',')
    }
    const jsonData = JSON.stringify(obj);
    //請求寫這裡
    const fetchData = async () => {
        try {
            const response = await tutorlink.post("/comment", jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}
</script>
    
<style scoped>    .scoreLabel {
        background-color: gray;
        color: white;
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

    .selectedTag {
        background-color: #ffe5ec;
        color: #9d8189;
    }
</style>