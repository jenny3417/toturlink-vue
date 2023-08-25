<template>
    <navbar></navbar>
    <div class="container scorePage">
        <h1>好評推薦</h1>
        <div class="scoreContent">
            <div class="card mb-3" style="max-width: 100%;" v-for="item in  12 ">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="https://fakeimg.pl/350x180/" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body p-3">
                            <h3 class="card-title">課程名稱<span class="scoreDate">2023/8/24</span><span
                                    v-for="rating in  ratings " :key="rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold"
                                        class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                </span></h3>
                            <p class="card-text">這門課程深入挖掘了現代文學的精髓，讓我對各種文學流派有更深入的理解。教授充滿激情，引導我們探索不同作品背後的意義，雖然有時候閱讀量稍大，但收穫良多。
                            </p>
                            <p class="card-text text-end">學生</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 新增檢舉的按鈕 -->
    <a class="nav-link linkStyle" href="#" type="button" data-bs-toggle="modal" data-bs-target="#scoreEditModal">檢舉</a>
    <div class="modal fade" id="scoreEditModal" tabindex="-1" aria-labelledby="scoreEditModalLabel" aria-hidden="true">
        <scoreedit></scoreedit>
    </div>
</template>
    
<script setup>

import navbar from "../components/Navbar.vue"
import scoreedit from "../components/ScoreEdit.vue";
import { ref } from "vue"

const ratings = ref(5)

</script>
    
<style>
.scorePage {
    margin-top: 100px;
}

.scoreDate {
    font-size: 18px;
    margin-left: 20px;
    margin-right: 20px;
}

.selected {
    color: gold;
}
</style>