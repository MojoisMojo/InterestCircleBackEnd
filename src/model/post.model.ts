import {
  IPosterInfo,
  IPostInfo,
  IPostContentInfo,
} from '../interface/post.interface';
import { avatarPath, postImgPath } from '../static/ImgPath';

export class PosterInfo implements IPosterInfo {
  uid: string;
  name: string;
  avatarUrl: string;
  constructor({ uid, name, avatarUrl }: IPosterInfo) {
    this.uid = uid;
    this.name = name;
    this.avatarUrl = [...avatarPath, avatarUrl].join('/');
  }
}

export class PostContentInfo implements IPostContentInfo {
  cid: string;
  pid: string;
  time: Date;
  content: string;
  imgs: string[];
  looks: number;
  likes: number;
  comments: number;
  constructor({
    pid,
    time,
    content,
    imgs,
    likes,
    looks,
    comments,
    cid,
  }: IPostContentInfo) {
    this.pid = pid;
    this.time = time;
    this.content = content;
    this.imgs = imgs.map(img => [...postImgPath(time), img].join('/'));
    this.likes = likes;
    this.looks = looks;
    this.comments = comments;
    this.cid = cid;
  }
}

export class PostInfo implements IPostInfo {
  posterInfo: IPosterInfo;
  postContent: IPostContentInfo;
  isLiked: boolean;
  constructor({ postContent, posterInfo, isLiked }: IPostInfo) {
    this.postContent = postContent;
    this.posterInfo = posterInfo;
    this.isLiked = isLiked;
  }
}
