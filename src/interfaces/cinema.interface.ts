import { City, Network } from "."

export interface Cinema {
  id: number
  internal_cinema_id: string
  name: string
  address: string
  network_id: number
  city_id: number
  network: Network
  city: City
}