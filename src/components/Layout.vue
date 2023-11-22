<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import Navbar from "./Navbar.vue"
import Footer from "./Footer.vue"
</script>