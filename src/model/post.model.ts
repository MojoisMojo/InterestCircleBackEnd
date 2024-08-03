import {
  IPosterInfo,
  IPostInfo,
  IPostContentInfo,
} from '../interface/post.interface';
import {
  postImgPath,
  userAvatarUrl as posterAvatarUrl,
} from '../utils/ImgPath';

export class PosterInfo implements IPosterInfo {
  uid: string;
  name: string;
  avatarUrl: string;
  constructor({ uid, name, avatarUrl }: IPosterInfo) {
    this.uid = uid;
    this.name = name;
    this.avatarUrl = posterAvatarUrl(avatarUrl);
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
  poster: IPosterInfo;
  post: IPostContentInfo;
  constructor({ post, poster }: IPostInfo) {
    this.post = post;
    this.poster = poster;
  }
}
