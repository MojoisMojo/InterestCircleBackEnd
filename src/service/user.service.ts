import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user.entity';
import { UserInfo } from '../model/user.model';
import { mEncode, mGenerateRandomId } from '../utils/id';
import {
  ICreateUserOptions,
  IGetUserOptions,
  IUserUpdateInfo,
} from '../interface/user.interface';
import { Context } from '@midwayjs/koa';
import { assert } from 'console';
import { CircleMember } from '../entity/circleMember.entity';
import { deleteSingleImg, storeSingleImg } from '../utils/file';
import path = require('path');
import { avatarPath } from '../utils/ImgPath';

@Provide()
export class UserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @InjectEntityModel(CircleMember)
  circleMemberModel: ReturnModelType<typeof CircleMember>;

  async createUser({
    email,
    name,
    password,
  }: ICreateUserOptions): Promise<UserInfo | null> {
    try {
      const user = await this.userModel.create({
        uid: UserService.generateUid(email),
        email: email,
        password: mEncode(password),
        name: name,
      } as User);
      return user ? user.getUserInfo() : null;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }
  async getUserInfo(options: IGetUserOptions): Promise<UserInfo | null> {
    let { uid, email } = options;
    assert(uid || email, 'uid or email is required');
    const user = uid
      ? await this.userModel.findOne({ uid }).exec()
      : await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return user.getUserInfo();
  }
  async getUsersInfo(uids: string[]): Promise<UserInfo[] | null> {
    try {
      if (uids.length === 0) {
        return [];
      }
      const users = await this.userModel.find({ uid: { $in: uids } }).exec();
      return users.map((user: User) => user.getUserInfo());
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  async changeUserInfo(
    options: IUserUpdateInfo,
    avatarFile?: any
  ): Promise<UserInfo | null> {
    try {
      let { uid, name, bio, avatarUrl } = options;
      if (!uid) {
        throw new Error('uid is required');
      }
      if (name == null && bio == null && avatarFile == null) {
        this.ctx.logger.warn('no change in user info');
        return null;
      }
      let user = await this.userModel.findOne({ uid }).exec();
      if (!user) {
        throw new Error('user not found');
      }
      if (avatarFile) {
        let newAvatarUrl = UserService.generateAvatarUrl(uid, avatarUrl);
        // 删除原头像
        const oldAvatarUrl = user.avatarUrl;
        deleteSingleImg(path.join(...avatarPath), oldAvatarUrl)
          .then(deleteRes => {
            this.ctx.logger.info('Delete avatar Success');
            // 储存新头像
            storeSingleImg(path.join(...avatarPath), newAvatarUrl, avatarFile)
              .then(res => {
                this.ctx.logger.info('Store avatar Success');
              })
              .catch(e => {
                this.ctx.logger.warn('Error When Storing avatar', e);
              });
          })
          .catch(e => this.ctx.logger.warn('Error When Deleting avatar', e));
        user.avatarUrl = newAvatarUrl;
      }
      if(name && name !== user.name){
        user.name = name;
      }
      if(bio != null && bio !== user.bio){
        user.bio = bio;
      }
      await user.save();
      return user.getUserInfo();
    } catch (e) {
      this.ctx.logger.error('in user.service, when changeUserInfo: ', e);
      return null;
    }
  }
  async getUsersInfoByCid(cid: string): Promise<UserInfo[] | null> {
    try {
      let members = await this.circleMemberModel.find({ cid }).limit(10).exec();
      let uids = members.map((member: CircleMember) => member.uid);
      return await this.getUsersInfo(uids);
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }
  async checkPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserInfo | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    let res = user.checkPassword(password);
    if (!res) {
      return null;
    }
    return user.getUserInfo();
  }
  private static generateUid(uemail: string): string {
    return mEncode(
      uemail.replace('@', mGenerateRandomId(4)).replace(/[^a-zA-Z0-9_-]/g, '')
    );
  }

  private static generateAvatarUrl(uid: string, avatarUrl: string): string {
    let t = avatarUrl.split('.');
    let typeString = t[t.length - 1];
    return `${uid}${new Date().getTime().toString(36)}.${typeString}`;
  }
}
