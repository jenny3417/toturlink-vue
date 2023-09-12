<template>
    <div class="modal fade" id="favoriateListModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2>我的收藏</h2>
                    <div class="favoriateContant row row-cols-auto">
                        <div class="col m-auto my-3 p-0">
                            <favoriate-card></favoriate-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import favoriateCard from "@/components/favoriate/FavoriateCard.vue";
</script>
<style scoped>
.card {
    min-height: 150px;
}

.cardImg {
    width: 100%;
}

.favoriateLink {
    color: #9d8189;
}

.favoriateLink:hover {
    color: #d5bdaf
}
</style>