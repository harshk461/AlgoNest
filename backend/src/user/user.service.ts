import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { FindParticularUserDTO } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly rawQueries: RawQueries,
  ) {}
  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getUser(userDto: FindParticularUserDTO): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (userDto.id) {
      query.andWhere('user.id = :id', { id: userDto.id });
    }
    if (userDto.username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${userDto.username}%`,
      });
    }
    if (userDto.email) {
      query.andWhere('user.email = :email', { email: userDto.email });
    }
    if (userDto.phoneNumber) {
      query.andWhere('user.phoneNumber LIKE :phoneNumber', {
        phoneNumber: `%${userDto.phoneNumber}%`,
      });
    }

    return query.getMany();
  }
}
