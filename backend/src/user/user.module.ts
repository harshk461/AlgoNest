import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
import { Roles } from './entities/roles.entity';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AdminUser, Roles])],
  controllers: [UserController],
  providers: [UserService, RawQueries],
})
export class UserModule {}
