<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in teacherCard" :key="slide">
            <div class="card cardStyle" style="width: 18rem;">
                <div class="cartImgStyle">
                    <img :src="slide.lessonImg" class="card-img-top cardImg" alt="...">
                    <div class="favoriateIcon">
                        <n-icon size="40" v-if="favoriateHover(slide.lessonId)" @click="unfavoriate(slide.lessonId)">
                            <heart />
                        </n-icon>
                        <n-icon size="40" v-else @click="favoriate(slide.lessonId)">
                            <heart-outline />
                        </n-icon>

                    </div>
                </div>
                <div class=" card-body text-start">
                    <h5 class="card-title cardTitle">{{ slide.className }}</h5>
                    <div class="card-text cardText">{{ slide.teacherInfo }}</div>

                </div>
                <div class="card-body text-end">
                    <RouterLink to="/lesson/lessonInterFace">
                        <button type="button" class="btn btn-sm checkTeacher">看詳細>></button>
                    </RouterLink>
                </div>
            </div>
        </Slide>

        <template #addons>

        </template>
    </Carousel>
</template>
    
<script setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { ref } from 'vue'
// import image from '@/assets/lessonImage/image-outline.svg'
import { Heart, HeartOutline } from '@vicons/ionicons5'
import tutorlink from '../../api/tutorlink'
import { useNotification } from 'naive-ui'

const notification = useNotification()

const loginTip = () => {
    notification["warning"]({
        content: '提示',
        meta: '請先登入',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right",
    })
}
const isFavoriate = () => {
    notification["success"]({
        content: '提示',
        meta: '已加入收藏',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right"
    })
}


const unFavoriate = () => {
    notification["success"]({
        content: '提示',
        meta: '已取消收藏',
        duration: 2500,
        keepAliveOnHover: true,
        placement: "bottom-right"
    })
}




const favoriateList = ref([])
const userID = ref("");
const teacherCard = ref([
    {
        lessonId: 1,
        lessonImg: 'https://picsum.photos/200/150?random=1',
        className: '課程名稱',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    },
    {
        lessonId: 2,
        lessonImg: 'https://picsum.photos/200/150?random=2',
        className: '課程名稱2',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    },
    {
        lessonId: 3,
        lessonImg: 'https://picsum.photos/200/150?random=3',
        className: '課程名稱3',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    },
    {
        lessonId: 4,
        lessonImg: 'https://picsum.photos/200/150?random=4',
        className: '課程名稱4',
        teacherInfo: '探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！'
    },
])

const currentTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
}


// 新增收藏
const favoriate = async (lid) => {
    if (userID.value) {
        let obj = { "time": currentTime() };
        const jsonData = JSON.stringify(obj);
        try {
            const response = await tutorlink.post(`favorite?lid=${lid}&uid=${userID.value}`, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            favoriateList.value.push(response.data)
            isFavoriate()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        loginTip()
    }
}

// 判斷是否有收藏
const favoriateHover = (lid) => {
    return favoriateList.value.some(item => item.lesson.lessonId === lid);
}

// 刪除收藏
const unfavoriate = async (lid) => {
    const index = favoriateList.value.findIndex(item => item.lesson.lessonId === lid);
    if (index !== -1) {
        // console.log(favoriateList.value[index].favoriteId);
        const favoriteId = favoriateList.value[index].favoriteId
        favoriateList.value.splice(index, 1);
        try {
            const response = await tutorlink.delete(`favorite?id=${favoriteId}`);
            // console.log(response);
            unFavoriate()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}


// 收藏初始化
const favoriateData = async () => {
    getAllCookies()
    if (userID.value) {
        try {
            const response = await tutorlink.get("/favorite?uid=" + userID.value);
            favoriateList.value = response.data
            // console.log(favoriateList.value);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};
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

favoriateData()



import 'vue3-carousel/dist/carousel.css'
const settings = {
    itemsToShow: 1,
    snapAlign: 'center',
};

const breakpoints = {

    // 400: {
    //     itemsToShow: 1,
    //     snapAlign: 'center',
    // },
    770: {
        itemsToShow: 1,
        snapAlign: 'center',
    },
    1000: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    1300: {
        itemsToShow: 3,
        snapAlign: 'start',
    },
    1500: {
        itemsToShow: 4,
        snapAlign: 'start',
    },
};


// 測試行事曆Pinia
import { useCalenderStore } from '../../stores/useCalenderStore.js'
import { storeToRefs } from 'pinia'
const calenderStore = useCalenderStore()

const { calenderAjax } = calenderStore
//  先帶入使用者假ID 
calenderAjax(3)

const { userCalender } = storeToRefs(calenderStore)


</script>
    
<style scoped>
/* .checkTeacher {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border-color: #759df0;
    color: #759df0;
} */
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
    color: antiquewhite;
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
</style>