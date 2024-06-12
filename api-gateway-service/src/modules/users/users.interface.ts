import { Observable, ReplaySubject, Subject } from 'rxjs';

export enum Include {
  tags = 'tags',
  appMappings = 'appMappings',
}

export interface UserById {
  id?: string,
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
export interface GetUserOutput {
  id: number
  email?: number
  firstName?: number
  lastName?: number
  phoneNumber?: number
  password?: string
}
export interface FindAllUsersRequest {
  search?: string
  limit?: number
  offset?: number
  sort?: string
}
export interface UserServiceDto {
  FindById(data: number): Observable<GetUserOutput>;
  CreateUser(data: CreateUserInput): Observable<GetUserOutput>;
  UpdateUser(data: UpdateUserInput): Observable<GetUserOutput>;
  DeleteUser(data: number): Observable<number>;
  FindAllUsers(data: FindAllUsersRequest): Observable<GetUserOutput>;
}
export class IUser {
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