import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FindParticularUserDTO } from './dto/find-user.dto';
import { CreateAdminUserDto } from './dto/add-admin-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all-client-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('get-user')
  getUser(@Body() body: FindParticularUserDTO) {
    return this.userService.getUser(body);
  }

  @Get('all-admin-users')
  getAllAdminUsers() {
    return this.userService.getAllAdminUsers();
  }

  @Get('all-deleted-client-users')
  getAllDeletedClientUsers() {
    return this.userService.getAllDeletedClientUsers();
  }

  @Post('add-admin-user')
  addAdminUser(@Body() body: CreateAdminUserDto) {
    return this.userService.addAdminUser(body);
  }

  @Put('soft-delete-user')
  softDeleteUser(@Query('id') id: string) {
    return this.userService.softDeleteUser(id);
  }

  @Put('restore-user')
  restoreUser(@Query('id') id: string) {
    return this.userService.restoreUser(id);
  }
}
