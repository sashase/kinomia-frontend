<template>
  <div class="groups">
    <div v-if="groups.length" v-for="group in groups" :key="group.name" class="group">
      <h3 class="group__name">{{ group.name }}</h3>
      <div class="group__showtimes">
        <a v-for="showtime in group.showtimes" :key="showtime.id" :href="showtime.order_link"
          :class="`showtime ${isDateInPast(showtime.date) ? 'showtime-disabled' : ''}`">
          <span class="showtime__time">{{ formatShowtimeDate(showtime.date) }}</span>
          <span class="showtime__format">{{ showtime.format }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatShowtimeDate, isDateInPast } from "../core/helpers"
import { ShowtimeGroup } from "../interfaces"

interface Props {
  groups: ShowtimeGroup[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.groups {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.group__name {
  margin: 0;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
  // font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  font-weight: variables.$font-regular;
}

.group__showtimes {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.showtime {
  padding: 0.5rem 1.5rem;
  background-color: variables.$primary-surface-color;
  border-radius: variables.$border-rounded;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.showtime-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.showtime__time {
  font-size: variables.$text-base;
}

.showtime__format {
  font-size: variables.$text-sm;
  color: variables.$secondary-color;
}
</style>