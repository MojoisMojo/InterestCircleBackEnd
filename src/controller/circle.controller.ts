import {
  Inject,
  Controller,
  Get,
  Post,
  Files,
  Fields,
  Query,
} from '@midwayjs/core';
import { CircleService } from '../service/circle.service';
import { Context } from '@midwayjs/koa';
// import { ICreateCircleOptions } from '../interface/circle.interface';

@Controller('/circles')
export class CircleController {
  @Inject()
  ctx: Context;

  @Inject()
  circleService: CircleService;

  @Post('/')
  async createCircle(@Files() iconImgs: any, @Fields() fileds) {
    try {
      // this.ctx.logger.info('iconImgs & fileds', iconImgs, fileds);

      let { cname, cdesc, ccreator_id, cicon } = fileds;
      if (!cname || !cdesc || !ccreator_id) {
        return {
          status: 'failed',
          msg: "You didn't put a cname Or cdesc Or ccreator_id",
        };
      }
      let iconImg = iconImgs[0];
      const circleInfo = await this.circleService.createCircle(
        {
          cname,
          cdesc,
          cicon,
          ccreator_id,
        },
        iconImg
      );
      if (!circleInfo) {
        return {
          status: 'failed',
          msg: '创建圈子失败',
        };
      }
      return {
        status: 'success',
        msg: '创建圈子成功',
        data: {
          circle: circleInfo,
        },
      };
    } catch (e) {
      this.ctx.logger.error(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when creating the circle',
      };
    }
  }

  @Get('/')
  async getCircleInfo(@Query('cid') cid: string, @Query('uid') uid?: string) {
    try {
      const circleWithJoinedInfo =
        await this.circleService.getCircleWithJoinedInfo(cid, uid);
      // console.log('circleWithJoinedInfo', circleWithJoinedInfo);
      if (!circleWithJoinedInfo) {
        return {
          status: 'failed',
          msg: 'Sorry, the circle does not exist',
        };
      }
      return {
        status: 'success',
        msg: '成功获取圈子信息',
        data: circleWithJoinedInfo,
      };
    } catch (e) {
      this.ctx.logger.error(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting the circle info',
      };
    }
  }

  @Get('/recommendation')
  async getRecommendedCircles(@Query('uid') uid: string) {
    try {
      const circlesWithJoinedInfo =
        await this.circleService.getLimitedRecommendedCirclesWithJoinedInfo(
          uid,
        );
      if (!circlesWithJoinedInfo) {
        return {
          status: 'failed',
          msg: 'Sorry, we failed to get the recommended circles',
        };
      }
      return {
        status: 'success',
        msg: '成功获取推荐圈子',
        data: { circlesList: circlesWithJoinedInfo },
      };
    } catch (e) {
      this.ctx.logger.error(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting the recommended circles',
      };
    }
  }

  @Get('/mine')
  async getUserCircles(@Query('uid') uid: string) {
    try {
      const circlesWithJoinedInfo =
        await this.circleService.getLimitedUserCirclesWithJoinedInfo(uid);
      if (!circlesWithJoinedInfo) {
        return {
          status: 'failed',
          msg: '抱歉，获取您的圈子时发生了一些错误',
        };
      }
      return {
        status: 'success',
        msg: '成功获取个人圈子信息',
        data: { circlesList: circlesWithJoinedInfo },
      };
    } catch (e) {
      this.ctx.logger.error(e);
      return {
        status: 'failed',
        msg: 'Sorry, some error happened when getting your circles',
      };
    }
  }
}
