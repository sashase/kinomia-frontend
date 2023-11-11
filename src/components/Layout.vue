<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import Navbar from "./Navbar.vue"
</script>

<style scoped lang="scss">
.content {
  width: 80%;
  margin: 2rem auto;
}
</style>