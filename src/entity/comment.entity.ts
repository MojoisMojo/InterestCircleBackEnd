import { prop, modelOptions } from '@typegoose/typegoose';

import { IComment } from '../interface/comment.interface';
import { CommentInfo } from '../model/comment.model';

@modelOptions({
  schemaOptions: { collection: 'Comments' }, // 设置集合名称
})
export class Mcomment implements IComment {
  @prop({ required: true, unique: true })
  public comid: string;

  @prop({ required: true })
  public commenter_id: string;

  @prop({ required: true })
  public content: string;

  @prop({ required: true })
  public pid: string;

  @prop({ default: () => new Date() })
  public time: Date;

  public getCommentInfo(): CommentInfo {
    return new CommentInfo({
      comid: this.comid,
      content: this.content,
      time: this.time,
    });
  }
}
