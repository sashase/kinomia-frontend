<template>
  cinema - {{ cinemaId }}
</template>

<script setup lang="ts">
import router from '../router'

const { cinemaId } = router.currentRoute.value.params
</script>