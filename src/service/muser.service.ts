// import { Provide, sleep } from '@midwayjs/core';
// import { IGetUserOptions, ICreateUserOptions, ILoginUserOptions } from '../model/muser.model';
// import { UserInfo } from '../model/user.model';
// import { User } from '../entity/user.entity';
// import { static_mojo_user } from '../static/static';

// @Provide()
// export class UserService {
//   async getUser(options: IGetUserOptions): Promise<UserInfo | null> {
//     let { uid, email } = options;
//     console.log('get user', uid, email);
//     await sleep(1000);
//     let user = new User(static_mojo_user);
//     return user.getUserInfo();
//   }
//   async getUserAllInfo(options: IGetUserOptions): Promise<User | null> {
//     let { uid, email } = options;
//     const { name, bio, avatarUrl, likesCount, circlesCount } = static_mojo_user;
//     if (!uid) {
//       uid = static_mojo_user.uid;
//     }
//     if (!email) {
//       email = static_mojo_user.email;
//     }
//     return new User({
//       uid,
//       name,
//       email,
//       bio,
//       avatarUrl,
//       passWord: 'mojo',
//       likesCount,
//       circlesCount,
//     });
//   }
//   async createUser(options: ICreateUserOptions): Promise<UserInfo> {
//     let user = new User(options);
//     return user.getUserInfo();
//   }
//   async loginUser(options: ILoginUserOptions): Promise<UserInfo | null> {
//     let { email, passWord } = options;
//     let user: User | null = await this.getUserAllInfo({ email });
//     if (user && user.checkPassword(passWord)) {
//       return user.getUserInfo();
//     }
//     return null;
//   }
// }
