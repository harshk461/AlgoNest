import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
