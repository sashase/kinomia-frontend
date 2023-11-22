<template>
  <div class="options">
    <OptionsDropdown :options="citiesOptions" @option-selected="handleCityChange" />
    <OptionsDropdown :options="datesOptions" @option-selected="handleDateChange" />
  </div>
  <div class="showtimes-wrapper">
    <div v-if="cinemasGroups" v-for="cinema in cinemasGroups" :key="cinema.cinemaName" class="cinema-group">
      <div class="cinema-group__cinema">
        <img class="cinema-group__network-image" :src="`/svg/${cinema.networkName}.svg`" :alt="cinema.networkName" />
        <h3 class="cinema-group__cinema-name">{{ cinema.cinemaName }}</h3>
      </div>
      <div class="cinema-group__showtimes">
        <a v-for="showtime in cinema.showtimes" :key="showtime.id" :href="showtime.order_link"
          :class="`showtime ${isDateInPast(showtime.date) ? 'showtime-disabled' : ''}`">
          <span class="showtime__time">{{ formatShowtimeDate(showtime.date) }}</span>
          <span class="showtime__format">{{ showtime.format }}</span>
        </a>
      </div>
    </div>
    <p v-else>Showtimes not found</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue"
import OptionsDropdown from "./OptionsDropdown.vue"
import MoviesApiService from "../core/services/MoviesApiService"
import { City, Option, Showtime, CinemaGroup } from "../interfaces"

interface Props {
  movieId: number
}

const props = defineProps<Props>()


// Fetched properties
const allCities = ref<City[]>([])
const allShowtimes = ref<Showtime[]>([])


// Selected options
const selectedCity = ref<Option | null>(null)
const selectedDate = ref<Option | null>(null)


// Emits handlers
const handleDateChange = (selectedOption: Option) => {
  selectedDate.value = selectedOption
}

const handleCityChange = (selectedOption: Option) => {
  selectedCity.value = selectedOption
}


// Helper functions
const formatShowtimeDate = (date: string): string => {
  const time = new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  return time.replace(/\s/g, "")
}

const getCityOptions = (showtimes: Showtime[], cities: City[]): Option[] => {
  const citiesIds = [...new Set(showtimes.map((showtime) => showtime.cinema.city_id))]  // Extracting all the unique city IDs to an array
  return citiesIds
    .map((cityId) => cities.find((city) => city.id === cityId)) // Comparing array of IDs with the actual library of cities
    .filter((city): city is City => city !== undefined) // Removing all undefined elements
    .map((city) => ({ id: city.id, name: city.name }))  // Creating a new array from filtered elements
}

const getDateOptions = (showtimes: Showtime[]): Option[] => {
  const uniqueDates = [...new Set(showtimes.map((showtime) => showtime.date.split("T")[0]))]
  return uniqueDates.map((uniqueDate, key) => ({ id: key, name: uniqueDate }))
}

const getFilteredShowtimes = (showtimes: Showtime[], selectedDate: Option | null, selectedCity: Option | null): Showtime[] => {
  if (!selectedDate || !selectedCity) return []
  return showtimes.filter(
    (showtime) => showtime.date.split("T")[0] === selectedDate.name && showtime.cinema.city_id === selectedCity.id
  )
}

const groupShowtimesByCinema = (showtimes: Showtime[]): CinemaGroup[] => {
  const groups: CinemaGroup[] = []
  showtimes.forEach((showtime) => {
    const { cinema } = showtime
    const cinemaName: string = cinema.name
    const networkName: string = cinema.network.name
    const existingGroup = groups.find((group) => group.cinemaName === cinemaName && group.networkName === networkName)
    if (existingGroup) {
      existingGroup.showtimes.push(showtime)
    } else {
      groups.push({
        cinemaName,
        networkName,
        showtimes: [showtime],
      })
    }
  })
  return groups
}

const isDateInPast = (date: string): boolean => {
  const currentDate = new Date()
  const showtimeDate = new Date(date)
  return showtimeDate < currentDate
}


// Computed properties
const citiesOptions = computed<Option[]>(() => getCityOptions(allShowtimes.value, allCities.value))
const datesOptions = computed<Option[]>(() => getDateOptions(allShowtimes.value))

const filteredShowtimes = computed<Showtime[]>(() => getFilteredShowtimes(allShowtimes.value, selectedDate.value, selectedCity.value))

const cinemasGroups = computed<CinemaGroup[]>(() => groupShowtimesByCinema(filteredShowtimes.value))


// Lifecycle hooks
onBeforeMount(() => {
  MoviesApiService.getCities().then(({ data }) => (allCities.value = data))
  MoviesApiService.getAllShowtimes(props.movieId).then(({ data }) => (allShowtimes.value = data))
})

</script>
<style scoped lang="scss">
@use "../assets/styles/variables";

.options {
  padding: 1.125rem 0;
  display: flex;
  align-items: start;
  width: 50%;
  gap: 1rem;
}

.showtimes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
}

.cinema-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cinema-group__cinema {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
}

.cinema-group__network-image {
  width: 80px;
}

.cinema-group__cinema-name {
  font-size: variables.$text-lg;
  font-weight: 400;
}

.cinema-group__showtimes {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.showtime {
  padding: 0.5rem 1.5rem;
  background-color: variables.$surface-color;
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

@media (max-width: variables.$breakpoint-big) {
  .options {
    width: 100%;
  }
}
</style>