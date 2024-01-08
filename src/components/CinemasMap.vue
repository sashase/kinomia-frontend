<template>
  <div class="map" />
</template>

<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader"
import { computed, onBeforeMount, onMounted } from "vue"
import { Cinema } from "../interfaces"
import { useCinemasStore } from "../stores"
import router from "../router"
import BackendApiService from "../core/services/BackendApiService"
import { MAP_CENTER, MAP_ZOOM_800, MAP_ZOOM_1000, MAP_ZOOM_1200, MAP_ZOOM_1400, MAP_ZOOM_1600, MAP_ZOOM_XL } from "../core/constants"

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["maps", "geocoding", "marker"]
})

const cinemasStore = useCinemasStore()

let geocoder: google.maps.Geocoder
let markerLibrary: google.maps.MarkerLibrary
let mapsLibrary: google.maps.MapsLibrary

let map: google.maps.Map

const cinemas = computed<Cinema[]>(() => cinemasStore.getCinemas)

const createMap = async (zoomLevel: number): Promise<google.maps.Map> => {
  const mapOptions: google.maps.MapOptions = {
    center: MAP_CENTER,
    zoom: zoomLevel,
    mapId: "88e121e7498414bd",
    disableDefaultUI: true,
  }

  const mapContainer = document.querySelector(`.map`) as HTMLElement

  return new mapsLibrary.Map(mapContainer, mapOptions)
}

const createMarker = async (cinema: Cinema): Promise<void> => {
  const marker = new markerLibrary.AdvancedMarkerElement({
    map,
    content: buildContent(cinema),
    position: await geocode(cinema),
    title: cinema.name,
  })

  marker.addListener("click", () => {
    router.push(`/cinema/${cinema.id}`)
  })
}

const buildContent = (cinema: Cinema): HTMLDivElement => {
  const content = document.createElement("div")

  content.classList.add("marker")
  content.innerHTML = `
    <a class="icon"
    href="/cinema/${cinema.id}"
    onclick="event.preventDefault(); router.push("/cinemas/${cinema.id}")">
        <img src="/svg/marker-${cinema.network.name}.svg" />
        <span class="fa-sr-only">${cinema.name}</span>
    </a>
    `
  return content
}

const geocode = async (cinema: Cinema): Promise<google.maps.LatLng> => {
  const query: string = `${cinema.name}, ${cinema.address}, ${cinema.city.name}`
  const { results } = await geocoder.geocode({ address: query })
  return results[0].geometry.location
}

const calculateZoomLevel = (): number => {
  const { width } = screen

  if (width < 800) return MAP_ZOOM_800
  else if (width < 1000) return MAP_ZOOM_1000
  else if (width < 1200) return MAP_ZOOM_1200
  else if (width < 1400) return MAP_ZOOM_1400
  else if (width < 1600) return MAP_ZOOM_1600
  else return MAP_ZOOM_XL
}

onBeforeMount(() => {
  if (!cinemas.value.length) {
    BackendApiService.getCinemas()
      .then(({ data }) => cinemasStore.cinemas = data)
  }
})

onMounted(async () => {
  await loader.importLibrary("geocoding").then(({ Geocoder }) => {
    geocoder = new Geocoder
  })

  await loader.importLibrary("marker").then((library) => {
    markerLibrary = library
  })

  loader.importLibrary("maps").then(async (library) => {
    const zoomLevel = calculateZoomLevel()
    mapsLibrary = library
    map = await createMap(zoomLevel)
    cinemas.value.forEach((cinema) => {
      createMarker(cinema)
    })
  })
})
</script>

<style scoped lang="scss">
@use "../assets/styles/variables";

.map {
  height: 70vh;
  width: 100%;
  border-radius: variables.$border-rounded;
}
</style>