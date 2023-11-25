import { AxiosResponse } from "axios"
import ApiService from "./ApiService"

class TmdbApiService extends ApiService {
  public static async getMovie(id: string): Promise<AxiosResponse> {
    const request = this.axiosInstance.get(`${import.meta.env.VITE_TMDB_API_URL}/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    return this.requestHandler(request)
  }
}

export default TmdbApiService
