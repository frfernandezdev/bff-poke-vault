import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { ApiModule } from "./apps/api/api.module";
import { ResponseInterceptor } from "./contexts/shared/infrastructure/response/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("api");
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  const config = new DocumentBuilder()
    .setTitle("BFF-Poke-Vault")
    .setDescription("Backend for Front-end Poke Vault")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      //strategy: 'excludeAll',
      //excludeExtraneousValues: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
}

process.on("uncaughtException", handleError);
