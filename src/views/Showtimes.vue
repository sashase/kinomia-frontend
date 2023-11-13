<template>
  id: {{ movieId }}
</template>

<script setup lang="ts">
import router from "../router"

const { movieId } = router.currentRoute.value.params
</script>