import { prop, modelOptions } from '@typegoose/typegoose';
import { IMpost, IPostContentInfo } from '../interface/post.interface';
import { PostContentInfo } from '../model/post.model';
@modelOptions({
  schemaOptions: { collection: 'Posts' }, // 设置集合名称
})
export class Mpost implements IMpost {
  @prop({ required: true, unique: true })
  public pid: string;

  @prop({ required: true })
  public cid: string;

  @prop({ required: true })
  public uid: string;

  @prop({ required: true })
  public content: string;

  @prop({ default: [] })
  public imgs: string[];

  @prop({ default: 0 })
  public likes: number;

  @prop({ default: 1 })
  public looks: number;

  @prop({ default: 0 })
  public comments: number;

  @prop({ default: () => new Date() })
  public time: Date;

  public getPostContentInfo(): IPostContentInfo {
    return new PostContentInfo({
      pid: this.pid,
      content: this.content,
      cid: this.cid,
      time: this.time,
      imgs: this.imgs,
      likes: this.likes,
      looks: this.looks,
      comments: this.comments,
    });
  }
}
