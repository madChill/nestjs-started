import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export enum Include {
  tags = 'tags',
  appMappings = 'appMappings',
}

export interface UserById {
  ids?: string[],
  primaryKey?: number[] | string[];
  include?: Include[],
}

export interface UserByEmail {
  emails?: string[],
}

export interface CreateUserInput {
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
}
export interface UpdateUserInput {
  id: number
  email?: number
  firstName?: number
  lastName?: number
  phoneNumber?: number
  password?: string
}
export interface getUserOutput {
  id: number
  email?: number
  firstName?: number
  lastName?: number
  phoneNumber?: number
  password?: string
}
export interface findAllInput {
  limit: number,
  offset: number,
  sortField: string,
  sortDirection: string,
  search: string
}

export interface UsersServiceController {
  createUser(request: CreateUserInput): Promise<getUserOutput> | Observable<getUserOutput> | getUserOutput;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    // const grpcMethods: string[] = ["createUser", "findAllUsers", "findOneUser", "updateUser", "removeUser"];
    const grpcMethods: string[] = ["createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}