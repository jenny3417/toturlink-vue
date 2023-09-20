<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">警告 ! 你正要刪除這門課程</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    你真的要刪除這門課程嗎
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancelbtn" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="deletebtn" data-bs-dismiss="modal" @click="deleteLesson">刪除</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup >
import tutorlink from '@/api/tutorlink.js';
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { lessonId } = defineProps(['lessonId']);
const deleteLesson = async () => {
    console.log('lessonId:', lessonId);

    const requestBody = { lessonId: lessonId }
    console.log(requestBody);
    const response = await tutorlink.delete('/deleteLessons', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    });
    setTimeout(() => {
        router.go();
    }, 100);


};





</script>
    
<style scoped>
.cancelbtn {
    background-color: #fff;
    border: 1px solid #b4b8c0;
    border-radius: 5px;
    color: #b4b8c0;
    width: 120px;
    height: 32px;
}

.cancelbtn:hover {
    background-color: #b4b8c0;
    border: 1px solid #b4b8c0;
    color: #fff;
}

.deletebtn {
    border: 1px solid red;
    color: red;
    border-radius: 5px;
    background-color: #fff;
    width: 120px;
    height: 32px;
}

.deletebtn:hover {
    border: 1px solid red;
    color: #fff;
    background-color: red;
}
</style>