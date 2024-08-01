import { Ref, prop, modelOptions } from '@typegoose/typegoose';
import { User } from './user.entity';
import { Circle } from './circle.entity';

@modelOptions({
  schemaOptions: { collection: 'CircleMembers' }, // 设置集合名称
})
export class CircleMember {
  @prop({ required: true, ref: () => User })
  public uid: Ref<User>;

  @prop({ required: true, ref: () => Circle })
  public cid: Ref<Circle>;
}
