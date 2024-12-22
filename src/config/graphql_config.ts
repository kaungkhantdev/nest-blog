import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Injectable()
export class GqlConfig implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      typePaths: ['./**/*.graphql', './**/*.gql'],
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(), // Keep only this plugin
      ],
    };
  }
}
