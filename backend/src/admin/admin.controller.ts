import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('all-roles')
  getAllRoles() {
    return this.adminService.getAllRoles();
  }

  @Post('add-role')
  addNewRole(@Body() createRoleDto: CreateRoleDto) {
    return this.adminService.addNewRole(createRoleDto);
  }
}
