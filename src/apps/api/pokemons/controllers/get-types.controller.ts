import { Controller, Get, Logger, Param } from "@nestjs/common";

import { GetTypesPokemonService } from "@/src/contexts/pokemons/application/get-types.service";

import { PokemonTypeResponseDTO } from "../dtos/response-pokemon-type.dto";

@Controller("pokemonAndTypes")
export class GetTypesPokemonController {
  private readonly logger = new Logger(GetTypesPokemonController.name);

  constructor(private readonly service: GetTypesPokemonService) {}

  @Get(":id")
  async handle(@Param("id") id: string) {
    return PokemonTypeResponseDTO.make({
      result: await this.service.findTypes(id),
    });
  }
}
