import { defineStore } from "pinia"
import { PlayingMovie } from "../interfaces"

export const useMoviesStore = defineStore({
  id: "MoviesStore",

  state: () => ({
    playingMovies: [] as PlayingMovie[],
  }),

  getters: {
    getPlayingMovies: (state) => state.playingMovies
  },
})
