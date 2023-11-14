<template>
  <swiper :centeredSlides="true" :autoplay="{ delay: 5000, disableOnInteraction: false, }"
    :pagination="{ clickable: true, }" :modules="modules" class="swiper-container">
    <swiper-slide v-for="movie in movies" class="slide" :style="slideStyle(movie)">
      <router-link class="title-wrapper" :to="`/digest/${movie.id}`">
        <span class="title"> {{ movie.title }}</span>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue"
import { PlayingMovie } from "../interfaces"
import { useMoviesStore } from "../stores"

import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

const moviesStore = useMoviesStore()

const modules = [Autoplay, Pagination]

const movies: ComputedRef<PlayingMovie[]> = computed(() => moviesStore.getPlayingMovies)

const slideStyle = (movie: PlayingMovie) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.slide {
  background-size: cover !important;
  background-position: center !important;
}

.title-wrapper {
  height: 100vh;
  width: 75%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: auto;
}

.title {
  text-align: center;
  font-size: clamp(variables.$text-5xl, 5vw, variables.$text-8xl);
  font-weight: variables.$font-medium;
}

@media (max-width: variables.$breakpoint-small) {
  .swiper-container {
    max-height: -webkit-fill-available;
  }

  .title-wrapper {
    width: 90%;
  }

  .title {
    font-size: variables.$text-5xl;
  }
}
</style>
