import { Module } from "@nestjs/common";

import { PokemonModule } from "@/src/contexts/pokemons/pokemon.module";
import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";

import { GetAllPokemonController } from "./controllers/get-all.controller";
import { GetByIdPokemonController } from "./controllers/get-by-id.controller";
import { GetTypesPokemonController } from "./controllers/get-types.controller";

@Module({
  imports: [PokemonModule, LoggerModule],
  controllers: [
    GetAllPokemonController,
    GetByIdPokemonController,
    GetTypesPokemonController,
  ],
})
export class ApiPokemonModule {}
