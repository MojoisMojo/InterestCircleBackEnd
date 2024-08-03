import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Mpost } from '../entity/post.entity';

@Provide()
export class PostService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Mpost)
  postModel: ReturnModelType<typeof Mpost>;


}
