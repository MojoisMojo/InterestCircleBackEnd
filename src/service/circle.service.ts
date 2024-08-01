import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle.entity';
import { ICreateCircleOptions } from '../interface/circle.interface';
import { CircleInfo } from '../model/circle.model';
import { mGenerateRandomId } from '../utils/id';
import { CircleMember } from '../entity/circleMember.entity';

@Provide()
export class CircleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Circle)
  circleModel: ReturnModelType<typeof Circle>;

  @InjectEntityModel(CircleMember)
  circleMemberModel: ReturnModelType<typeof CircleMember>;

  async createCircle({
    cname,
    cdesc,
    cicon,
    ccreator_id,
  }: ICreateCircleOptions): Promise<CircleInfo | null> {
    try {
      let time = new Date();
      let cid = CircleService.generateCid(cname, ccreator_id, time);
      cicon = CircleService.generateCicon(cid, time, cicon);
      const circle = await this.circleModel.create({
        cid: cid,
        cname: cname,
        cdesc: cdesc,
        cicon: cicon,
        ccreator_id: ccreator_id,
        ctime: time,
      } as Circle);
      return circle ? circle.getCircleInfo() : null;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  // 获取 uid 所在的所有圈子 的 信息
  async getCirclesInfoByUid(uid: string): Promise<CircleInfo[]> {
    try {
      // 获取圈子 ID 列表
      const circleMembers = await this.circleMemberModel.find({ uid }).exec();
      if (!circleMembers || circleMembers.length === 0) {
        return [];
      }
      const circleIds = circleMembers.map(member => member.cid);
      // 获取 圈子的详细信息
      const circles = await this.circleModel
        .find({ cid: { $in: circleIds } })
        .exec();
      if (!circles || circles.length === 0) {
        return [];
      }
      // 返回圈子信息列表
      return circles.map(circle => circle.getCircleInfo());
    } catch (e) {
      this.ctx.logger.error(e);
      return [];
    }
  }

  async getCircleInfo(cid: string): Promise<CircleInfo | null> {
    try {
      const circle = await this.circleModel.findOne({ cid }).exec();
      return circle ? circle.getCircleInfo() : null;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  private static generateCid(name: string, uid: string, time: Date): string {
    return (
      uid.slice(0, 4) +
      mGenerateRandomId(4) +
      time.getTime().toString(36) +
      uid.slice(4)
    );
  }

  private static generateCicon(cid: string, time: Date, cicon): string {
    return '';
  }
}
