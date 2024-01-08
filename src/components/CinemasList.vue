<template>
  <div class="list">
    <OptionsDropdown class="list__city" :options="cities" @option-selected="handleCityChange" />
    <div class="list__networks">
      <button v-for="network in networksOptions"
        :class="`list__network ${selectedNetwork !== network && 'list__network-disabled'}`"
        @click="handleNetworkChange(network)">
        {{ network.name.slice(0, 1).toUpperCase() + network.name.slice(1) }}
      </button>
    </div>
    <div class="list__cinemas">
      <button v-if="filteredCinemas?.length" v-for="cinema in filteredCinemas" class="cinema" :key="cinema.name"
        @click="emit('openModal', cinema)">
        <img class="cinema__image" src="/svg/film.svg" :alt="cinema.network.name">
        <div class="cinema__metadata">
          <h5 class="cinema__name">{{ cinema.name }}</h5>
          <div class="metadata__location">
            <p class="cinema__city">{{ cinema.city.name }}</p>
            <p class="cinema__address">{{ cinema.address }}</p>
          </div>
        </div>
      </button>
      <p v-else>No cinema is found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue"
import { useCinemasStore } from "../stores"
import BackendApiService from "../core/services/BackendApiService"
import OptionsDropdown from "../components/OptionsDropdown.vue"
import { Cinema, City, Network } from "../interfaces"

// Emits
interface Emits {
  (e: "openModal", cinema: Cinema): void
}

const emit = defineEmits<Emits>()


// Stores
const cinemasStore = useCinemasStore()


// Fetched properties
const networks = ref<Network[]>([])
const cities = ref<City[]>([])


// Selected options
const selectedNetwork = ref<Network | null>(null)
const selectedCity = ref<City | null>(null)


// Events handlers
const handleNetworkChange = (network: Network) => {
  if (selectedNetwork.value === network) selectedNetwork.value = null
  else selectedNetwork.value = network
}

const handleCityChange = (city: City) => {
  selectedCity.value = city
  selectedNetwork.value = null
}


// Computed properties
const cinemas = computed<Cinema[]>(() => cinemasStore.getCinemas)
const networksOptions = computed<Network[]>(() => getNetworksOptions(cinemas.value, selectedCity.value))
const filteredCinemas = computed<Cinema[]>(() => getFilteredCinemas(cinemas.value, selectedNetwork.value, selectedCity.value))


// Helper functions
const getNetworksOptions = (cinemas: Cinema[], selectedCity: Network | null): Network[] => {
  if (!selectedCity) return networks.value
  const networkIds = [...new Set(cinemas.filter((cinema) => cinema.city_id === selectedCity.id).map((cinema) => cinema.network_id))]
  return networks.value.filter((network) => networkIds.includes(network.id))
}

const getFilteredCinemas = (cinemas: Cinema[], selectedNetwork: Network | null, selectedCity: City | null): Cinema[] => {
  if (selectedNetwork && selectedCity) {
    return cinemas.filter(
      (cinema) => cinema.network_id === selectedNetwork.id && cinema.city_id === selectedCity.id
    )
  }
  else if (selectedCity) {
    return cinemas.filter(
      (cinema) => cinema.city_id === selectedCity.id
    )
  }
  else if (selectedNetwork) {
    return cinemas.filter(
      (cinema) => cinema.network_id === selectedNetwork.id
    )
  }
  else return cinemas
}


// Lifecycle hooks
onBeforeMount(() => {
  BackendApiService.getNetworks()
    .then(({ data }) => networks.value = data)

  BackendApiService.getCities()
    .then(({ data }) => cities.value = data)

  if (!cinemas.value.length) {
    BackendApiService.getCinemas()
      .then(({ data }) => cinemasStore.cinemas = data)
  }
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";


.list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: variables.$secondary-surface-color;
  padding: 1.5rem;
  border-radius: variables.$border-rounded;
}

.list__city {
  width: 25%;
}

.list__networks {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.list__network {
  cursor: pointer;
  background-color: variables.$primary-surface-color;
  border: 0;
  border-radius: variables.$border-rounded;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
  color: variables.$primary-color;
  padding: 0.5rem 1rem;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.list__network-disabled {
  opacity: 0.5;
}

.list__cinemas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 1.5rem;
  width: 100%;
}

.cinema {
  display: grid;
  grid-template-columns: 3fr 4fr;
  gap: 0.75rem;
  background-color: variables.$primary-surface-color;
  border: 0;
  border-radius: variables.$border-rounded;
  padding: 0.75rem;
  align-items: center;
  justify-content: start;
  text-align: left;
}

.cinema__image {
  height: 4rem;
  max-width: 100%;
  margin: auto;
}

.cinema__metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cinema__name {
  margin: 0;
  font-size: clamp(variables.$text-base, 2.5vw, variables.$text-lg);
  color: variables.$primary-color;
  font-weight: variables.$font-medium;
}

.metadata__location {
  display: flex;
  flex-direction: column;
  gap: 0.25rem
}

.cinema__city {
  margin: 0;
  font-size: variables.$text-sm;
  color: variables.$secondary-color;
}

.cinema__address {
  margin: 0;
  font-size: variables.$text-sm;
  color: variables.$secondary-color;
}


@media (max-width: variables.$breakpoint-xl) {
  .list__cinemas {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: variables.$breakpoint-l) {
  .list__cinemas {
    grid-template-columns: repeat(2, 1fr);
  }
}


@media (max-width: variables.$breakpoint-s) {
  .list__city {
    width: 100%;
  }

  .list__network {
    width: 50%;
  }

  .list__cinemas {
    grid-template-columns: 1fr;
  }

  .cinema__image {
    height: 50%;
  }
}
</style>