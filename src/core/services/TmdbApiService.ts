import { AxiosResponse } from "axios"
import ApiService from "./ApiService"

class TmdbApiService extends ApiService {
  public static async getMovie(id: number): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_TMDB_API_URL}/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    return this.requestHandler(request)
  }

  public static async getCast(movieId: number): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_TMDB_API_URL}/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    return this.requestHandler(request)
  }

  public static async getReviews(movieId: number): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_TMDB_API_URL}/movie/${movieId}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    return this.requestHandler(request)
  }
}

export default TmdbApiService
