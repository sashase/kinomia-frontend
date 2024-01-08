<template>
  <div class="modal-wrapper">
    <div v-if="cinema" class="modal">
      <div class="modal__header">
        <div class="modal__metadata">
          <h3 class="modal__name">{{ cinema.name }}</h3>
          <p class="modal__address">{{ cinema.address }}</p>
        </div>
        <span class="modal__close" @click="emit('closeModal')">
          <i class="fa-solid fa-xmark fa-lg" style="color: #b8b8b8;" />
        </span>
      </div>
      <hr class="modal__divider" />
      <div class="content">
        <ShowtimesCinema :all-showtimes="allShowtimes" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import BackendApiService from '../core/services/BackendApiService'
import { Cinema, Showtime } from '../interfaces'
import ShowtimesCinema from './ShowtimesCinema.vue'

interface Props {
  cinema?: Cinema
}

interface Emits {
  (e: "closeModal"): void
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const allShowtimes = ref<Showtime[]>([])

onBeforeMount(() => {
  if (!props.cinema) return
  BackendApiService.getShowtimes({ cinemaId: parseInt(String(props.cinema.id)) })
    .then(({ data }) => allShowtimes.value = data)
    .catch((error) => console.log(error))
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.modal-wrapper {
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background-color: variables.$secondary-surface-color;
  border-radius: variables.$border-rounded;
  width: 80%;
  height: 75vh;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  overflow: auto;
}

.modal__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
}

.modal__metadata {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.modal__name {
  margin: 0;
  font-weight: variables.$font-regular;
  font-size: clamp(variables.$text-xl, 3.3vw, variables.$text-2xl);
}

.modal__address {
  margin: 0;
  color: variables.$secondary-color;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
}

.modal__close {
  opacity: 50%;
  cursor: pointer;
}

.modal__close:hover {
  opacity: 100%;
}

.modal__divider {
  width: 100%;
  border-top: 1px;
  background-color: variables.$primary-color;
  border-radius: variables.$border-rounded;
  opacity: 25%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  justify-content: start;
}

@media (max-width: variables.$breakpoint-s) {
  .modal {
    width: 90%;
    padding: 1.125rem;
    gap: 0.5rem;
  }

  .modal-wrapper {
    height: -moz-available;
    height: -webkit-fill-available;
    height: fill-available;
  }
}
</style>
