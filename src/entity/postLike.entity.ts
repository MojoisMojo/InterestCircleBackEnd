import {
  prop,
  modelOptions,
  index,
  // Ref
} from '@typegoose/typegoose';
// import { User } from './user.entity';
// import { Mpost } from './post.entity';

@modelOptions({
  schemaOptions: { collection: 'PostLikes' }, // 设置集合名称
})
@index({ pid: 1, uid: 1 }, { unique: true }) // 设置索引
export class PostLike {
  @prop({ required: true })
  public pid: string;

  @prop({ required: true })
  public uid: string;

  @prop({ required: true })
  public posterId: string;
}
