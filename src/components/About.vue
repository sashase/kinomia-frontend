<template>
  <div class="about">
    <ul class="metadata">
      <li v-if="movie.release_date" class="property">
        <span class="property__description">Released:</span>
        <span class="property__content">{{ prettifyDate(movie.release_date) }}</span>
      </li>
      <li v-if="movie.runtime" class="property">
        <span class="property__description">Runtime:</span>
        <span class="property__content">{{ formatRuntime(movie.runtime) }}</span>
      </li>
      <li v-if="movie.vote_average" class="property">
        <span class="property__description">Rating:</span>
        <span class="property__content property__content-icon" id="">
          {{ movie.vote_average.toFixed(1) }}
          <i class="fa-solid fa-star fa-sm" style="color: #d6d329;" />
        </span>
      </li>
      <li v-if="movie.tagline" class="property">
        <span class="property__description">Tagline:</span>
        <span class="property__content"><em>“{{ movie.tagline }}”</em></span>
      </li>
      <li v-if="movie.overview" class="property">
        <span class="property__description">Overview:</span>
        <span class="property__content">{{ movie.overview }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MovieDetailed } from '../interfaces'
import { prettifyDate } from "../core/helpers"

interface Props {
  movie: Partial<MovieDetailed>
}

defineProps<Props>()

const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursString = hours > 0 ? `${hours}h` : ''
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes}m` : ''

  if (hours === 0 && remainingMinutes === 0) {
    return '0m'
  }

  return `${hoursString} ${minutesString}`
}
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.about {
  @include mixins.digestCard;
}

.metadata {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.property {
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
}

.property__description {
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
  color: variables.$secondary-color;
}

.property__content {
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  color: variables.$primary-color;
}

.property__content-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>