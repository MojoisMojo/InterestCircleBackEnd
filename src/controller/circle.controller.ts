import { Inject, Controller, Get, Query, Post, File} from '@midwayjs/core';
import { CircleService } from '../service/circle.service';

@Controller('/circle')
export class CircleController {
  @Inject()
  circleService: CircleService;

  @Get('/get/info')
  async getInfo(@Query('cid') cid: string) {}

  @Get('/get/posts')
  async getPosts(@Query('cid') cid: string) {}

  @Post('/create')
  async create(
    @Query('cname') cname: string,
    @Query('cdesc') cdesc: string,
    @Query('ccreator_id') ccreator_id: string,
    @File() ciconFile: any,
  ) {
    if (!cname || !cdesc || !ccreator_id) {
      return {
        status: 'failed',
        msg: "You didn't put a cname Or cdesc Or ccreator_id",
      };
    }
    try {
      console.log('file:', ciconFile);
      const circleInfo = await this.circleService.createCircle({
        cname,
        cdesc,
        ccreator_id
      });
      let t = ciconFile.filename.split('.');
      ciconFile.filename = circleInfo.cicon + '.' + t[t.length - 1];
      return {
        status: 'success',
        msg: 'OK',
        data: {
          circle: circleInfo,
          file: ciconFile,
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
