<template>
  <swiper :centeredSlides="true" :autoplay="{ delay: 5000, disableOnInteraction: false, }"
    :pagination="{ clickable: true, }" :modules="modules" class="swiper">
    <swiper-slide v-for="movie in movies" class="slide"
      :style="{ background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(' + `https://image.tmdb.org/t/p/original${movie.backdrop_path}` + ')' }">
      <div class="details-wrapper">
        <div class="details">
          <span class="details__title">{{ movie.title }}</span>
          <span class="details__overview" v-if="movie.overview">{{ movie.overview.length > 200 ?
            `${movie.overview.slice(0, 200)}...` :
            movie.overview }}</span>
          <div class="details__buttons-wrapper">
            <RouterLink class="details__button" :to="`/showtimes/${movie.id}`">Watch</RouterLink>
            <RouterLink class="details__button" :to="`/digest/${movie.id}`">Digest</RouterLink>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { ComputedRef, computed } from "vue"
import { PlayingMovie } from "../interfaces"
import { useMoviesStore } from "../stores"

import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const moviesStore = useMoviesStore()

const modules = [Autoplay, Pagination, Navigation]

const movies: ComputedRef<PlayingMovie[]> = computed(() => moviesStore.getPlayingMovies)
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.swiper {
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.slide {
  background-size: cover !important;
  background-position: center !important;
}

.details-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  width: 80%;
  margin: auto;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 40%;
}

.details__title {
  font-weight: medium;
  font-size: clamp(variables.$text-5xl, 4vw, variables.$text-6xl);
  color: variables.$primary-color;
}

.details__overview {
  font-size: clamp(variables.$text-base, 1.5vw, variables.$text-lg);
  color: variables.$secondary-color;
}

.details__buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 3.125rem;
}

.details__button {
  font-size: clamp(variables.$text-base, 1.5vw, variables.$text-lg);
  padding: 0.7rem 2.8rem;
  background-color: variables.$surface-color;
  border-radius: 1.25rem;
}

@media (max-width: variables.$breakpoint-mobile) {
  .swiper {
    max-height: -webkit-fill-available;
  }

  .details {
    width: 100%;
  }

  .details__buttons-wrapper {
    justify-content: space-between;
    gap: 0;
  }
}
</style>
