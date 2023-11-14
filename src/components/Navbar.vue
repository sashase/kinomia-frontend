<template>
  <nav :class="`navbar ${scrollPosition > 100 ? 'navbar-colored' : ''}`">
    <RouterLink class="navbar__title" to="/">Kinomia</RouterLink>
    <div class="navbar__links">
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/theaters">Theaters</RouterLink>
    </div>
    <div class="hamburger" @click="toggleMobileMenu" :class="isMobileMenuOpen && 'hamburger-active'">
      <span class="hamburger__bar"></span>
      <span class="hamburger__bar"></span>
      <span class="hamburger__bar"></span>
    </div>
    <div class="navbar-mobile" :class="isMobileMenuOpen && 'navbar-mobile-active'">
      <div class="navbar-mobile__links">
        <RouterLink to="/movies" @click="closeMobileMenu">Movies</RouterLink>
        <RouterLink to="/theaters" @click="closeMobileMenu">Theaters</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue"

const isMobileMenuOpen: Ref<boolean> = ref(false)
const scrollPosition: Ref<number> = ref(0)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const updateScroll = () => {
  scrollPosition.value = window.scrollY
}

onMounted(() => {
  window.addEventListener("scroll", updateScroll)
})

watch(isMobileMenuOpen, () => {
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : ""
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 2rem 10%;
  border-radius: 0 0 1.25rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  transition: background-color 0.2s ease-in-out;
}

.navbar-colored {
  background-color: #1f1f1fc8;
  backdrop-filter: blur(0.25rem);
  -webkit-backdrop-filter: blur(0.25rem);
}

.navbar__title {
  font-size: variables.$text-3xl;
}

.navbar__links {
  display: flex;
  gap: 3.75rem;
  font-size: variables.$text-2xl;
}

.hamburger {
  display: none;
}

.hamburger__bar {
  display: block;
  width: 1.7rem;
  height: 0.2rem;
  margin: 0.3rem auto;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  background-color: variables.$primary-color;
  border-radius: 1.25rem;
}

.navbar-mobile {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: variables.$surface-color;
  transition: all, 0.2s ease-in-out;
}

.navbar-mobile-active {
  opacity: 1;
  visibility: visible;
}

.navbar-mobile__links {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: variables.$text-4xl;
}

@media (max-width: variables.$breakpoint-small) {
  .navbar {
    justify-content: space-between;
  }

  .navbar__links {
    display: none;
  }

  .hamburger {
    display: block;
    z-index: 2;
  }

  .hamburger-active {
    .hamburger__bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger__bar:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }

    .hamburger__bar:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
</style>