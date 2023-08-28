<template>
    <div class="info-title">
        <div style="display: flex;">
            <img src="../../assets/icon/user.png">
            <h3>姓名</h3>
        </div>
        <br>
        <p>個人資料(保護資料安全，輸入密碼即可檢視)</p>
        <div class="owenr">
            註冊信箱:<input type="text"><br>
            姓名:<input type="text"><br>
            生日:<input type="text"><br>
            手機:<input type="text"><br>
            居住地:<input type="text"><br>
        </div>
        <hr>
        <p>更改密碼(至少需要8格字元，包含英文及數字)</p>
        舊密碼:<input type="text"><br>
        新密碼:<input type="text"><br>
        確認密碼:<input type="text"><input type="button" value="修改密碼">
        <hr>
        <p>第三方帳號登入管理</p>
        <p><img src="../../assets/icon/search.png"> Google登入</p>
        <p><img src="../../assets/icon/facebook.png"> FaceBook登入</p>
        <p><img src="../../assets/icon/apple.png"> Apple登入</p>
        <p><img src="../../assets/icon/line.png"> Line登入</p>
    </div>
</template>
<script></script>
<style>
.info-title {
    display: inline;
    color: black;
    border-color: white;
    vertical-align: middle;
    font-weight: bold;
}

.info-title img {
    width: 36px;
}

.info-title h3 {
    margin: 0;
    padding: 0;
    color: black;
}

.info-title .owenr {
    padding: 5px;
    background-color: rgb(218, 218, 216);
    color: black;
}

.info-title input {
    margin: 5px;
    /* border-radius: 5px; */
    border: 1px solid rgb(14, 13, 13);
    padding: 2px;
    color: black;
}

.info-title p {
    color: black;
}
</style>