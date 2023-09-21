<template>
    <div class="card cardStyle mb-4" style="width: 674px;" v-for="list in favoriateList">
        <div class="deleteBtn" @click="unfavoriate(list.favoriteId)">
            <n-icon size="20">
                <close />
            </n-icon>
        </div>
        <div class="row g-0 align-items-center">
            <div class="cartImgStyle col-md-4">
                <img :src="str + list.lessonUrl" class="card-img-top cardImg img-fluid" alt="...">
            </div>
            <div class="col-md-8">
                <div class=" card-body text-start">
                    <h5 class="card-title cardTitle">{{ list.lessonName }}</h5>
                    <div class="card-title">{{ list.teacherName }}</div>

                </div>
                <div class="card-body text-end">
                    <RouterLink to="/lesson/lessonInterFace">
                        <button type="button" class="btn btn-sm checkTeacher">看詳細>></button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue'
import { Close } from '@vicons/ionicons5'
import tutorlink from '../../api/tutorlink'
import { useFavoriateListStore } from '../../stores/useFavoriateListStore.js'
import { storeToRefs } from 'pinia'
const userID = ref("");
const str = ref('data:imagae/png;base64,');


// pinia
const favoriateListStore = useFavoriateListStore()
const { favoriateListAjax } = favoriateListStore
const { favoriateList } = storeToRefs(favoriateListStore)
onMounted(async () => {
    getAllCookies()
    favoriateListAjax(userID.value)
});



// 刪除收藏
const unfavoriate = async (lid) => {
    const index = favoriateList.value.findIndex(item => item.favoriteId === lid);
    if (index !== -1) {
        const favoriteId = favoriateList.value[index].favoriteId
        favoriateList.value.splice(index, 1);
        try {
            const response = await tutorlink.delete(`favorite?id=${favoriteId}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}


// 取得cookies
const getAllCookies = () => {
    var cookies = document.cookie.split(';');
    var cookieObj = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim().split('=');
        var cookieName = cookie[0];
        var cookieValue = cookie[1];
        cookieObj[cookieName] = cookieValue;
    }
    userID.value = cookieObj.UsersId;
}

</script>
    
<style scoped>
.cardStyle {
    /* background-color: #ecf8f8; */
    max-height: 430px;
    border-radius: 15px;
}

.favoriateIcon {
    display: inline;
    position: absolute;
    top: -60px;
    transition: .3s;
    left: 235px;
    color: #f28482;
}

.cardTitle {
    color: #9d8189;
    font-weight: 500;
    font-size: 26px;
}

.cartImgStyle,
.cardStyle {
    overflow: hidden;
}

.cardImg {
    object-position: center center;
    max-width: 100%;
    max-height: 100%;
    transition: .3s;
}

.cardImg:hover,
.favoriateIcon:hover+.cardImg {
    transform: scale(1.1, 1.1);
}

.cardImg:hover+.favoriateIcon,
.favoriateIcon:hover {
    top: 3px;
}

.cardText {
    font-size: 16px;
}

.checkTeacher:hover {
    color: #9d8189;
}

.deleteBtn {
    color: #f28482;
    display: inline;
    position: absolute;
    top: 10px;
    right: 25px;
}

.deleteBtn:hover {
    color: red;
}
</style>