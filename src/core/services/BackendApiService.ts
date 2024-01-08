import { AxiosResponse } from "axios"
import ApiService from "./ApiService"

class BackendApiService extends ApiService {
  public static async getPlayingMovies(): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/movies`)
    return this.requestHandler(request)
  }

  public static async getNetworks(): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/networks`)
    return this.requestHandler(request)
  }

  public static async getCities(): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/cities`)
    return this.requestHandler(request)
  }

  public static async getCinemas(networkId?: number, cityId?: number): Promise<AxiosResponse> {
    let query: string = ""

    if (networkId && cityId) query = `?network_id=${networkId}&city_id=${cityId}`
    else if (networkId && !cityId) query = `?network_id=${networkId}`
    else if (!networkId && cityId) query = `?city_id=${cityId}`

    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/cinemas${query}`)
    return this.requestHandler(request)
  }

  public static async getShowtimes(movieId: number): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/showtimes?movie_id=${movieId}`)
    return this.requestHandler(request)
  }
}

export default BackendApiService
