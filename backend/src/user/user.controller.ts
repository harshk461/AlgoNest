import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
<<<<<<< HEAD
  @Get('get-all-users')
=======
  // @UseGuards(JwtAuthGuard)
  @Get('get-client-users')
>>>>>>> 2973b12 (new adds)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
