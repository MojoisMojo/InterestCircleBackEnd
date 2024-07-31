type tCommenterInfo = {
  uid: string;
  name: string;
  avatarUrl: string;
};

type tCreateCommentOptions = {
  commenter: tCommenterInfo;
  time:Date;
  content: string;
  pid: string;
};

type tCommentInfo = {
  comid: string;
  commenter: tCommenterInfo;
  time: Date;
  content: string;
  pid: string;
};

type tFullCommentOptions = {
  comid: string;
  commenter: tCommenterInfo;
  time: Date;
  content: string;
  pid: string;
};

class CommentModel{
  comid: string;
  commenter: tCommenterInfo;
  time: Date;
  content: string;
  pid: string;
  constructor({commenter, time, content, pid}: tCreateCommentOptions){
    this.commenter = commenter;
    this.time = time;
    this.content = content;
    this.pid = pid;
  }
}
