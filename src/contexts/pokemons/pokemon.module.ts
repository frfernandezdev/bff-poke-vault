import { Module } from "@nestjs/common";

import { PokeApiModule } from "../shared/infrastructure/persistence/poke-api/PokeApiModule";
import { GetAllPokemonService } from "./application/get-all.service";
import { GetByIdPokemonService } from "./application/get-by-id.service";
import { GetTypesPokemonService } from "./application/get-types.service";

@Module({
  imports: [PokeApiModule],
  providers: [
    GetAllPokemonService,
    GetByIdPokemonService,
    GetTypesPokemonService,
  ],
  exports: [
    GetAllPokemonService,
    GetByIdPokemonService,
    GetTypesPokemonService,
  ],
})
export class PokemonModule {}
