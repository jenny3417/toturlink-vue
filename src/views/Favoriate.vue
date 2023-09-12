<template>
    <navbar></navbar>
    <div class="container favoriatePage">
        <favoriate-list-button></favoriate-list-button>
    </div>
</template>
<script setup>
import navbar from "@/components/public/Navbar.vue"
import favoriateListButton from "@/components/favoriate/FavoriateListButton.vue";
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