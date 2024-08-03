import { IUserInfo, IUserSinpleInfo } from '../interface/user.interface';
import { avatarPath } from '../static/ImgPath';
const userAvatarUrl = (path: string) =>
  [...avatarPath, path ? path : 'avatar.svg'].join('/');

export class UserInfo implements IUserInfo {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  likesCount: number;
  circlesCount: number;
  createAt: Date;

  constructor({
    uid,
    name,
    email,
    bio,
    avatarUrl,
    likesCount,
    circlesCount,
    createAt,
  }: IUserInfo) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.avatarUrl = userAvatarUrl(avatarUrl);
    this.likesCount = likesCount;
    this.circlesCount = circlesCount;
    this.createAt = createAt;
  }
}

export class UserSingpleInfo implements IUserSinpleInfo {
  uid: string;
  name: string;
  avatarUrl: string;
  bio: string;

  constructor({ uid, name, avatarUrl, bio }: IUserSinpleInfo) {
    this.uid = uid;
    this.name = name;
    this.avatarUrl = userAvatarUrl(avatarUrl);
    this.bio = bio;
  }
}
