import { Injectable, Logger } from "@nestjs/common";
import { from, lastValueFrom, map, mergeMap, toArray } from "rxjs";

import { PokeApiPokemonRepository } from "../../shared/infrastructure/persistence/poke-api/PokeApiPokemonRepository";
import { PokeApiTypeRepository } from "../../shared/infrastructure/persistence/poke-api/PokeApiTypeRepository";

@Injectable()
export class GetTypesPokemonService {
  private readonly logger = new Logger(GetTypesPokemonService.name);

  constructor(
    private readonly repositoryPokemon: PokeApiPokemonRepository,
    private readonly repositoryType: PokeApiTypeRepository,
  ) {}

  async findTypes(id: string) {
    const results = await lastValueFrom(
      this.repositoryPokemon.findById(id).pipe(
        mergeMap(({ data }) => {
          const { types } = data;
          return from(types).pipe(
            mergeMap((item: any) => {
              const matches = item?.type?.url
                ?.replace(/\/+$/, "")
                .match(/\d+$/);
              const id = matches[0];
              return this.repositoryType.findById(id).pipe(
                map(({ data: { names } }) => ({
                  ...item,
                  type: {
                    ...item.type,
                    names: names.filter(
                      ({
                        language: { name },
                      }: {
                        language: { name: string };
                      }) => ["es", "ja"].includes(name),
                    ),
                  },
                })),
              );
            }),
            toArray(),
            map(types => ({
              ...data,
              types,
            })),
          );
        }),
      ),
    );
    return results;
  }
}
