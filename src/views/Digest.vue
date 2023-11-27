<template>
  <div class="digest">
    <section class="backdrop" :style="imageStyle()">
      <div class="details">
        <h3 class="details__title">{{ movie.title }}</h3>
        <div class="genres">
          <router-link class="genres__genre" v-for="genre in movie.genres" :to="`/movies?genre=${genre.id}`">{{
            genre.name
          }}</router-link>
        </div>
      </div>
    </section>
    <section class="overview">
      <div class="overview-section">
        <h5 class="overview-section__title">About</h5>
        <p class="overview-section__content">{{ movie.overview }}</p>
      </div>
      <div class="overview-section">
        <h5 class="overview-section__title">Cast</h5>
        <Cast v-if="movie.id" :movieId="movie.id" />
      </div>
      <div class="overview-section overview-section-showtimes">
        <h5 class="overview-section__title">Showtimes</h5>
        <Showtimes v-if="movie.id" :movieId="movie.id" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Ref, onBeforeMount, ref } from "vue"
import router from "../router"
import TmdbApiService from "../core/services/TmdbApiService"
import { MovieDetailed } from "../interfaces"
import { useMoviesStore } from "../stores"
import Showtimes from "../components/Showtimes.vue"
import Cast from "../components/Cast.vue"

const { movieId } = router.currentRoute.value.params

const moviesStore = useMoviesStore()

const movie: Ref<Partial<MovieDetailed>> = ref({})

const imageStyle = () => ({
  background: `linear-gradient(0deg, rgba(18,18,18,0) 50%, rgba(18,18,18,0.4) 100%), url('https://image.tmdb.org/t/p/original${movie.value.backdrop_path}')`,
})

onBeforeMount(async () => {
  const initialData = moviesStore.getMovies.find((element) => element.id === parseInt(String(movieId)))
  if (initialData) movie.value = initialData

  TmdbApiService.getMovie(parseInt(String(movieId)))
    .then(({ data }) => movie.value = data)
})

</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.digest {
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.backdrop {
  width: 100%;
  height: 60vh;
  background-size: cover !important;
  background-position: top !important;
  box-shadow: 0 -40vh 200px rgb(18, 18, 18) inset;
  -webkit-box-shadow: 0 -40vh 200px rgb(18, 18, 18) inset;
  -moz-box-shadow: 0 -40vh 200px rgb(18, 18, 18) inset;
  display: flex;
  align-items: end;
}

.details {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details__title {
  margin: 0;
  max-width: 60%;
  font-size: clamp(variables.$text-4xl, 4vw, variables.$text-6xl);
  font-weight: variables.$font-medium;
}

.genres {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.genres__genre {
  display: flex;
  align-items: center;
  text-align: center;
  color: variables.$secondary-color;
  font-size: variables.$text-sm;
  background-color: variables.$primary-surface-color;
  padding: 0.3rem 0.625rem;
  border-radius: variables.$border-rounded;
}

.overview {
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 3.5rem;
}

.overview-section {
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 1rem;
  overflow: auto;
}

.overview-section-showtimes {
  grid-column: 2;
  grid-row: 1 / 3
}

.overview-section__title {
  margin: 0;
  font-size: clamp(variables.$text-lg, 3vw, variables.$text-xl);
  color: variables.$secondary-color;
  font-weight: variables.$font-medium;
}

.overview-section__content {
  font-size: clamp(variables.$text-sm, 2vw, variables.$text-base);
  margin: 0;
}

@media (max-width: variables.$breakpoint-big) {
  .backdrop {
    height: 50vh;
    box-shadow: 0 -30vh 200px rgb(18, 18, 18) inset;
    -webkit-box-shadow: 0 -30vh 200px rgb(18, 18, 18) inset;
    -moz-box-shadow: 0 -30vh 200px rgb(18, 18, 18) inset;
  }

  .overview {
    grid-template-columns: 1fr;
  }

  .overview-section-showtimes {
    grid-column: 1;
    grid-row: 3;
  }
}

@media (max-width: variables.$breakpoint-medium) {
  .backdrop {
    height: 85vh;
    box-shadow: 0 -60vh 200px rgb(18, 18, 18) inset;
    -webkit-box-shadow: 0 -60vh 200px rgb(18, 18, 18) inset;
    -moz-box-shadow: 0 -60vh 200px rgb(18, 18, 18) inset;
  }
}

@media (max-width: variables.$breakpoint-small) {
  .backdrop {
    height: 60vh;
    box-shadow: 0 -20vh 100px rgb(18, 18, 18) inset;
    -webkit-box-shadow: 0 -20vh 100px rgb(18, 18, 18) inset;
    -moz-box-shadow: 0 -20vh 100px rgb(18, 18, 18) inset;
  }

  .details {
    width: 90%;
  }

  .overview {
    width: 90%;
    position: relative;
    bottom: 50px;
    gap: 1.75rem;
  }
}
</style>