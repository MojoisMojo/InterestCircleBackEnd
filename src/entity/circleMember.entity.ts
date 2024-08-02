import { prop, modelOptions, index } from '@typegoose/typegoose';
// import { User } from './user.entity';
// import { Circle } from './circle.entity';

@modelOptions({
  schemaOptions: { collection: 'CircleMembers' }, // 设置集合名称
})
@index({ uid: 1, cid: 1 }, { unique: true }) // 设置唯一索引
export class CircleMember {
  @prop({ required: true })
  public uid: string;

  @prop({ required: true })
  public cid: string;
}
