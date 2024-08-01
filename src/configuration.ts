import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as ws from '@midwayjs/ws';
import * as crossDomain from '@midwayjs/cross-domain';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as upload from '@midwayjs/upload';
import * as staticFile from '@midwayjs/static-file';
import * as typegoose from '@midwayjs/typegoose';
import * as mongoose from '@midwayjs/mongoose';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    ws,
    mongoose,
    typegoose,
    crossDomain,
    validate,
    upload,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
