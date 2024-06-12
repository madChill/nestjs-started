import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  UserById,
  UserByEmail,
} from './users.interface';
import { Metadata } from 'grpc';

import { UsersService } from './users.service';

@Controller('users')
export class UsersInternalController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService')
  async findById(data: number): Promise<any> {
    const users = await this.usersService.findById(data);
    return { users };
  }
}
