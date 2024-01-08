<template>
  <router-link :to="`/digest/${id}`" class="movie">
    <div class="movie__poster-wrapper">
      <img class="movie__poster" :src="`${baseImageUrlCompressed}${posterPath}`" :alt="title">
    </div>
    <div class="movie__details">
      <p class="movie__title">{{ title.length > 20 ? `${title.slice(0, 20)}...` : title }}</p>
      <p class="movie__rating" v-if="rating">{{ rating.toFixed(1) }}
        <i class="fa-solid fa-star fa-sm" style="color: #d6d329;" />
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  id: number
  title: string
  posterPath: string
  rating?: number
}

defineProps<Props>()

const baseImageUrlCompressed: string = import.meta.env.VITE_TMDB_BASE_IMAGE_URL_COMPRESSED
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.movie {
  display: flex;
  flex-direction: column;
  border-radius: variables.$border-rounded;
  background-color: variables.$secondary-surface-color;
}

.movie__poster-wrapper {
  height: 25rem;
}

.movie__poster {
  border-radius: variables.$border-rounded variables.$border-rounded 0 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.movie__details {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.375rem;
}

.movie__title {
  margin: 0;
  font-weight: variables.$font-medium;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
}

.movie__rating {
  margin: 0;
  font-weight: variables.$font-regular;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  color: variables.$secondary-color;
}

@media (max-width: variables.$breakpoint-xl) {
  .movie__poster-wrapper {
    height: 25rem;
  }
}

@media (max-width: variables.$breakpoint-s) {
  .movie__poster-wrapper {
    height: 15rem;
  }
}
</style>