import { Observable, ReplaySubject, Subject } from 'rxjs';

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
export interface ManagementServiceDto {
  FindById(data: { id: number }): Promise<GetUserOutput>;
  CreateUser(data: CreateUserInput): Promise<GetUserOutput>;
  UpdateUser(data: UpdateUserInput): Promise<GetUserOutput>;
  DeleteUser( data: { id: number }): Promise<GetUserOutput>;
  FindAllUsers(data: FindAllUsersRequest): Promise<GetUserOutput>;
}
