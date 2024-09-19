import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class FindPokemonDto {
  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number = 0;

  @ApiPropertyOptional({ default: 100 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  limit: number = 100;
}
