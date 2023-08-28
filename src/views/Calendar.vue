<template>
    <navbar></navbar>

    <div class="container calendarPage">
        <h1>我的行事曆</h1>
        <vue-cal ref="vuecal" small hide-view-selector hide-title-bar :time-from="7 * 60" :time-to="23 * 60"
            :disable-views="['years', 'year', 'day']" :cell-click-hold="false" :drag-to-create-event="false" editable-events
            @cell-click="$refs.vuecal.createEvent(
                $event,
                60,
                { title: '英文課', class: 'blue-event' }
            )">
        </vue-cal>
    </div>
</template>
    
<script setup>
import navbar from "../components/public/Navbar.vue"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
</script>
    
<style scoped></style>