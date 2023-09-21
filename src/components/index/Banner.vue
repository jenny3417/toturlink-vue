<template>
    <div id="carouselExample" class="carousel slide bannerSlide">
        <div class="carousel-inner banner" style="height: 55vh;">
            <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1491309055486-24ae511c15c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item ">
                <img src="https://images.unsplash.com/photo-1573006939324-641d31296356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item active">
                <img src="https://images.unsplash.com/photo-1454166155302-ef4863c27e70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" class="d-block w-100" alt="...">
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
