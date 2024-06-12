import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.model';
import {
  UserById,
  UserByEmail,
  CreateUserInput,
  UpdateUserInput,
  findAllInput
} from './users.interface';
import { ConstantsMudule } from '../../utils/constans';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    // @InjectModel(Tag)
    // private tagModel: typeof Tag,
  ) { }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: [{ email: username }],
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new BadRequestException(
      'Wrong username or password. Please try again.',
    );
  }
  async login(user: any) {
    const { password, resetpasswordtoken, registrationtoken, ...userInfo } =
      await this.validateUser(user.username, user.password);
    return {
      access_token: this.jwtService.sign(userInfo),
      ...userInfo,
    };
  }

  async createUser(user: any) {
    //check existed
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

  async findAll(input: findAllInput): Promise<any> {
    const {  limit = 10, offset = 0, sortField, sortDirection, search } = input;
    const where = search ? {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ],
    } : {};
    const order = sortField && sortDirection ? [[sortField, sortDirection]] : undefined;

    const users = await this.userModel.findAll({
      where,
      limit,
      offset,
    });

    const total = await this.userModel.count({ where });
    return { users , total };
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
    return updatedUser.dataValues;
  }



  async findById(id: number): Promise<any> {
    const users = await this.userModel.findByPk(id)
    return users;
  }
  async findByEmail(data: UserByEmail): Promise<any> {
    const { emails } = data;

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
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return user;
  }
}
