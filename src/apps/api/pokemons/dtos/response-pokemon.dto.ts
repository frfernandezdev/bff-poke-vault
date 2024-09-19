import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { ResponsePaginatorDTO } from "@/src/contexts/shared/infrastructure/response/paginator.dto";
import { ResponseDTO } from "@/src/contexts/shared/infrastructure/response/response.dto";

export class PokemonsResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Expose()
  readonly url?: string;
}

export class TypeResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Expose()
  readonly url?: string;
}

export class PokemonTypeResponse {
  @ApiResponseProperty()
  @Expose()
  readonly slot?: number;

  @ApiResponseProperty()
  @Type(() => TypeResponse)
  @Expose()
  readonly type?: TypeResponse;
}

export class PokemonResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Type(() => PokemonTypeResponse)
  @Expose()
  readonly types?: PokemonTypeResponse;
}

export class PokemonResponseDTO extends ResponseDTO {
  @ApiResponseProperty({
    type: PokemonResponse,
  })
  @Type(() => PokemonResponse)
  @Expose()
  readonly result?: PokemonResponse;
}

export class PokemonResponsePaginatorDTO extends ResponsePaginatorDTO {
  @ApiResponseProperty({
    type: [PokemonsResponse],
  })
  @Type(() => PokemonsResponse)
  @Expose()
  readonly results?: PokemonsResponse[];
}
