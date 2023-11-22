<template>
  <router-link :to="`/digest/${id}`" class="movie">
    <img class="movie__poster" :src="`https://image.tmdb.org/t/p/original${posterPath}`" alt="movie-poster">
    <div class="details">
      <span class="details__title"> {{ title }}</span>
      <span class="details__rating" v-if="rating">{{ rating.toFixed(1) }}<img class="details__rating-svg"
          src="/svg/rating.svg" alt="rating"></span>
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

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.movie {
  font-size: variables.$text-base;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie__poster {
  width: 100%;
  border-radius: variables.$border-rounded;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.details__rating {
  font-size: variables.$text-sm;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.details__rating-svg {
  width: variables.$text-base;
}

@media (max-width: variables.$breakpoint-small) {

  .details__title {
    font-size: variables.$text-sm;
  }

  .details__rating {
    font-size: variables.$text-xs;
  }

  .details__rating-svg {
    width: variables.$text-sm;
  }
}
</style>