import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersInternalController } from './users.internal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [UsersInternalController],
  providers: [UsersService],
})
export class UsersModule {}
