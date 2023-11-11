<template>
  <div class="layout-wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import Navbar from "./Navbar.vue"
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.layout-wrapper {
  width: 80%;
  margin: 2rem auto;
}

@media (max-width: variables.$breakpoint-mobile) {
  .layout-wrapper {
    width: 95%
  }
}
</style>