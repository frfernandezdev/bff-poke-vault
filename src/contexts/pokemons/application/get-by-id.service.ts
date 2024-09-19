import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { PokeApiPokemonRepository } from "../../shared/infrastructure/persistence/poke-api/PokeApiPokemonRepository";

@Injectable()
export class GetByIdPokemonService {
  private readonly logger = new Logger(GetByIdPokemonService.name);

  constructor(private readonly repository: PokeApiPokemonRepository) {}

  async findById(id: string): Promise<any> {
    const { data } = await firstValueFrom(this.repository.findById(id));
    return data;
  }
}
