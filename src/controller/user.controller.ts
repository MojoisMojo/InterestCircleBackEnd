import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Inject,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { IUser } from '../interface/user.interface';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/')
  async createUser(@Body() user: IUser) {
    return this.userService.createUser(user);
  }

  @Get('/:uid')
  async getUserById(@Param() uid: string) {
    return this.userService.getUserById(uid);
  }

  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('/:uid')
  async updateUser(@Param() uid: string, @Body() user: Partial<IUser>) {
    return this.userService.updateUser(uid, user);
  }
}
