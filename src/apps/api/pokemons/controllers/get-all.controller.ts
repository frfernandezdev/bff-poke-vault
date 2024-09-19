import { Controller, Get, Logger, Query } from "@nestjs/common";

import { GetAllPokemonService } from "@/src/contexts/pokemons/application/get-all.service";

import { FindPokemonDto } from "../dtos/find-pokemons.dto";
import { PokemonResponsePaginatorDTO } from "../dtos/response-pokemon.dto";

@Controller("pokemons")
export class GetAllPokemonController {
  private readonly logger = new Logger(GetAllPokemonController.name);

  constructor(private readonly service: GetAllPokemonService) {}

  @Get()
  async handle(@Query() findPokemonDto: FindPokemonDto) {
    return PokemonResponsePaginatorDTO.make(
      await this.service.findAll(findPokemonDto),
    );
  }
}
