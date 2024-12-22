import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfig } from './config/graphql_config';

// feature modules
import { DemoModule } from './modules/demo/demo.module';

@Module({
  imports: [
    // graphql
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfig,
    }),

    // feature modules
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
