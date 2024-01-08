<template>
  <div class="showtimes-wrapper">
    <div class="showtimes__header">
      <h4 class="showtimes__title">Showtimes</h4>
      <OptionsDropdown class="option" :options="datesOptions" @option-selected="handleDateChange" />
    </div>
    <div class="showtimes">
      <ShowtimesGroups v-if="moviesGroups.length" :groups="moviesGroups" />
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
const selectedDate = ref<Option | null>(null)


// Emits handlers
const handleDateChange = (selectedOption: Option) => {
  selectedDate.value = selectedOption
}


// Helper functions
const getFilteredShowtimes = (showtimes: Showtime[], selectedDate: Option | null,): Showtime[] => {
  if (!selectedDate) return []
  return showtimes.filter(
    (showtime) => showtime.date.split("T")[0] === parseDate(selectedDate.name)
  )
}

const groupShowtimesByMovie = (showtimes: Showtime[]): ShowtimeGroup[] => {
  const groups: ShowtimeGroup[] = []
  showtimes.forEach((showtime) => {
    const name: string = showtime.movie_title
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
const datesOptions = computed<Option[]>(() => getDateOptions(props.allShowtimes))

const filteredShowtimes = computed<Showtime[]>(() => getFilteredShowtimes(props.allShowtimes, selectedDate.value))

const moviesGroups = computed<ShowtimeGroup[]>(() => groupShowtimesByMovie(filteredShowtimes.value))


// Lifecycle hooks
onBeforeMount(() => {
  BackendApiService.getCities().then(({ data }) => (allCities.value = data))
})

</script>
<style scoped lang="scss">
@use "../assets/styles/variables";

.showtimes-wrapper {
  display: flex;
  gap: 1.125rem;
  flex-direction: column;
  min-height: 20rem;
}

.showtimes__header {
  display: flex;
  align-items: center;
  gap: 1.125rem;
}

.showtimes__title {
  margin: 0;
  color: variables.$primary-color;
  font-weight: variables.$font-regular;
  font-size: clamp(variables.$text-lg, 3vw, variables.$text-xl);
}

.option {
  width: fit-content;
}

.showtimes {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-height: 60vh;
}
</style>