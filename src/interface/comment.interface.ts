export interface ICreateCommentOptions {
  commenter_id: string;
  content: string;
  pid: string;
}

export interface ICommenterInfo {
  uid: string;
  name: string;
  avatarUrl: string;
}

export interface ICommentInfo {
  comid: string;
  content: string;
  time: Date;
}

export interface IComment {
  comid: string;
  time: Date;
  commenter_id: string;
  content: string;
  pid: string;
}

export interface ICommentWithCommenterInfo {
  comment: ICommentInfo;
  commenter: ICommenterInfo;
}
