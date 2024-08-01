import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.entity';
import { Mpost } from './post.entity';

@modelOptions({
  schemaOptions: { collection: 'PostLikes' }, // 设置集合名称
})
export class PostLike {
  @prop({ required: true, ref: () => Mpost })
  public pid: Ref<Mpost>;

  @prop({ required: true, ref: () => User })
  public uid: Ref<User>;
}
