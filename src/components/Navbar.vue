<template>
  <nav class="navbar">
    <RouterLink class="navbar__title" to="/">Kinomia</RouterLink>
    <div class="navbar__links">
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/theaters">Theaters</RouterLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../assets/styles/variables";

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: va;
}

.navbar__title {
  font-size: variables.$text-3xl;
}

.navbar__links {
  display: flex;
  gap: 3.75rem;
  font-size: variables.$text-2xl;
}
</style>