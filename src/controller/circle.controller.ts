import {
  Inject,
  Controller,
  Get,
  Query,
  Post,
  File,
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

  @Get('/:cid')
  async getInfo(@Param('cid') cid: string) {}

  @Post('/')
  async create(
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
}
