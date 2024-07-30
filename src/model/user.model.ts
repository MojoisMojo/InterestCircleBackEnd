import { mEncode, mGenerateRandomId } from '../utils/id';
import * as pwd from '../utils/pwd';

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

interface IGetUserOptionsBase {
  uid?: string;
  email?: string;
}

type IGetUserOptions = AtLeastOne<IGetUserOptionsBase>;

interface ICreateUserOptions {
  name: string;
  email: string;
  passWord: string;

  uid?: string;
  bio?: string;
  avatarUrl?: string;
  likesCount?: number;
  circlesCount?: number;
  createAt?: Date;
}

interface ILoginUserOptions {
  email: string;
  passWord: string;
}

interface IUserInfoOptions {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  likesCount: number;
  circlesCount: number;
  createAt: Date;
}

interface IFullUserInfoOptions {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  likesCount: number;
  circlesCount: number;
  createAt: Date;
  passWord: string;
}

class UserInfo {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  likesCount: number;
  circlesCount: number;
  createAt: Date;
  constructor(options: IUserInfoOptions) {
    let {
      uid,
      name,
      email,
      bio,
      avatarUrl,
      likesCount,
      circlesCount,
      createAt,
    } = options;
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

class User {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  likesCount: number;
  circlesCount: number;
  createAt: Date;
  private passWord: string;
  constructor(options: ICreateUserOptions) {
    let {
      uid,
      name,
      email,
      bio,
      avatarUrl,
      likesCount,
      circlesCount,
      createAt,
      passWord,
    } = options;

    this.name = name;
    this.email = email;
    this.passWord = passWord;

    this.uid = uid ? uid : User.generateRandomId(email);
    this.bio = bio ? bio : '';
    this.avatarUrl = avatarUrl ? avatarUrl : '';
    this.likesCount = likesCount ? likesCount : 0;
    this.circlesCount = circlesCount ? circlesCount : 0;
    this.createAt = createAt ? createAt : new Date();
  }

  public checkPwd(passWord: string): boolean {
    return pwd.checkPwd(passWord, this.passWord);
  }

  public getUserInfo(): UserInfo {
    return new UserInfo({
      uid: this.uid,
      name: this.name,
      email: this.email,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      likesCount: this.likesCount,
      circlesCount: this.circlesCount,
      createAt: this.createAt,
    });
  }

  private static generateRandomId(uemail: string): string {
    return (
      mEncode(uemail.replace('@', '').replace(/[^a-zA-Z0-9_-]/g, '')) +
      mGenerateRandomId(4)
    );
  }
}

export {
  User,
  UserInfo,
  IGetUserOptions,
  ILoginUserOptions,
  ICreateUserOptions,
  IUserInfoOptions,
  IFullUserInfoOptions,
};
