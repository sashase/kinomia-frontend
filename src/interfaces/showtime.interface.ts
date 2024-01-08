import { Cinema } from "."

export interface Showtime {
  id: number
  internal_showtime_id: number
  movie_id: number
  movie_title: string
  date: string
  format: string
  order_link: string
  price: number
  cinema_id: number
  cinema: Cinema
}