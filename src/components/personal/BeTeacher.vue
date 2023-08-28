<template>
    <div class="teacher">
        <div class="title">
            <img src="../../assets/icon/bell.png">
            <h3>申請成為老師</h3>
        </div>
        <p>
            歡迎熱情、有經驗且充滿教育熱忱的您加入我們的教師團隊！您將與我們共同致力於培育未來，啓發學生成長。
        </p>
        <p>
            立即申請，一同開創優質教育之路！
        </p>
        <a href="/teacher">
            <button class="btnStyle" @click="">＞＞＞　　申請教師　　＜＜＜ </button>
        </a>

    </div>
</template>
    
<script setup lang='js'>

</script>
    
<style>
.teacher {
    width: 50%;
    margin: 100px auto;
    border: 3px solid rgb(174, 174, 174);
    border-radius: 10px;
    padding: 25px;
    background-color: antiquewhite;
}

.title {
    display: flex;
    align-items: center;
    justify-content: flex-start
}

.teacher p {
    padding: 0 75px;
    margin: 5px 0px;
    color: black;
    font-weight: bold;
    /* padding-left: 25px; */
}

.teacher h3 {
    color: black;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
}

.teacher img {
    width: 40px;
    margin-right: 10px;
    margin-left: 25px;
}

.btnStyle {
    display: block;
    width: 90%;
    margin: 20px auto;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 20px;
    border-width: 3px;
    color: #fff;
    background: #dc3545;
    border: #dc3545;
    border-radius: 5px;
}

.btnStyle:hover {
    color: #bb2d3b;
    background: #fff;
    border-color: #b02a37;
}
</style>