<template>
  <div class="dropdown" @click="toggleSelect">
    <div class="option-selected">{{ selectedOption?.name ?? "-" }}</div>
    <div class="options" v-if="selectIsOpen && options.length">
      <span v-for="option in  options "
        :class="`options__option ${selectedOption?.id === option.id ? 'options__option-selected' : ''}`"
        @click="selectedOption !== option && selectOption(option)">
        {{ option.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from "vue"
import { Option } from "../interfaces"

interface Props {
  options: Option[]
}

interface Emits {
  (e: "optionSelected", option: Option): void
}

const selectIsOpen = ref<boolean>(false)

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedOption: Ref<Option | null> = ref(null)

const toggleSelect = () => {
  selectIsOpen.value = !selectIsOpen.value
}

const selectOption = (option: Option) => {
  selectedOption.value = option
  emit("optionSelected", option)
}

watch(() => props.options, () => {
  selectedOption.value = props.options[0]
  emit("optionSelected", props.options[0])
}, { immediate: true })
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.dropdown {
  position: relative;
  text-align: center;
  width: 50%;
  color: variables.$primary-color;
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
}

.option-selected {
  width: 100%;
  background-color: variables.$primary-surface-color;
  border-radius: variables.$border-rounded;
  padding: 0.65rem 1.125rem;
  cursor: pointer;
}

.options {
  width: 100%;
  max-height: 15rem;
  position: absolute;
  overflow: auto;
  margin-top: 0.65rem;
  display: flex;
  flex-direction: column;
  border-radius: variables.$border-rounded;
  gap: 1rem;
  padding: 1rem 0;
  background-color: variables.$primary-surface-color;
  z-index: 1;
}

.options__option {
  color: variables.$secondary-color;
  cursor: pointer;
}

.options__option-selected {
  color: variables.$primary-color;
  cursor: default;
}
</style>
