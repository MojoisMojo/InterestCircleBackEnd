import {
  // pre,
  prop,
  modelOptions,
  // getModelForClass,
} from '@typegoose/typegoose';
// import { CircleMember } from './circleMember.entity';
import { CircleInfo } from '../model/circle.model';

// 获取 CircleMember 模型
// const CircleMemberModel = getModelForClass(CircleMember);

@modelOptions({
  schemaOptions: { collection: 'Circles' }, // 设置集合名称
})
// @pre<Circle>('findOneAndDelete', async function (next) {
//   await CircleMemberModel.deleteMany({ cid: this.cid });
//   next();
// })
export class Circle {
  @prop({ required: true, unique: true })
  public cid: string;

  @prop({ required: true })
  public cname: string;

  @prop({ required: true })
  public cdesc: string;

  @prop({ required: true })
  public cicon: string;

  @prop({ required: true })
  public ccreator_id: string;

  @prop({ default: () => new Date() })
  public ctime: Date;

  @prop({ default: 0 })
  public cposts: number;

  @prop({ default: 0 })
  public cmembers: number; /// TODO: update this when member in/out

  @prop({ default: 0 })
  public cpopularity: number;

  public getCircleInfo(): CircleInfo {
    return new CircleInfo({
      cid: this.cid,
      cname: this.cname,
      cdesc: this.cdesc,
      cicon: this.cicon,
      ctime: this.ctime,
      cposts: this.cposts,
      cmembers: this.cmembers,
      cpopularity: this.cpopularity,
    });
  }
}
