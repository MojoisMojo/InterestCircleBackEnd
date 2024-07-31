import {
  Inject,
  Controller,
  Get,
  Post,
  Files,
  Fields,
  // Query,
  Body,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

const imgDir = 'public/img';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Get('/show/img')
  async showImg(@Body('imgPath') imgPath: string) {
    const imgUrl = `http://127.0.0.1:7002/${imgDir}/${imgPath}`;
    return {
      status: 'success',
      msg: 'OK',
      data: { imgUrl },
    };
  }

  @Post('/upload')
  async uploadImg(@Files() files, @Fields() fields) {
    /*
    files = [
      {
        filename: 'test.pdf',        // 文件原名
        data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
        fieldname: 'test1',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      {
        filename: 'test.pdf',        // 文件原名
        data: ReadStream,    // mode 为 stream 时为服务器临时文件地址
        fieldname: 'test2',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      // ...file 下支持同时上传多个文件
    ]
    */
    return {
      status: 'success',
      msg: 'OK',
      data: { files, fields },
    };
  }
}
