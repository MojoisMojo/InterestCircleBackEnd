import { IUserInfo, IUserUpdateInfo } from '../interface/user.interface';
import { avatarPath } from '../utils/ImgPath';
const userAvatarUrl = (path: string) =>
  [...avatarPath, path ? path : 'avatar.svg'].join('/');

export class UserInfo implements IUserInfo {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  circlesCount: number;
  createAt: Date;

  constructor({
    uid,
    name,
    email,
    bio,
    avatarUrl,
    postsCount,
    circlesCount,
    createAt,
  }: IUserInfo) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.avatarUrl = userAvatarUrl(avatarUrl);
    this.postsCount = postsCount;
    this.circlesCount = circlesCount;
    this.createAt = createAt;
  }
}

export class UserUpdateInfo implements IUserUpdateInfo {
  uid: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;

  constructor({ uid, name, avatarUrl, bio }: IUserUpdateInfo) {
    this.uid = uid;
    this.name = name;
    this.avatarUrl = userAvatarUrl(avatarUrl);
    this.bio = bio;
  }
}
