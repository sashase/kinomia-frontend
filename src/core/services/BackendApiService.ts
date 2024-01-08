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

  public static async getCinemas(): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/cinemas`)
    return this.requestHandler(request)
  }

  public static async getShowtimes(query: { movieId?: number, cinemaId?: number }): Promise<AxiosResponse> {
    const { movieId, cinemaId } = query
    let params: string = ""

    if (movieId && cinemaId) params = `?movie_id=${movieId}&cinema_id=${cinemaId}`
    else if (movieId && !cinemaId) params = `?movie_id=${movieId}`
    else if (!movieId && cinemaId) params = `?cinema_id=${cinemaId}`

    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/showtimes${params}`)
    return this.requestHandler(request)
  }
}

export default BackendApiService
