import {
  Inject,
  Controller,
  Get,
  // Query,
  Post,
  // File,
  Param,
  Body,
} from '@midwayjs/core';
import { CircleService } from '../service/circle.service';
import { Context } from '@midwayjs/koa';
import { ICreateCircleOptions } from '../interface/circle.interface';

@Controller('/circles')
export class CircleController {
  @Inject()
  ctx: Context;

  @Inject()
  circleService: CircleService;

  @Post('/')
  async createCircle(
    @Body() { cname, cdesc, ccreator_id, cicon }: ICreateCircleOptions
  ) {
    if (!cname || !cdesc || !ccreator_id) {
      return {
        status: 'failed',
        msg: "You didn't put a cname Or cdesc Or ccreator_id",
      };
    }
    try {
      const circleInfo = await this.circleService.createCircle({
        cname,
        cdesc,
        cicon,
        ccreator_id,
      });
      return {
        status: 'success',
        msg: 'OK',
        data: {
          circle: circleInfo,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when creating the circle',
      };
    }
  }

  @Get('info/:cid')
  async getCircleInfo(@Param('cid') cid: string) {
    try {
      const circleInfo = await this.circleService.getCircleInfo(cid);
      if (!circleInfo) {
        return {
          status: 'failed',
          msg: 'Sorry, the circle does not exist',
        };
      }
      return {
        status: 'success',
        msg: '成功获取圈子信息',
        data: {
          circle: circleInfo,
        },
      };
    } catch (e) {
      this.ctx.logger.error(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting the circle info',
      };
    }
  }

  @Get('/:uid/recommendation')
  async getRecommendedCircles(@Param('uid') uid: string) {
    try {
      const circles = await this.circleService.getLimitedRecommendedCirclesInfo(
        uid
      );
      if (!circles) {
        return {
          status: 'failed',
          msg: 'Sorry, some error happened when getting the recommended circles',
        };
      }
      return {
        status: 'success',
        msg: '成功获取推荐圈子',
        data: {
          circles,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting the recommended circles',
      };
    }
  }

  @Get('/:uid/mine')
  async getUserCircles(@Param('uid') uid: string) {
    try {
      const circles = await this.circleService.getLimitedUserCirclesInfo(uid);
      if (!circles) {
        return {
          status: 'failed',
          msg: 'Sorry, some error happened when getting your circles',
        };
      }
      return {
        status: 'success',
        msg: '成功获取个人圈子信息',
        data: {
          circles,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting your circles',
      };
    }
  }
}
