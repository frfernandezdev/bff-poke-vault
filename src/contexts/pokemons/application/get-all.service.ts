import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { FindPokemonDto } from "@/src/apps/api/pokemons/dtos/find-pokemons.dto";

import { PokeApiPokemonRepository } from "../../shared/infrastructure/persistence/poke-api/PokeApiPokemonRepository";

@Injectable()
export class GetAllPokemonService {
  private readonly logger = new Logger(GetAllPokemonService.name);

  constructor(private readonly repository: PokeApiPokemonRepository) {}

  async findAll({ limit, offset }: FindPokemonDto): Promise<any> {
    const { data } = await firstValueFrom(
      this.repository.findAll(limit, offset),
    );
    return data;
  }
}
