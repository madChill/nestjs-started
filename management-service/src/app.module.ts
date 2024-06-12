import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { SequelizeModule } from 'src/config/sequelize.config'
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [
    SequelizeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
