import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Mpost } from '../entity/post.entity';
import {
  ICreatePostOptions,
  IMpost,
  IPostInfo,
} from '../interface/post.interface';
import { User } from '../entity/user.entity';
import { Circle } from '../entity/circle.entity';
import { CircleMember } from '../entity/circleMember.entity';
import { mGenerateRandomId } from '../utils/id';

@Provide()
export class PostService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Mpost)
  postModel: ReturnModelType<typeof Mpost>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @InjectEntityModel(Circle)
  circleModel: ReturnModelType<typeof Circle>;

  @InjectEntityModel(CircleMember)
  circleMemberModel: ReturnModelType<typeof CircleMember>;

  async createPost(
    options: ICreatePostOptions,
    imgFiles: any
  ): Promise<IPostInfo | null> {
    try {
      let { uid, cid, content, imgs } = options;
      // 合法检查
      let [user, circle, circleMember] = await Promise.all([
        this.userModel.findOne({ uid }).exec(),
        this.circleModel.findOne({ cid }).exec(),
        this.circleMemberModel.exists({ cid, uid }).exec(),
      ]);
      if (!user || !circle || !circleMember) {
        return null;
      }
      let time = new Date();
      let pid = PostService.generatePid(uid, cid, time);
      let postImgName = imgs.map((img, index) =>
        PostService.generatePostImgName(pid, img, index)
      );
      let post = await this.postModel.create({
        pid,
        uid,
        cid,
        time,
        content,
        imgs: postImgName,
      } as Mpost);
      if (!post) {
        return null;
      }
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }
  private static generatePid(uid: string, cid: string, time: Date): string {
    return (
      uid.slice(0, 4) +
      cid.slice(0, 8) +
      mGenerateRandomId(4) +
      time.getTime().toString(36) +
      cid.slice(8) +
      uid.slice(4)
    );
  }
  private static generatePostImgName(
    pid: string,
    imgName: string,
    index: number
  ): string {
    let t = imgName.split('.');
    let typeString = t[t.length - 1];
    return `${pid}_${index}.${typeString}`;
  }
}
