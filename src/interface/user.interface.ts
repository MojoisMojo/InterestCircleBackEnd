export interface IUser {
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
