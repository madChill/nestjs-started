import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  UserById,
  UserByEmail,
  UpdateUserInput,
  CreateUserInput,
  findAllInput
} from './users.interface';
import { Metadata } from 'grpc';

import { UsersService } from './users.service';

@Controller('users')
export class UsersInternalController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'FindById')
  async findById(data: { id: number }): Promise<any> {
    const users = await this.usersService.findById(data.id);
    console.log(users);
    return users;
  
  }
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserInput): Promise<any> {
    console.log(data, "==========22===data===========");
    const { password, ...user} = await this.usersService.createUser(data);
    console.log(user, "=============user===========");

    return user;
  }
  
  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: UpdateUserInput): Promise<any> {
    const { password, ...user} = await this.usersService.updateUser(data);
    return user;
  }
  
  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: { id: number }): Promise<any> {
    const result = await this.usersService.deleteUser(data.id);
    return result;
  }

  
  @GrpcMethod('UserService', 'FindAllUsers')
  async findAllUser(data: findAllInput): Promise<any> {
    console.log(data, "==data==");
    
    const users = await this.usersService.findAll(data);
    return users;
  }
  @GrpcMethod('UserService')
  async findByEmail(data: UserByEmail): Promise<any> {
    return await this.usersService.findByEmail(data);
  }
}
