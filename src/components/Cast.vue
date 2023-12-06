<template>
  <div class="cast">
    <div class="actor" v-for="actor in cast">
      <div class="actor__image-wrapper">
        <img v-if="actor.profile_path" class="actor__image" :src="`${baseImageUrlCompressed}${actor.profile_path}`"
          :alt="actor.name">
        <img v-else class="actor__image actor__image-missing" src="/svg/actor.svg" :alt="actor.name">
      </div>
      <div class="actor__details">
        <p class="actor__name">{{ actor.name }}</p>
        <p v-if="actor.character" class="actor__character">{{ actor.character }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Actor } from "../interfaces"

interface Props {
  cast: Actor[]
}

defineProps<Props>()

const baseImageUrlCompressed: string = import.meta.env.VITE_TMDB_BASE_IMAGE_URL_COMPRESSED
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.cast {
  @include mixins.digestCard;
  overflow: auto;
}

.actor {
  border-radius: variables.$border-rounded;
  background-color: variables.$primary-surface-color;
}

.actor__image-wrapper {
  height: 11rem;
  width: 8rem;
  margin: 0;
}

.actor__image {
  border-radius: variables.$border-rounded variables.$border-rounded 0 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.actor__image-missing {
  padding: 1rem;
  object-fit: contain;
}

.actor__details {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.25rem;
}

.actor__name {
  margin: 0;
  font-weight: variables.$font-medium;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
}

.actor__character {
  margin: 0;
  font-weight: variables.$font-regular;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  color: variables.$secondary-color;
}
</style>