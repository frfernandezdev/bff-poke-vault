import { Controller, Get, Logger, Param } from "@nestjs/common";

import { GetByIdPokemonService } from "@/src/contexts/pokemons/application/get-by-id.service";

import { PokemonResponseDTO } from "../dtos/response-pokemon.dto";

@Controller("pokemons")
export class GetByIdPokemonController {
  private readonly logger = new Logger(GetByIdPokemonController.name);

  constructor(private readonly service: GetByIdPokemonService) {}

  @Get(":id")
  async handle(@Param("id") id: string) {
    return PokemonResponseDTO.make({ result: await this.service.findById(id) });
  }
}
