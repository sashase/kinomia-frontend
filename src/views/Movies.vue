<template>
  <div class="movies">
    Coming soon
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables";

.movies {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(variables.$text-4xl, 4vw, variables.$text-6xl);
  font-weight: variables.$font-medium;
}
</style>