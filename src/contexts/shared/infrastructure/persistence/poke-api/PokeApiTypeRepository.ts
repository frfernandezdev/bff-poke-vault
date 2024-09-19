import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, Observable } from "rxjs";

@Injectable()
export class PokeApiTypeRepository {
  private readonly logger = new Logger(PokeApiTypeRepository.name);

  constructor(private readonly httpService: HttpService) {}

  findById(id: string): Observable<any> {
    return this.httpService.get(`/type/${id}`).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response?.data);
        throw "An error happened to get by id type";
      }),
    );
  }
}
