import { AxiosResponse } from "axios"
import ApiService from "./ApiService"

class MoviesApiService extends ApiService {
  public static async getPlayingMovies(): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_APP_API_URL}/movies`)
    return this.requestHandler(request)
  }

  public static async getMovie(id: string): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_TMDB_API_URL}/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    return this.requestHandler(request)
  }
}

export default MoviesApiService
