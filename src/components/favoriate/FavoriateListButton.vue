<template>
    <div class="modal fade" id="favoriateListModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2 class="favoriateTitle">我的收藏</h2>
                    <div class="favoriateContant row row-cols-auto">
                        <div class="col m-auto my-3 p-0">
                            <favoriate-card></favoriate-card>
                        </div>
                    </div>
                    <div v-if="favoriateList.length <= 0">
                        <h3 class="notFavoriate">還沒有收藏課程哦，快去看更多精彩課程</h3>
                        <button class="btn btnCheck" data-bs-dismiss="modal">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import favoriateCard from "@/components/favoriate/FavoriateCard.vue";
import { useFavoriateListStore } from '../../stores/useFavoriateListStore.js'
import { storeToRefs } from 'pinia'
// pinia
const favoriateListStore = useFavoriateListStore()
const { favoriateList } = storeToRefs(favoriateListStore)

</script>
<style scoped>
.card {
    min-height: 150px;
}

.cardImg {
    width: 100%;
}

.favoriateLink,
.favoriateTitle {
    color: #9d8189;
}

.favoriateLink:hover {
    color: #d5bdaf
}

.notFavoriate {
    margin-bottom: 60px;
}

.btnCheck {
    color: #e3d2c8;
    background-color: #403d39;
    width: 400px;
    transition: .3s;
}

.btnCheck:hover {
    background-color: #64605a;
}
</style>