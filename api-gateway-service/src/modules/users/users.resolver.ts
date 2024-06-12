import { Args, ID, Query, Resolver, ResolveReference, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
    User,
    CreateUserInput,
    UpdateUserInput,
    GetUserOutput
  } from './users.interface';
@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  getEmployee(@Args({ name: 'id', type: () => ID }) id: number ) {
    return this.usersService.findById(id);
  }

  @Query(returns => [User])
  async getEmployees(
    @Args('input') input: { limit: number, offset: number, sortField: string, sortDirection: string, search: string },
  ) {
    const users = await this.usersService.findAll(input);
    return users
  }
  
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    const users = await this.usersService.createUser(input);
    return { user: users, status: true}
  }
  
  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    const users = await this.usersService.updateUser(input);
    return { user: users, status: true}
  }
  

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.usersService.deleteUser(id);
  }

}