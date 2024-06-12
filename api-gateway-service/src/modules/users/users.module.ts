import { Module } from '@nestjs/common';
import { ReflectionService } from '@grpc/reflection';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';

import { UsersService } from './users.service';
import { UsersInternalController } from './users.internal.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
  ],
  controllers: [UsersInternalController],
  providers: [UsersResolver, UsersService],
})
export class UsersModule { }
