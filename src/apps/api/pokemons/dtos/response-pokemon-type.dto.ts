import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { ResponseDTO } from "@/src/contexts/shared/infrastructure/response/response.dto";

export class LanguageResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Expose()
  readonly url?: string;
}

export class NameResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Type(() => LanguageResponse)
  @Expose()
  readonly language?: LanguageResponse;
}

export class TypeResponse {
  @ApiResponseProperty()
  @Expose()
  readonly name?: string;

  @ApiResponseProperty()
  @Expose()
  readonly url?: string;

  @ApiResponseProperty()
  @Type(() => NameResponse)
  @Expose()
  readonly names?: NameResponse;
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
  readonly types?: PokemonTypeResponse[];
}

export class PokemonTypeResponseDTO extends ResponseDTO {
  @ApiResponseProperty({
    type: PokemonResponse,
  })
  @Type(() => PokemonResponse)
  @Expose()
  readonly result?: PokemonResponse[];
}
