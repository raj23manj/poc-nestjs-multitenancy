import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async createPb(user: UserDto): Promise<User> {
    return await this.userRepository.schema('public').create<User>(user);
  }

  async findOneByEmailPb(email: string): Promise<User> {
    return await this.userRepository
      .schema('public')
      .findOne<User>({ where: { email } });
  }

  async findOneByIdPb(id: number): Promise<User> {
    return await this.userRepository
      .schema('public')
      .findOne<User>({ where: { id } });
  }

  findAllStatic(): Promise<User[]> {
    return this.userRepository.sayHello();
  }
}
