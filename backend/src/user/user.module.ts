import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
=======
import { UserEntity } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
import { Roles } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AdminUser, Roles])],
>>>>>>> 2973b12 (new adds)
  controllers: [UserController],
  providers: [UserService, RawQueries],
})
export class UserModule {}
