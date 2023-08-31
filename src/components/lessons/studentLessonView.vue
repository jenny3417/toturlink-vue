<template>
    <div id="container">
        <button type="button" class="card-button" data-bs-toggle="modal" data-bs-target="#statusModal">
            <div class="card" style="max-width: 800px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../../assets/lessonImage/image-outline.svg" class="img-fluid rounded-start" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">創意寫作初階</h5>
                            <p class="card-text">
                                透過實用策略與啟發性練習，培養學生寫作技巧。探索不同文類，從故事到詩歌，啟發創意思維，提升表達能力。討論構思、結構、修辭，並分享互評，打造豐富多元的文字世界。</p>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>

    <lessonStatus></lessonStatus>
</template>
    
<script setup >
import lessonStatus from '@/lessons/lessonStatus.vue';
</script>
    
<style scoped>
.card-button {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    display: block;
    width: fit-content;
    margin: auto;
    overflow: hidden;
    /* Prevent card overflow */

    /* Add box shadow for normal state */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    border-radius: 8px;
    margin-top: 16px;
}

.card-button:hover {
    /* Increase box shadow on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.img-fluid {
    height: 160px;
}
</style>

