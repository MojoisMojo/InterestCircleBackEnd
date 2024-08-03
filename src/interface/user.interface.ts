export interface IUser {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  circlesCount: number;
  createAt: Date;
  password: string;
}
export interface ICreateUserOptions {
  name: string;
  email: string;
  password: string;
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

interface IGetUserOptionsBase {
  uid?: string;
  email?: string;
}

export type IGetUserOptions = AtLeastOne<IGetUserOptionsBase>;

export interface IUserInfo {
  uid: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  postsCount: number;
  circlesCount: number;
  createAt: Date;
}

export interface IUserSinpleInfo {
  uid: string;
  name: string;
  avatarUrl: string;
  bio: string;
}
