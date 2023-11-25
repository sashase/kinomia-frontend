import { defineStore } from "pinia"
import { MovieBrief } from "../interfaces"

export const useMoviesStore = defineStore({
  id: "MoviesStore",

  state: () => ({
    movies: [] as MovieBrief[],
  }),

  getters: {
    getMovies: (state) => state.movies,
  },
})
