<template>
    <div id="carouselExample" class="carousel slide bannerSlide">
        <div class="carousel-inner banner" style="height: 55vh;">
            <div class="carousel-item">
                <img src="../../assets/img/2y-kang-dFohf_GUZJ0-unsplash.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item active">
                <img src="../../assets/img/david-travis-5bYxXawHOQg-unsplash.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/img/element5-digital-OyCl7Y4y0Bk-unsplash.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="bannerTitle wow animate__fadeInRightBig">
                <p>LINK YOUR<br>
                    LEARNING JOURNEY</p>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <!-- <h1 class="wow animate__bounce animation-delay-1">An animated element</h1>
    <h1 class="wow animate__bounce animation-delay-2">Another animated element</h1> -->
</template>
    
<script setup>

</script>
    
<style scoped>
p {
    font-weight: 700;
    color: #edede9;

}

.banner {
    position: relative;
}

.bannerTitle {
    width: 100%;
    position: absolute;
    top: 300px;
    right: 300px;
}

.banner .bannerTitle p {
    text-align: left;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    top: -30px;
    font-size: 50px;
}

.bannerSlide {
    margin-top: 20px;
}
</style>
