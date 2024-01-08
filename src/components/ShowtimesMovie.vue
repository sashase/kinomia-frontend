<template>
  <div class="showtimes-wrapper">
    <div class="options">
      <OptionsDropdown :options="citiesOptions" @option-selected="handleCityChange" />
      <OptionsDropdown :options="datesOptions" @option-selected="handleDateChange" />
    </div>
    <div class="showtimes">
      <ShowtimesGroups v-if="cinemasGroups.length" :groups="cinemasGroups" />
      <p v-else>Showtimes not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue"
import OptionsDropdown from "./OptionsDropdown.vue"
import BackendApiService from "../core/services/BackendApiService"
import { parseDate, getDateOptions } from "../core/helpers"
import { City, Option, Showtime, ShowtimeGroup } from "../interfaces"
import ShowtimesGroups from "./ShowtimesGroups.vue"


// Props
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
const getCityOptions = (showtimes: Showtime[], cities: City[]): Option[] => {
  const citiesIds = [...new Set(showtimes.map((showtime) => showtime.cinema.city_id))]  // Extracting all the unique city IDs to an array
  return citiesIds
    .map((cityId) => cities.find((city) => city.id === cityId)) // Comparing array of IDs with the actual library of cities
    .filter((city): city is City => city !== undefined) // Removing all undefined elements
    .map((city) => ({ id: city.id, name: city.name }))  // Creating a new array from filtered elements
}

const getFilteredShowtimes = (showtimes: Showtime[], selectedDate: Option | null, selectedCity: Option | null): Showtime[] => {
  if (!selectedDate || !selectedCity) return []
  return showtimes.filter(
    (showtime) => showtime.date.split("T")[0] === parseDate(selectedDate.name) && showtime.cinema.city_id === selectedCity.id
  )
}

const groupShowtimesByCinema = (showtimes: Showtime[]): ShowtimeGroup[] => {
  const groups: ShowtimeGroup[] = []
  showtimes.forEach((showtime) => {
    const { cinema } = showtime
    const name: string = cinema.name
    const existingGroup: ShowtimeGroup | undefined = groups.find((group) => group.name === name)
    if (existingGroup) {
      existingGroup.showtimes.push(showtime)
    } else {
      groups.push({
        name,
        showtimes: [showtime],
      })
    }
  })
  return groups
}


// Computed properties
const citiesOptions = computed<Option[]>(() => getCityOptions(props.allShowtimes, allCities.value))
const datesOptions = computed<Option[]>(() => getDateOptions(props.allShowtimes))

const filteredShowtimes = computed<Showtime[]>(() => getFilteredShowtimes(props.allShowtimes, selectedDate.value, selectedCity.value))

const cinemasGroups = computed<ShowtimeGroup[]>(() => groupShowtimesByCinema(filteredShowtimes.value))


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

@media (max-width: variables.$breakpoint-l) {
  .options {
    width: 100%;
  }
}
</style>