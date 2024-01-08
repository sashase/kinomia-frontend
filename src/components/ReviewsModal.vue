<template>
  <div class="modal-wrapper">
    <div class="modal">
      <span class="modal__close" @click="emit('closeModal')">
        <i class="fa-solid fa-xmark fa-lg" style="color: #b8b8b8;" />
      </span>
      <div class="modal__content">
        <div class="review" v-for="review in reviews">
          <h5 class="review__author">{{ review.author }}</h5>
          <p class="review__content">{{ review.content }}</p>
          <div class="review__metadata">
            <p class="review__rating">
              {{ review.author_details.rating }}
              <i class="fa-solid fa-star fa-sm" style="color: #d6d329;" />
            </p>
            <p class="review__date">{{ prettifyDate(review.created_at.split("T")[0]) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prettifyDate } from "../core/helpers"
import { Review } from "../interfaces"

interface Props {
  reviews: Review[]
}

interface Emits {
  (e: "closeModal"): void
}

const emit = defineEmits<Emits>()
defineProps<Props>()
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
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: auto;
  align-items: center;
}

.modal__close {
  align-self: end;
  opacity: 50%;
  cursor: pointer;
}

.modal__close:hover {
  opacity: 100%;
}

.modal__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.review {
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: variables.$primary-surface-color;
  border-radius: variables.$border-rounded;
  display: flex;
  flex-direction: column;
}

.review__author {
  margin: 0;
  font-weight: variables.$font-regular;
  font-size: clamp(variables.$text-xl, 3.3vw, variables.$text-2xl);
}

.review__content {
  margin: 0;
  color: variables.$secondary-color;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
}

.review__metadata {
  align-self: end;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.25rem;
  color: variables.$secondary-color;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
}

.review__rating {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review__date {
  margin: 0;
}

@media (max-width: variables.$breakpoint-s) {
  .modal {
    width: 90%;
  }

  .modal-wrapper {
    height: -moz-available;
    height: -webkit-fill-available;
    height: fill-available;
  }
}
</style>
