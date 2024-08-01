import { prop, modelOptions } from '@typegoose/typegoose';
// import { User } from './user.entity';
// import { Circle } from './circle.entity';

@modelOptions({
  schemaOptions: { collection: 'CircleMembers' }, // 设置集合名称
})
export class CircleMember {
  @prop({ required: true })
  public uid: string;

  @prop({ required: true })
  public cid: string;
}
