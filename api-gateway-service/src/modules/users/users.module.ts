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
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE } from '../../utils/constans'

console.log(process.env.MANAGEMENT_SERVICE, "===process.env.MANAGEMENT_SERVICE====");

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'grpc://localhost:5005',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'src/proto/user.proto',
        },
      },
    ]),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
  ],
  controllers: [UsersInternalController],
  providers: [UsersResolver, UsersService],
})
export class UsersModule { }
