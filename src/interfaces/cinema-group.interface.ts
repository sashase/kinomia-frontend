import { Showtime } from "."

export interface CinemaGroup {
  cinemaName: string
  networkName: string
  showtimes: Showtime[]
}