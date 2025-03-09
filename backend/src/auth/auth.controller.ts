import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/admin-user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User): Promise<Partial<User>> {
    return this.authService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(
    @GetUser() user: User,
    @Body() updateData: Partial<User>,
  ): Promise<Partial<User>> {
    return this.authService.updateProfile(user.id, updateData);
  }
}
