import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { UserService } from './user.service';
import { Roles } from 'src/admin/entity/role.entity';
import { Test } from './entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AdminUser, Roles, Test])],
  controllers: [UserController],
  providers: [UserService, RawQueries],
})
export class UserModule {}
