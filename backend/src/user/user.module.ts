import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { Roles } from './entities/role.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AdminUser, Roles])],
  controllers: [UserController],
  providers: [UserService, RawQueries],
})
export class UserModule {}
