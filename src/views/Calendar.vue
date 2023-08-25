<template>
    <navbar></navbar>

    <div class="container calendarPage">
        <h1>我的行事曆</h1>
        <vue-cal class="vuecal--blue-theme"></vue-cal>
    </div>
</template>
    
<script setup>
import navbar from "../components/Navbar.vue"
import VueCal from 'vue-cal'
</script>
    
<style></style>