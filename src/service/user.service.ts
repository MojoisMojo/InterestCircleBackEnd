import { Provide, Inject } from '@midwayjs/core';
import { UserRepository } from '../repository/user.repository';
import { IUser } from '../interface/user.interface';
import { User } from '../model/user.model';

@Provide()
export class UserService {
  @Inject()
  userRepository: UserRepository;

  async createUser(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUserById(uid: string): Promise<User> {
    return this.userRepository.findOne({where: {uid}});
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(uid: string, user: Partial<IUser>): Promise<void> {
    await this.userRepository.update(uid, user);
  }

  async deleteUser(uid: string): Promise<void> {
    await this.userRepository.delete(uid);
  }
}
