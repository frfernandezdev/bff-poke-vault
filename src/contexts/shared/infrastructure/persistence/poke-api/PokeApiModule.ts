import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { PokeApiPokemonRepository } from "./PokeApiPokemonRepository";
import { PokeApiTypeRepository } from "./PokeApiTypeRepository";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: configService.get("POKE_API_URL"),
      }),
    }),
  ],
  providers: [PokeApiPokemonRepository, PokeApiTypeRepository],
  exports: [PokeApiPokemonRepository, PokeApiTypeRepository],
})
export class PokeApiModule {}
