import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfig } from './config/graphql_config';
import { configuration } from './config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

// feature modules
import { CoreModule } from './modules/core/core.module';
@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // graphql
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfig,
    }),

    // feature modules
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
