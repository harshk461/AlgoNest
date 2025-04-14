import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/role.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([Roles])],
})
export class AdminModule {}
