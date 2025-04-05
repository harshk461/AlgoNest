import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { FindParticularUserDTO } from './dto/find-user.dto';
=======
import { UserEntity } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { FindParticularUserDTO } from './dto/find-user.dto';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserDto } from './dto/add-admin-user.dto';
import { Roles } from './entities/role.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/add-client-user.dto';
// import { Twilio } from 'twilio';
>>>>>>> 2973b12 (new adds)

@Injectable()
export class UserService {
  constructor(
<<<<<<< HEAD
    @InjectRepository(User)
    private userRepository: Repository<User>,
=======
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
>>>>>>> 2973b12 (new adds)
    private readonly rawQueries: RawQueries,
  ) {}
  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getUser(userDto: FindParticularUserDTO): Promise<UserEntity[]> {
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
<<<<<<< HEAD
=======

  async getAllAdminUsers() {
    const users = await this.rawQueries.getAllAdminUsersQuery();

    return users;
  }

  async addAdminUser(adminUserDto: CreateAdminUserDto): Promise<AdminUser> {
    const role = await this.roleRepository.findOne({
      where: { role: adminUserDto.role },
    });

    const hashedPassword = await bcrypt.hash(adminUserDto.password, 10);

    const processed_data = {
      name: adminUserDto.name,
      email: adminUserDto.email,
      password: hashedPassword,
      gender: adminUserDto.gender,
      isActive: true,
      isEmailVerified: true,
      metadata: {
        role: adminUserDto.role,
        permissions: role ? role.permissions : [],
      },
    };

    const adminUser = this.adminUserRepository.create(processed_data);
    return await this.adminUserRepository.save(adminUser);
  }
  async addUser(userDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userDto.email }, { username: userDto.username }],
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async softDeleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.softDelete(userId);
  }

  async restoreUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      withDeleted: true,
    });

    console.log(user);

    if (!user || !user.deletedAt) {
      throw new Error('User not found or not deleted');
    }

    await this.userRepository.restore(userId);
  }

  async getAllDeletedClientUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: { deletedAt: Not(IsNull()) },
      withDeleted: true,
    });
  }
>>>>>>> 2973b12 (new adds)
}
