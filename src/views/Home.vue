<template>
    <navbar></navbar>
    <div class="container">
        <banner></banner>
        <maincontent></maincontent>
    </div>
    <tutorfooter></tutorfooter>
</template>
    
<script setup>
import banner from "../components/index/Banner.vue"
import maincontent from '../components/index/MainContent.vue'
import tutorfooter from "../components/public/Footer.vue";
import navbar from "@/components/public/Navbar.vue"
</script>
    
<style></style>