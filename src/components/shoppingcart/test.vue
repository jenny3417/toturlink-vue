<template>
    <div class="card px-0">
        <div class="cart-header-gold cart-list-header">
            <div class="row px-0 mx-0">
                <div class="product-info-title col-10 col-lg-6 offset-1 offset-md-0 item-center mx-0">
                    商品資訊</div>
                <div class="col-1 item-center p-0 d-none d-lg-flex">優惠價</div>
                <div class="col-2 item-center p-0 d-none d-lg-flex">數量</div>
                <div class="col-1 item-center p-0 d-none d-lg-flex">總計</div>
                <div class="col-2 item-center p-0 d-none d-lg-flex"></div>
            </div>
        </div>
        <div class="content-with-loading card-body">
            <div class="cart-item-row row divider-line"><!-- 主圖＋介紹-->
                <div class="col-12 col-lg-6 px-2 px-lg-3">
                    <div class="main d-flex">
                        <div class="cart-item-image"><a href="/product/1001112702764163" class=""
                                title="原子習慣: 細微改變帶來巨大成就的實證法則" target="_self" data-test-id="image-link"><img
                                    data-src="https://s2.eslite.dev/unsafe/fit-in/x150/s.eslite.dev/upload/product/o/2681759319001/ec1760858.jpg"
                                    src="https://s2.eslite.dev/unsafe/fit-in/x150/s.eslite.dev/upload/product/o/2681759319001/ec1760858.jpg"
                                    lazy="loaded"></a></div>
                        <div class="cart-item-description ps-3"><a href="/product/1001112702764163" class=""
                                title="原子習慣: 細微改變帶來巨大成就的實證法則" target="_self" data-test-id="text-link"><span
                                    class="product-name fw-bold">原子習慣:
                                    細微改變帶來巨大成就的實證法則</span></a><!--v-if--><!-- 商品提示：預購、非預購等。--><!-- 購物車階活動-->
                            <div class="activities mt-1" data-test-id="activity"><a href="https://www.eslite.com/"
                                    target="_self" title="9/17前｜全站滿1200送美德醫用口罩5入/包" class="d-flex link-display">
                                    <div class="icon-content"><span class="icon-fa-shopping-cart"></span></div>
                                    <div class="activity-wording"><span class="ms-1">9/17前｜全站滿1200送美德醫用口罩5入/包</span></div>
                                </a></div>
                            <div class="activities mt-1" data-test-id="activity"><a
                                    href="https://www.eslite.com/exhibitions/CU202307-00175" target="_self"
                                    title="【夏，無厭。】 圓神叩應生活書展雙書再95折" class="d-flex link-display">
                                    <div class="icon-content"><span class="icon-fa-shopping-cart"></span></div>
                                    <div class="activity-wording"><span class="ms-1">【夏，無厭。】 圓神叩應生活書展雙書再95折</span></div>
                                </a></div>
                        </div>
                    </div>
                </div><!-- 優惠價格-->
                <div
                    class="offset-8 offset-lg-0 col-4 col-lg-1 p-0 text-lg-center text-end my-auto pe-2 pe-lg-0 pt-2 pt-lg-0">
                    <span class="cart-price-black">261</span>
                </div><!-- 數量-->
                <div class="align-self-center col-8 col-lg-2 p-0 margin-top">
                    <div class="count-plus-minus quantity ps-2 ps-lg-0" title="原子習慣: 細微改變帶來巨大成就的實證法則">
                        <div class="number-group">
                            <button class="number-less" type="button" disabled="" aria-label="減少數量"
                                data-test-id="count-minus"
                                style="background: rgb(221, 221, 221); color: rgb(34, 34, 34); opacity: 0.5;">
                                <i class="icon icon-minus"></i>
                            </button>
                            <input class="number-view" type="number" maxlength="3" pattern="\d*"
                                aria-label="數量" data-test-id="count-input">
                            <button class="number-plus" aria-label="增加數量" data-test-id="count-plus">
                                <i class="icon icon-plus"></i>
                            </button><!--v-if-->
                        </div>
                    </div><!--v-if-->
                </div><!-- 小計-->
                <div class="col-4 sub-total p-0 margin-top text-end my-auto pe-2 pe-lg-0 col-lg-1"><span
                        class="cart-price-red">261</span></div>
                <div class="col-12 col-lg-2 p-0 operation margin-top">
                    <div class="text-d-gray-6 cursor-pointer" data-test-id="delete-button">
                        <span class="icon-fa-times-circle"></span><span class="ms-1">刪除商品</span>
                    </div>
                    <div class="text text-mark"></div>
                    <div class="text-d-gray-6 cursor-pointer" data-test-id="collect-button">
                        <span class="icon-fa-heart"></span><span class="ms-1">移至收藏</span>
                    </div>
                </div><!-- 贈品-->
            </div><!-- 分隔線--><!--v-if--><!-- 小計-->
            <div class="row d-flex align-items-center">
                <div class="col-12 col-lg-7"><span class="split-product-alert">※
                        訂單商品如包含預購商品，則會於商品全數到齊後一起出貨；且若訂單商品有材積限制或倉別不同時，亦有可能會分批出貨。實際狀況請於「我的訂單」中查詢</span></div>
                <div class="col-8 col-lg-2 d-flex justify-content-end justify-content-lg-center"><span
                        class="nowrap">商品小計</span></div>
                <div class="col-4 col-lg-3 text-end text-sm-start sub-total-wrapper"><span
                        class="cart-price-red sub-total">261</span></div>
            </div><!--v-if-->
        </div>
    </div>
</template>
<style></style>