<template>
    <div class="container">
        <div class="card" style="width: 18rem;">
            <img src="@/assets/lessonImage/image.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">XXX老師</h5>
                <div class="card-text">探索攝影藝術的基礎與技巧，解析攝影世界的奧秘與美感，歡迎加入我們的攝影初階入門課程！</div>
                <RouterLink to="/lesson/lessonInterFace">
                    <button type="button" class="checkTeacher">查看教師</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
</script>
    
<style>
.checkTeacher {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border-color: #759df0;
    color: #759df0;
}

.checkTeacher:hover {
    background-color: #759df0;
    color: #fff;
}
</style>