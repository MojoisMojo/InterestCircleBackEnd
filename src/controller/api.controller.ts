// import {
//   Inject,
//   Controller,
//   Get,
//   Post,
//   // File,
//   Files,
//   Fields,
//   // Query,
//   Body,
// } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
// import * as fs from 'fs';
// import * as path from 'path';
// const imgDir = 'public/img';

// @Controller('/api')
// export class APIController {
//   @Inject()
//   ctx: Context;

//   @Get('/show/img')
//   async showImg(@Body('imgPath') imgPath: string) {
//     const imgUrl = `http://127.0.0.1:7002/${imgDir}/${imgPath}`;
//     return {
//       status: 'success',
//       msg: 'OK',
//       data: { imgUrl },
//     };
//   }

//   @Post('/upload')
//   async uploadImg(@Files() files, @Fields() fields) {
//     /*
//     files = [
//       {
//         filename: 'test.pdf',        // 文件原名
//         data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
//         fieldname: 'test1',          // 表单 field 名
//         mimeType: 'application/pdf', // mime
//       },
//       {
//         filename: 'test.pdf',        // 文件原名
//         data: ReadStream,    // mode 为 stream 时为服务器临时文件地址
//         fieldname: 'test2',          // 表单 field 名
//         mimeType: 'application/pdf', // mime
//       },
//       // ...file 下支持同时上传多个文件
//     ]
//     */
//     console.log(files, fields);
//     const file = files[0];
//     const uploadPath = path.join(
//       __dirname,
//       '..',
//       '..',
//       'public',
//       'trail',
//       file.filename
//     );

//     // 将文件保存到服务器
//     const reader = fs.createReadStream(file.data);
//     const stream = fs.createWriteStream(uploadPath);
//     reader.pipe(stream);
//     return {
//       status: 'success',
//       msg: 'OK',
//       data: { files, fields, uploadPath },
//     };
//   }

//   @Post('/trail/upload')
//   async uploadTmp(@Files() files, @Fields() fields) {
//     const file = files[0];
//     console.log(file);
//     const uploadPath = path.join(
//       __dirname,
//       '../../public/trail',
//       file.filename
//     );

//     // 将文件保存到服务器
//     const reader = fs.createReadStream(file.filepath);
//     const stream = fs.createWriteStream(uploadPath);
//     reader.pipe(stream);
//     return {
//       status: 'success',
//       msg: 'OK',
//       data: { file, uploadPath },
//     };
//   }
// }
