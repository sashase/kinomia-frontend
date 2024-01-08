<template>
  <div class="showtimes-wrapper">
    <div class="options">
      <OptionsDropdown :options="citiesOptions" @option-selected="handleCityChange" />
      <OptionsDropdown :options="datesOptions" @option-selected="handleDateChange" />
    </div>
    <div class="showtimes">
      <div v-if="cinemasGroups" v-for="cinema in cinemasGroups" :key="cinema.cinemaName" class="cinema-group">
        <h3 class="cinema-group__cinema-name">{{ cinema.cinemaName }}</h3>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue"
import OptionsDropdown from "./OptionsDropdown.vue"
import BackendApiService from "../core/services/BackendApiService"
import { parseDate, prettifyDate } from "../core/helpers"
import { City, Option, Showtime, CinemaGroup } from "../interfaces"

interface Props {
  allShowtimes: Showtime[]
}

const props = defineProps<Props>()


// Fetched properties
const allCities = ref<City[]>([])

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
  return uniqueDates.map((uniqueDate, key) => ({ id: key, name: prettifyDate(uniqueDate) }))
}

const getFilteredShowtimes = (showtimes: Showtime[], selectedDate: Option | null, selectedCity: Option | null): Showtime[] => {
  if (!selectedDate || !selectedCity) return []
  return showtimes.filter(
    (showtime) => showtime.date.split("T")[0] === parseDate(selectedDate.name) && showtime.cinema.city_id === selectedCity.id
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
const citiesOptions = computed<Option[]>(() => getCityOptions(props.allShowtimes, allCities.value))
const datesOptions = computed<Option[]>(() => getDateOptions(props.allShowtimes))

const filteredShowtimes = computed<Showtime[]>(() => getFilteredShowtimes(props.allShowtimes, selectedDate.value, selectedCity.value))

const cinemasGroups = computed<CinemaGroup[]>(() => groupShowtimesByCinema(filteredShowtimes.value))


// Lifecycle hooks
onBeforeMount(() => {
  BackendApiService.getCities().then(({ data }) => (allCities.value = data))
})

</script>
<style scoped lang="scss">
@use "../assets/styles/variables";
@use "../assets/styles/mixins";

.showtimes-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 20rem;
}

.options {
  @include mixins.digestCard;
  align-items: center;
  width: 75%;
  overflow: inherit;
}

.showtimes {
  @include mixins.digestCard;
  flex-direction: column;
  align-items: start;
  max-height: 60vh;
  overflow: auto;
}

.cinema-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin: 0;
  font-size: variables.$text-lg;
  font-weight: variables.$font-medium;
}

.cinema-group__showtimes {
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

@media (max-width: variables.$breakpoint-l) {
  .options {
    width: 100%;
  }
}
</style>