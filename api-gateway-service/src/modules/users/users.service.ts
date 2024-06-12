import { BadRequestException, Injectable, Inject, OnModuleInit } from '@nestjs/common';
import {
  UserById,
  UserByEmail,
  CreateUserInput,
  UpdateUserInput,
  UserServiceDto,
  findAllInput,
  GetUserOutput
} from './users.interface';
import ManagementService from '../grpc/management.service';

@Injectable()
export class UsersService {
  constructor() { }
  async createUser(user: any) {
    const result = await ManagementService.managementServiceGrpc.CreateUser(user)
    return result
  }

  async findAll(input: findAllInput): Promise<any> {
    const users = await ManagementService.managementServiceGrpc.FindAllUsers(input)
    return users;
  }

  async updateUser(input: any): Promise<GetUserOutput> {
    const updatedUser = await ManagementService.managementServiceGrpc.UpdateUser(input)
    return updatedUser;
  }

  async findById(id: number): Promise<any> {
    const users = await ManagementService.managementServiceGrpc.FindById({ id })
    return users;
  }
  
  async deleteUser(id: number): Promise<any> {
    const users = await ManagementService.managementServiceGrpc.DeleteUser({id})
    return users.id;
  }
}
