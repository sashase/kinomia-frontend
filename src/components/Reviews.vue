<template>
  <div class="reviews">
    <h5 class="reviews__author">{{ reviews[0].author }}</h5>
    <p class="reviews__content">{{ cropReview(reviews[0].content) }}</p>
    <button class="reviews__more" @click="toogleModal">More reviews</button>
    <ReviewsModal v-if="modalIsOpen" :reviews="reviews" @closeModal="toogleModal" />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { Review } from '../interfaces'
import ReviewsModal from './ReviewsModal.vue'

interface Props {
  reviews: Review[]
}

defineProps<Props>()

const modalIsOpen: Ref<boolean> = ref(false)

const toogleModal = (): void => {
  modalIsOpen.value = !modalIsOpen.value
}

const cropReview = (review: string): string => {
  if (review.length <= 300) return review
  return `${review.slice(0, 300)}...`
}

watch(modalIsOpen, () => {
  document.body.style.overflow = modalIsOpen.value ? "hidden" : ""
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.reviews {
  @include mixins.digestCard;
  flex-direction: column;
  align-items: start;
}

.reviews__author {
  margin: 0;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
}

.reviews__content {
  margin: 0;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  color: variables.$secondary-color;
}

.reviews__more {
  border: inherit;
  outline: inherit;
  padding: 0.5rem 1rem;
  background-color: variables.$primary-surface-color;
  border-radius: variables.$border-rounded;
  color: variables.$primary-color;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  cursor: pointer;
}
</style>