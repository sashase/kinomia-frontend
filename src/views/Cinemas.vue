<template>
  <div class="cinemas">
    <header class="header">
      <h3 class="header__title">Cinemas</h3>
      <div class="header__options">
        <img @click="handleViewChange(1)" :class="`header__option ${selectedView !== 1 ? 'header__option-disabled' : ''}`"
          src="/svg/list.svg" alt="list-view" />
        <img @click="handleViewChange(2)" :class="`header__option ${selectedView !== 2 ? 'header__option-disabled' : ''}`"
          src="/svg/map.svg" alt="map-view" />
      </div>
    </header>
    <CinemasList v-if="selectedView === 1" />
    <CinemasMap v-if="selectedView === 2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import CinemasList from "../components/CinemasList.vue"
import CinemasMap from "../components/CinemasMap.vue"

const selectedView = ref<number>(1)

const handleViewChange = (view: number): void => {
  selectedView.value = view
}
</script>


<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.cinemas {
  width: 80%;
  margin: 7.5rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  display: flex;
  align-items: center;
}

.header__title {
  margin: 0;
  font-size: variables.$text-3xl;
  font-weight: variables.$font-medium;
}

.header__options {
  padding: 0.75rem 1.5rem;
  border-radius: variables.$border-rounded;
  background-color: variables.$secondary-surface-color;
  margin: 0 0 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__option {
  cursor: pointer;
  pointer-events: all !important;
  color: variables.$primary-color;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.header__option-disabled {
  opacity: 0.5;
}

@media (max-width: variables.$breakpoint-s) {
  .cinemas {
    width: 90%;
  }
}
</style>