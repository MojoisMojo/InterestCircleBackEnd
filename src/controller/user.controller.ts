import {
  Controller,
  Post,
  Get,
  // Put,
  Param,
  Body,
  Inject,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { ICreateUserOptions } from '../interface/user.interface';
import { Context } from '@midwayjs/koa';

@Controller('/users')
export class UserController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    console.log(body);
    let { email, password } = body;
    if(!email || !password){
      return {
        stauts:'failed',
        msg:'未收到用户名或密码',
        data:{}
      }
    }
    let userInfo = await this.userService.checkPassword({ email, password });
    if (!userInfo) {
      return {
        status: 'failed',
        msg: '用户或密码错误',
        data: { email, password },
      };
    }
    this.ctx.logger.debug('userInfo:', userInfo);
    return {
      status: 'success',
      msg: '登录成功',
      data: { user: userInfo },
    };
  }
  @Post('/register')
  async register(@Body() options: ICreateUserOptions) {
    this.ctx.logger.debug('options:', options);
    let useInfo = await this.userService.createUser(options);
    if (!useInfo) {
      return {
        status: 'failed',
        msg: '创建用户失败',
        data: options,
      };
    }
    return {
      status: 'success',
      msg: '创建用户成功',
      data: { user: useInfo },
    };
  }

  @Get('/uid/:uid')
  async getUserById(@Param('uid') uid: string) {
    this.ctx.logger.debug('uid:', uid);
    let userInfo = await this.userService.getUserInfo({ uid });
    return userInfo
      ? { status: 'success', data: { user: userInfo }, msg: '获取成功' }
      : { status: 'failed', data: { uid }, msg: '获取失败' };
  }
  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    this.ctx.logger.debug('email:', email);
    let userInfo = await this.userService.getUserInfo({ email });
    return userInfo
      ? { status: 'success', data: { user: userInfo }, msg: '获取成功' }
      : { status: 'failed', data: { email }, msg: '获取失败' };
  }

  // @Put('/:uid') 暂时不需要实现
  // async updateUser(@Param() uid: string, @Body() user: Partial<IUser>) {
  //   return this.userService.updateUser(uid, user);
  // }
}
