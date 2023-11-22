interface Network {
  id: number
  name: string
}

interface Cinema {
  id: number
  internal_cinema_id: string
  name: string
  address: string
  network_id: number
  city_id: number
  network: Network
}

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