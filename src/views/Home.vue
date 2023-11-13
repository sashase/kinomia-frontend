<template>
  <Backdrop />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import MoviesApiService from "../core/services/MoviesApiService"
import { useMoviesStore } from "../stores"
import Backdrop from "../components/Backdrop.vue"
import { PlayingMovie } from "../interfaces"

const moviesStore = useMoviesStore()

onMounted(async () => {
  const { data } = await MoviesApiService.getPlayingMovies()
  const playingMovies: PlayingMovie[] = data
  moviesStore.playingMovies = playingMovies
})
</script>