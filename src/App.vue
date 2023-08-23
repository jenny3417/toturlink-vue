<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import navbar from "./components/Navbar.vue"



</script>

<template>
  <navbar></navbar>
  <router-view></router-view>
</template>

<style>
/* reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #9d8189;
}

h1,
h2,
h3,
h4,
h5,
p,
label,
span,
li {
  color: #9d8189;
}

a {
  text-decoration: none;
}

ol,
ul {
  padding-left: 0;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
