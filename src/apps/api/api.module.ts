import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@/src/contexts/shared/infrastructure/logger/logger.module";

import { ApiHealthModule } from "./health/health.module";
import { ApiPokemonModule } from "./pokemons/pokemon.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    ApiHealthModule,
    ApiPokemonModule,
  ],
})
export class ApiModule {}
