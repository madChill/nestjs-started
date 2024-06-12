import { Module } from '@nestjs/common';
import { SequelizeModule as sequelize } from '@nestjs/sequelize';
import { parse } from 'pg-connection-string'
import * as dotenv from 'dotenv';

// To load env files on start:
dotenv.config();
@Module({
  imports: [
    sequelize.forRoot({
      dialect: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      logging: false,
      define: {
        underscored: true,
      },
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})

export class SequelizeModule {}