import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user.entity';
import { UserInfo } from '../model/user.model';
import { mEncode, mGenerateRandomId } from '../utils/id';
import {
  ICreateUserOptions,
  IGetUserOptions,
} from '../interface/user.interface';
import { Context } from '@midwayjs/koa';
import { assert } from 'console';
import { CircleMember } from '../entity/circleMember.entity';

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
}
