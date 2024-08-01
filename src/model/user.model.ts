import { IUserInfo } from '../interface/user.interface';

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
    this.avatarUrl = avatarUrl;
    this.likesCount = likesCount;
    this.circlesCount = circlesCount;
    this.createAt = createAt;
  }
}
