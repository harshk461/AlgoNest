import { ConflictException, Injectable } from '@nestjs/common';
import { Roles } from './entity/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async getAllRoles() {
    const roles = await this.rolesRepository.find();

    return roles;
  }

  async addNewRole(createRoleDto: CreateRoleDto): Promise<Roles> {
    const existingRole = await this.rolesRepository.findOne({
      where: { role: createRoleDto.role },
    });

    if (existingRole) {
      throw new ConflictException('Role already exists');
    }

    const newRole = this.rolesRepository.create(createRoleDto);

    return this.rolesRepository.save(newRole);
  }
}
