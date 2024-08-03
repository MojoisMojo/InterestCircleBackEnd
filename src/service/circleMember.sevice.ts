import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle.entity';
import { CircleMember } from '../entity/circleMember.entity';
import { User } from '../entity/user.entity';

@Provide()
export class CircleMemberService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(CircleMember)
  circleMemberModel: ReturnModelType<typeof CircleMember>;

  @InjectEntityModel(Circle)
  circleModel: ReturnModelType<typeof Circle>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;
  async createCircleMember({
    cid,
    uid,
  }: {
    cid: string;
    uid: string;
  }): Promise<boolean> {
    try {
      let circleMember = await this.circleMemberModel
        .findOne({ cid, uid })
        .exec();
      if (circleMember) {
        return false;
      }
      // Find the circle and user
      const circle = await this.circleModel.findOne({ cid }).exec();
      const user = await this.userModel.findOne({ uid }).exec();

      if (!circle || !user) {
        return false;
      }
      // 创建一个新的 circleMember
      let newCircleMember = await this.circleMemberModel.create({
        cid: cid,
        uid: uid,
      } as CircleMember);
      if (!newCircleMember) {
        return false;
      }
      // 更改 circle 的 cmembers 的数目, 和 user 的 circles 的数目
      circle.cmembers += 1;
      user.circlesCount += 1;
      await Promise.all([circle.save, user.save]);
      // 如果Promise 失败 fuck
      return true;
    } catch (e) {
      this.ctx.logger.error(e);
      return false;
    }
  }
  async deleteCircleMember({
    cid,
    uid,
  }: {
    cid: string;
    uid: string;
  }): Promise<boolean> {
    try {
      let circleMember = await this.circleMemberModel
        .findOne({ cid, uid })
        .exec();
      if (!circleMember) {
        return false;
      }
      // Find the circle and user
      const circle = await this.circleModel.findOne({ cid }).exec();
      const user = await this.userModel.findOne({ uid }).exec();
      // 删除member, 更改 circle 的 cmembers 的数目, 和 user 的 circles 的数目
      circle.cmembers -= 1;
      user.circlesCount -= 1;
      await Promise.all([circle.save, user.save, circleMember.deleteOne]);
      return true;
    } catch (e) {
      this.ctx.logger.error(e);
      return false;
    }
  }
}
