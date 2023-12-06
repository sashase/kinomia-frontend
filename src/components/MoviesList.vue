<template>
  <div class="movies-list">
    <MovieItem v-for="movie in movies" :id="movie.id" :title="movie.title" :posterPath="movie.poster_path"
      :rating="movie.rating" />
  </div>
</template>

<script setup lang="ts">
import MovieItem from "../components/MovieItem.vue"
import { MovieBrief } from "../interfaces"

interface Props {
  movies: MovieBrief[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.movies-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
}

@media (max-width: variables.$breakpoint-xl) {
  .movies-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: variables.$breakpoint-l) {
  .movies-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: variables.$breakpoint-m) {
  .movies-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: variables.$breakpoint-s) {
  .movies-list {
    gap: 1rem;
  }
}
</style>