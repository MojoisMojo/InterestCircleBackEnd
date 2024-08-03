import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Mpost } from '../entity/post.entity';
import {
  ICreatePostOptions,
  IPostContentInfo,
  IPostInfo,
} from '../interface/post.interface';
import { PostInfo } from '../model/post.model';
import { User } from '../entity/user.entity';
import { Circle } from '../entity/circle.entity';
import { CircleMember } from '../entity/circleMember.entity';
import { mGenerateRandomId } from '../utils/id';
import { storeMultipleImgs } from '../utils/file';
import { postImgPath } from '../static/ImgPath';
import path = require('path');

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
  ): Promise<IPostContentInfo | null> {
    try {
      let { uid, cid, content, imgFiles } = options;
      // 合法检查
      let [user, circle, circleMember] = await Promise.all([
        await this.userModel.findOne({ uid }).exec(),
        await this.circleModel.findOne({ cid }).exec(),
        await this.circleMemberModel.exists({ cid, uid }).exec(),
      ]);
      if (!user || !circle || !circleMember) {
        return null;
      }
      let time = new Date();
      let pid = PostService.generatePid(uid, cid, time);
      let postsImgName = imgFiles.map((imgfile, index) =>
        PostService.generatePostImgName(pid, imgfile.filename, index)
      );
      let post = await this.postModel.create({
        pid,
        uid,
        cid,
        time,
        content,
        imgs: postsImgName,
      } as Mpost);
      if (!post) {
        return null;
      }
      // 增加贴子数
      circle.cposts += 1;
      user.postsCount += 1;

      storeMultipleImgs(path.join(...postImgPath(time)), postsImgName, imgFiles)
        .then(res => {
          this.ctx.logger.info(
            'Store Imgs successfully when creating post.',
            res
          );
        })
        .catch(e => {
          this.ctx.logger.error(
            'Error when storing imgs when creating post.',
            e
          );
        });
      return post.getPostContentInfo();
    } catch (e) {
      this.ctx.logger.error(e);
      return null;
    }
  }

  async getSinglePostInfo(pid: string): Promise<IPostInfo | null> {
    throw new Error('Method not implemented.');
    return null;
  }

  async getLimitedPostsInfoByCid(
    cid: string,
    limit: number = 30
  ): Promise<IPostInfo[] | null> {
    try {
      if (!cid || limit < 0) {
        throw new Error('Invalid cid or limit');
      }
      let posts = await this.postModel
        .find({ cid })
        .sort({ time: -1 })
        .limit(limit)
        .exec();
      if (!posts) {
        throw new Error('Something wrong with the database');
      }
      if (posts.length === 0) {
        return [];
      }
      let postsInfo = await Promise.all(
        posts.map(async (post:any) => {
          try {
            let user = await this.userModel.findOne({ uid: post.uid }).exec();
            if (!user) {
              throw new Error('can not find poster Info');
            }
            return new PostInfo({
              posterInfo: user.getInfoAsPoster(),
              postContent: post.getPostContentInfo(),
            });
          } catch (e) {
            this.ctx.logger.error('when finding PosterInfo', e);
            return new PostInfo({
              posterInfo: null,
              postContent: post.getPostContentInfo(),
            });
          } finally {
            // 增加浏览量
            post.looks += 1;
            await post.save();
          }
        })
      );
      return postsInfo;
    } catch (e) {
      this.ctx.logger.error(
        'in post.service, when getting postsInfoByCid, ',
        e
      );
      return null;
    }
  }

  async getLimitedPostsInfoByUid(uid: string, limit: number = 30) {
    throw new Error('Method not implemented.');
  }

  // TODO: 添加关系到数据库中
  async addPostLikes(pid: string, uid: string): Promise<boolean> {
    try {
      let post = await this.postModel.findOne({ pid }).exec();
      if (!post) {
        return false;
      }
      post.likes += 1;
      await post.save();
      return true;
      // TODO: 添加关系到数据库中
    } catch (e) {
      this.ctx.logger.error('in post.service, when addPostLikes', e);
      return false;
    }
  }

  private static generatePid(uid: string, cid: string, time: Date): string {
    return (
      uid.slice(0, 4) +
      cid.slice(0, 8) +
      mGenerateRandomId(4) +
      Number(time.toISOString().replace(/[^0-9]/g, '')).toString(36) +
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
