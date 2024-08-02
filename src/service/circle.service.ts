import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Circle } from '../entity/circle.entity';
import { ICreateCircleOptions } from '../interface/circle.interface';
import { CircleInfo, CircleWithJoinedInfo } from '../model/circle.model';
import { mGenerateRandomId } from '../utils/id';
import { CircleMember } from '../entity/circleMember.entity';
import { User } from '../entity/user.entity';
import { storeSingleImg } from '../utils/file';
import { ciconPath } from '../static/mPath';
import path = require('path');

@Provide()
export class CircleService {
  // private totalCirclesCache: number | null = null;
  // private cacheDuration = 1000 * 60 * 2; // 2 minutes

  @Inject()
  ctx: Context;

  @InjectEntityModel(Circle)
  circleModel: ReturnModelType<typeof Circle>;

  @InjectEntityModel(CircleMember)
  circleMemberModel: ReturnModelType<typeof CircleMember>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async createCircle(
    { cname, cdesc, cicon, ccreator_id }: ICreateCircleOptions,
    imgFile: any
  ): Promise<CircleInfo | null> {
    try {
      let user = await this.userModel.findOne({ uid: ccreator_id }).exec();
      if (!user) {
        return null;
      }
      let time = new Date();
      let cid = CircleService.generateCid(cname, ccreator_id, time);
      let ciconName = CircleService.generateCicon(cid, cicon);
      let circle = await this.circleModel.create({
        cid: cid,
        cname: cname,
        cdesc: cdesc,
        cicon: ciconName,
        ccreator_id: ccreator_id,
        ctime: time,
      } as Circle);
      if (!circle) {
        return null;
      }
      // 添加用户
      let memberShip = await this.circleMemberModel.create({
        cid: cid,
        uid: ccreator_id,
      } as CircleMember);
      if (memberShip) {
        user.circlesCount += 1;
        await user.save();
      }
      // 储存图片
      storeSingleImg(path.join(...ciconPath), ciconName, imgFile)
        .then(res => {
          console.log('Store circle Img Success');
        })
        .catch(e => {
          this.ctx.logger.warn('Error When Storing circle Img', e);
        });
      return circle.getCircleInfo();
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  async storeCircleIcon(file: any, cicon: string): Promise<string | null> {
    try {
      let t = cicon.split('.');
      let typeString = t[t.length - 1];
      let ciconName = `${mGenerateRandomId(16)}.${typeString}`;
      await file.move(`public/circleIcon/${ciconName}`);
      return ciconName;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  async getCircleWithJoinedInfo(
    cid: string,
    uid?: string
  ): Promise<CircleWithJoinedInfo | null> {
    try {
      const circle = await this.circleModel.findOne({ cid }).exec();
      if (!circle) {
        return null;
      }
      const circleInfo = circle.getCircleInfo();
      const isJoined = uid
        ? !!(await this.circleMemberModel.exists({ cid, uid }))
        : false;
      return { circle: circleInfo, isJoined } as CircleWithJoinedInfo;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  // 限制地 随机获取 默认30个 获取 uid 所在的所有圈子 的 信息
  async getLimitedUserCirclesWithJoinedInfo(
    uid: string,
    limit: number = 30
  ): Promise<CircleWithJoinedInfo[] | null> {
    try {
      if (!uid || limit <= 0) {
        return null;
      }
      // 获取圈子 ID 列表, 这里
      const circleMembers = await this.circleMemberModel
        .aggregate([{ $match: { uid } }, { $sample: { size: limit } }]) // 这里我们假设用户的圈子数不多()
        .exec();
      if (!circleMembers) {
        return null;
      }
      if (circleMembers.length === 0) {
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
      return circles.map((circle: Circle) =>
        circle.getCircleWithJoinedInfo(true)
      );
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }
  // 限制地随机推荐圈子
  async getLimitedRecommendedCirclesWithJoinedInfo(
    uid: string,
    limit: number = 50
  ): Promise<CircleWithJoinedInfo[] | null> {
    try {
      const recommendedCircles = await this.circleModel
        .aggregate([{ $sample: { size: limit } }])
        .exec();
      if (!recommendedCircles) {
        return null;
      }
      if (recommendedCircles.length === 0) {
        return [];
      }
      const circleWithJoinedInfos = await Promise.all(
        recommendedCircles.map(async circle => {
          const exists = await this.circleMemberModel.exists({
            cid: circle.cid,
            uid,
          });
          return circle.getCircleInfo(exists);
        })
      );
      return circleWithJoinedInfos;
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }
  // // 分批获取用户所有圈子的信息
  // async getUserAllCirclesInfoByBatch(
  //   uid: string,
  //   loadedIds: string[],
  //   limit: number,
  //   page: number = -1
  // ): Promise<CircleInfo[] | null> {
  //   try {
  //     if (!uid || limit <= 0) {
  //       return null;
  //     }
  //     const recommendedCircles = await this.circleModel
  //       .aggregate([
  //         { $match: { cid: { $nin: loadedIds } } }, // 排除已加载的记录
  //         { $sample: { size: limit } },
  //       ])
  //       .exec();

  //     if (!recommendedCircles) {
  //       return null;
  //     }
  //     if (recommendedCircles.length === 0) {
  //       return [];
  //     }
  //     return recommendedCircles.map(circle => circle.getCircleInfo());
  //   } catch (e) {
  //     this.ctx.logger.error(e);
  //     return null;
  //   }
  // }

  // /**分批获取推荐圈子的信息
  //  *TODO: 实现推荐圈子的逻辑
  //  *初步的算法是 随机推荐 一些圈子
  //  *之后可以根据用户的兴趣爱好，推荐相关的圈子
  //  */
  // async getRecommendedCirclesInfoByBatch(
  //   uid: string, // 因为是随机算法，现在也没啥用
  //   limit: number,
  //   loadedIds: string[],
  //   page: number = -1 // 页码作为接口放着，不用
  // ): Promise<CircleInfo[] | null> {
  //   try {
  //     const totalCircles = await this.circleModel.countDocuments().exec();
  //     const sampleSize = Math.min(totalCircles - loadedIds.length, limit); // 确保 sampleSize 不超过剩余记录数

  //     const recommendedCircles = await this.circleModel
  //       .aggregate([
  //         { $match: { cid: { $nin: loadedIds } } }, // 排除已加载的记录
  //         { $sample: { size: sampleSize } },
  //       ])
  //       .exec();

  //     if (!recommendedCircles) {
  //       return null;
  //     }
  //     if (recommendedCircles.length === 0) {
  //       return [];
  //     }

  //     return recommendedCircles.map(circle => circle.getCircleInfo());
  //   } catch (e) {
  //     this.ctx.logger.error(e);
  //     return null;
  //   }
  // }
  private static generateCid(name: string, uid: string, time: Date): string {
    return (
      uid.slice(0, 4) +
      mGenerateRandomId(4) +
      time.getTime().toString(36) +
      uid.slice(4)
    );
  }

  private static generateCicon(cid: string, cicon: string): string {
    let t = cicon.split('.');
    let typeString = t[t.length - 1];
    return `${cid}.${typeString}`;
  }
}
