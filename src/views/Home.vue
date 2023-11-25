<template>
  <Backdrop />
  <section class="playing-movies">
    <h3 class="playing-movies__title">in Theaters</h3>
    <MoviesList :movies="movies" />
  </section>
</template>

<script setup lang="ts">
import { ComputedRef, computed, onBeforeMount } from "vue"
import BackendApiService from "../core/services/BackendApiService"
import { useMoviesStore } from "../stores"
import { MovieBrief } from "../interfaces"
import Backdrop from "../components/Backdrop.vue"
import MoviesList from "../components/MoviesList.vue"

const moviesStore = useMoviesStore()

const movies: ComputedRef<MovieBrief[]> = computed(() => moviesStore.getMovies)

onBeforeMount(async () => {
  const { data } = await BackendApiService.getPlayingMovies()
  const movies: MovieBrief[] = data
  moviesStore.movies = movies
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.playing-movies {
  width: 80%;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.playing-movies__title {
  font-size: variables.$text-3xl;
  font-weight: variables.$font-medium;
}

@media (max-width: variables.$breakpoint-medium) {
  .playing-movies {
    width: 85%;
    margin: 3rem auto;
    gap: 1.5rem;
  }
}

@media (max-width: variables.$breakpoint-small) {
  .playing-movies {
    width: 90%;
    margin: 2rem auto;
    gap: 1rem;
  }
}
</style>