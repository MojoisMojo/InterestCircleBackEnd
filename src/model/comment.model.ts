import {
  ICommentInfo,
  ICommenterInfo,
  ICommentWithCommenterInfo,
} from '../interface/comment.interface';
import { userAvatarUrl as commenterAvatarUrl } from '../utils/ImgPath';
export class CommentInfo implements ICommentInfo {
  comid: string;
  time: Date;
  content: string;

  constructor(options: ICommentInfo) {
    let { comid, time, content } = options;
    this.comid = comid;
    this.time = time;
    this.content = content;
  }
}

export class CommenterInfo implements ICommenterInfo {
  uid: string;
  name: string;
  avatarUrl: string;

  constructor(options: ICommenterInfo) {
    let { uid, name, avatarUrl } = options;
    this.uid = uid;
    this.name = name;
    this.avatarUrl = commenterAvatarUrl(avatarUrl);
  }
}

export class CommentWithCommenterInfo implements ICommentWithCommenterInfo {
  comment: ICommentInfo;
  commenter: ICommenterInfo;

  constructor(options: ICommentWithCommenterInfo) {
    let { comment, commenter } = options;
    this.comment = comment;
    this.commenter = commenter;
  }
}
