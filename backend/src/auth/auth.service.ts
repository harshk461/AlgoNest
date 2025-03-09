/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/admin-user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password, ...rest } = registerDto;

    // Check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with all provided fields
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });

    await this.userRepository.save(user);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      // Remove sensitive data before sending user info
      const { password, ...userInfo } = user;

      return {
        accessToken,
        user: userInfo,
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async getProfile(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...userInfo } = user;
    return userInfo;
  }

  async updateProfile(
    id: string,
    updateData: Partial<User>,
  ): Promise<Partial<User>> {
    // Ensure password isn't updated through this method
    delete updateData.password;

    await this.userRepository.update(id, updateData);
    return this.getProfile(id);
  }
}
