import { defineStore } from "pinia"
import { Cinema } from "../interfaces"

export const useCinemasStore = defineStore({
  id: "CinemasStore",

  state: () => ({
    cinemas: [] as Cinema[],
  }),

  getters: {
    getCinemas: (state) => state.cinemas,
  },
})
