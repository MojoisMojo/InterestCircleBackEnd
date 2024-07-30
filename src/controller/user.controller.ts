import { Inject, Controller, Get, Query, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get/info')
  async getUser(@Query('uid') uid: string) {
    if (!uid) {
      return {
        status: 'failed',
        msg: 'no Uid',
      };
    }
    try {
      const user = await this.userService.getUser({ uid });
      return { status: 'success', msg: 'OK', data: { user: user } };
    } catch (e) {
      console.log(e);
      return { status: 'failed', msg: 'crushed' };
    }
  }

  @Get('/get/circles')
  async getUserCircles(@Query('uid') uid: string) {}

  @Get('/get/interests')
  async getUserInterests(@Query('uid') uid: string) {
    // 根据兴趣返回
  }

  @Post('/createUser')
  async createUser(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('pwd') passWord: string
  ) {
    if (!email || !passWord || !name) {
      return {
        status: 'failed',
        msg: 'You didn\'t put an email Or password Or name',
      };
    }
    try {
      const userInfo = await this.userService.createUser({
        name,
        email,
        passWord,
      });
      console.log(userInfo);
      return {
        status: 'success',
        msg: 'OK',
        data: { user: userInfo },
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'failed',
        msg: 'An error occurred while creating the user. Please try again later.',
      };
    }
  }

  @Post('/login')
  async loginUser(
    @Query('email') email: string,
    @Query('pwd') passWord: string
  ) {
    if (!email || !passWord) {
      return {
        status: 'failed',
        msg: 'No Email Or PassWord',
      };
    }
    try {
      const user = await this.userService.loginUser({ email, passWord });
      return user
        ? {
            status: 'success',
            msg: 'OK',
            data: { user: user },
          }
        : { status: 'failed', msg: '密码错误' };
    } catch (e) {
      console.log(e);
      return {
        status: 'failed',
        msg: '服务器崩溃',
      };
    }
  }
}
