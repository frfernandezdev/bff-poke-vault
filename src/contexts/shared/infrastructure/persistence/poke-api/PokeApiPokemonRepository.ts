import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, Observable } from "rxjs";

@Injectable()
export class PokeApiPokemonRepository {
  private readonly logger = new Logger(PokeApiPokemonRepository.name);

  constructor(private readonly httpService: HttpService) {}

  findAll(limit: number = 100, offset: number = 0): Observable<any> {
    return this.httpService
      .get("/pokemon", {
        params: {
          limit,
          offset,
        },
      })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw "An error happened to get all pokemons";
        }),
      );
  }

  findById(id: string): Observable<any> {
    return this.httpService.get(`/pokemon/${id}`).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response?.data);
        throw "An error happened to get by id pokemon";
      }),
    );
  }
}
