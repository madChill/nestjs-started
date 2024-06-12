import { BadRequestException, Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  ClientGrpc,
} from '@nestjs/microservices';
import { User } from './user.model';
import {
  UserById,
  UserByEmail,
  CreateUserInput,
  UpdateUserInput,
  UserServiceDto
} from './users.interface';
import { ConstantsMudule, AUTH_PACKAGE_NAME, AUTH_SERVICE } from '../../utils/constans';
import { tap } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
    @Inject(AUTH_SERVICE) private readonly client: ClientGrpc,
  ) { }
  private userServiceGrpc: UserServiceDto;
  onModuleInit() {
    this.userServiceGrpc = this.client.getService<UserServiceDto>('UserService');
  }
  async createUser(user: any) {
    const userRaw = await this.userModel.findOne({
      where: [{ email: user.email }],
    });
    if (userRaw) {
      throw new BadRequestException('username or email is invalid.');
    }
    if(user.password){
      user.password = this.hashPassword(user.password)
    }
    const userRe = await this.userModel.create({
      ...user,
      roles: ConstantsMudule.roles.employee
    })
    return userRe.dataValues
  }

  hashPassword = (password: string) => bcrypt.hash(password, 10);

  async findAll(input: { limit: number, offset: number, sortField: string, sortDirection: string, search: string }): Promise<any> {
    const { limit, offset, sortField, sortDirection, search } = input;

    const where = search ? {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ],
    } : {};

    const order = sortField && sortDirection ? [[sortField, sortDirection]] : undefined;

    const user = await this.userModel.findAll({
      where,
      limit,
      offset,
      ...order ? order : { createdAt: 'DESC' },
    });

    const total = await this.userModel.count({ where });
    return { user , total };
  }
  async updateUser(input: any): Promise<User> {
    const { id, ...rest } = input;
    if(input.password){
      rest.password = this.hashPassword(input.password)
    }
    await this.userModel.update(rest, {
      where: { id },
    });
    const updatedUser = await this.userModel.findOne({ where: { id } });
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }



  async findById(id: number): Promise<any> {
    const users = await this.userModel.findByPk(id)
    return users;
  }
  async findByEmail(data: UserByEmail): Promise<any> {
    const { emails } = data;

    console.log(`emails: ${emails}`);

    const filters = _.pickBy(
      {
        email: emails,
      },
      _.identity,
    );

    if (_.isEmpty(filters)) return [];

    const users = await this.userModel.findAll({
      where: filters,
      attributes: [
        ['uuid', 'id'],
        'email',
        'displayName',
        'phoneCountryCode',
        'phoneNumber',
        'dob',
        'status',
        'gender',
        ['id', 'primaryKey'],
        'createdAt',
        'nationality',
      ],
    });

    return users;
  }
  async deleteUser(id: number): Promise<any> {
    console.log(id);
    
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return id;
  }
}
