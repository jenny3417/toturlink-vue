<template>
    <div class="container">
        <h2>相似教師推薦</h2>
        <div class="carousel-container">
            <div id="carouselLessonControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="card-group">
                            <div class="card" style="width: 18rem;">
                                <img src="@/assets/lessonImage/test.jpg" class="img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">XXX老師</h5>
                                    <div class="card-text">課程1：基礎寫作技巧
                                        培養寫作基本功，提升表達能力。
                                    </div>
                                    <button type="button" class="suggetTeacher">查看老師</button>
                                </div>
                            </div>

                            <div class="card" style="width: 18rem;">
                                <img src="@/assets/lessonImage/image.png" class="img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">XXX老師</h5>
                                    <div class="card-text">課程2：數位攝影入門
                                        掌握攝影基本，拍出美麗照片。
                                    </div>
                                    <button type="button" class="suggetTeacher">查看老師</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="card-group">
                            <div class="card" style="width: 18rem;">
                                <img src="@/assets/lessonImage/test.jpg" class="img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">XXX老師</h5>
                                    <div class="card-text">課程3：健康烹飪秘訣
                                        學習簡單健康料理，養成飲食好習慣。</div>
                                    <button type="button" class="suggetTeacher">查看老師</button>
                                </div>
                            </div>

                            <div class="card" style="width: 18rem;">
                                <img src="@/assets/lessonImage/image.png" class="img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">XXX老師</h5>
                                    <div class="card-text">課程4：初級西班牙語
                                        入門西班牙語，開啟多語對話之門。</div>
                                    <button type="button" class="suggetTeacher">查看老師</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselLessonControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselLessonControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.carousel-inner {
    max-height: 400px;
}

.card-group {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}

.card {
    flex: 1;
    width: 18rem;
    margin-right: 48px;
}

.carousel {
    max-width: 600px;
    margin: 0 auto;
}

.card-body {
    text-align: center;
}

.card-text {
    border: 1px solid silver;
}

.img-top {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 16px;
}

.card-body button {
    margin-top: 8px;
}

.suggetTeacher {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    background-color: #fff;
    border-color: #759df0;
    color: #759df0;
}

.suggetTeacher:hover {
    background-color: #759df0;
    color: #fff;
}
</style>