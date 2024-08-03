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
import { CircleMemberService } from '../service/circle.member.sevice';
import { Context } from '@midwayjs/koa';

@Controller('/circlemembers')
export class CircleMemberController {
  @Inject()
  ctx: Context;
  @Inject()
  circleMemberService: CircleMemberService;

  @Get('/')
  async isCircleMember(@Queries() options: { uid: string; cid: string }) {
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

  @Get('/members')
  async isCirclesMembers(@Queries() options: { uid: string; cids: string[] }) {
    let { uid, cids } = options;
    if (!uid || !cids || cids.length === 0) {
      return {
        status: 'failed',
        msg: '未收到用户id或圈子id',
        data: options,
      };
    }
    let res = await this.circleMemberService.isCirclesMember({ uid, cids });
    if (!res) {
      return {
        status: 'failed',
        msg: '服务查询失败',
        data: options,
      };
    }
    return {
      status: 'success',
      msg: '查询成功',
      data: { isJoined: res },
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
