import {
  Inject,
  Controller,
  // Get,
  Post,
  Body,
  Get,
  Queries,
  // Put,
  // Files,
  // Fields,
  // Param,
  // Query,
} from '@midwayjs/core';
import { CircleMemberService } from '../service/circleMember.sevice';
import { Context } from '@midwayjs/koa';

@Controller('/circlemembers')
export class CircleMemberController {
  @Inject()
  ctx: Context;
  @Inject()
  circleMemberService: CircleMemberService;

  @Get('/')
  async isMember(@Queries() options: { uid: string; cid: string }) {
    let { uid, cid } = options;
    if (!uid || !cid) {
      return {
        status: 'failed',
        msg: '未收到用户id或圈子id',
        data: options,
      };
    }
    let isMember = await this.circleMemberService.isCircleMember(options);
    return {
      status: 'success',
      msg: '查询成功',
      data: { isMember: isMember },
    };
  }

  @Post('/join')
  async joinCircle(@Body() options: { uid: string; cid: string }) {
    let { uid, cid } = options;
    if (!uid || !cid) {
      return {
        status: 'failed',
        msg: '未收到用户id或圈子id',
        data: options,
      };
    }
    let joinInfo = await this.circleMemberService.createCircleMember(options);
    if (!joinInfo) {
      return {
        status: 'failed',
        msg: '加入圈子失败',
        data: options,
      };
    }
    return {
      status: 'success',
      msg: '加入圈子成功',
      data: { joinInfo },
    };
  }

  @Post('/leave')
  async leaveCircle(@Body() options: { uid: string; cid: string }) {
    let { uid, cid } = options;
    if (!uid || !cid) {
      return {
        status: 'failed',
        msg: '未收到用户id或圈子id',
        data: options,
      };
    }
    let leaveInfo = await this.circleMemberService.deleteCircleMember(options);
    if (!leaveInfo) {
      return {
        status: 'failed',
        msg: '退出圈子失败',
        data: options,
      };
    }
    return {
      status: 'success',
      msg: '退出圈子成功',
      data: { leaveInfo },
    };
  }
}
