import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MComment } from '../entity/comment.entity';
import { ICreateCommentOptions } from '../interface/comment.interface';
import { Mpost } from '../entity/post.entity';
import { CommentInfo, CommentWithCommenterInfo } from '../model/comment.model';
import { User } from '../entity/user.entity';

@Provide()
export class CommentService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(MComment)
  commentModel: ReturnModelType<typeof MComment>;

  @InjectEntityModel(Mpost)
  postModel: ReturnModelType<typeof Mpost>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async createComment(
    options: ICreateCommentOptions
  ): Promise<CommentInfo | null> {
    try {
      const { commenter_id, content, pid } = options;
      let post = await this.postModel.findOne({ pid });
      const user = await this.userModel.findOne({ uid: commenter_id });
      if (!post || !user) {
        throw new Error('user or post not found');
      }
      const time = new Date();
      const idx = post.comments + 1;
      let comid = CommentService.generateComid(pid, idx, time, commenter_id);
      let comment = await this.commentModel.create({
        comid,
        commenter_id,
        content,
        pid,
        time,
      } as MComment);
      if (!comment) {
        throw new Error('create comment failed');
      }
      post.comments += 1;
      post.save();
      return comment.getCommentInfo();
    } catch (e) {
      this.ctx.logger.error('in comment.service, when createComment: ', e);
      return null;
    }
  }

  async getLimitedCommentsByPid(
    pid: string,
    limit: number = 20
  ): Promise<CommentWithCommenterInfo[] | null> {
    try {
      let res = await this.postModel.exists({ pid });
      if (!res) {
        throw new Error('post not found');
      }
      let comments = await this.commentModel
        .find({ pid })
        .sort({ time: -1 })
        .limit(limit);
      if (!comments) {
        throw new Error('get comments failed');
      }
      if (comments.length === 0) {
        return [];
      }
      // get commenter info
      let commentsList = await Promise.all(
        comments.map(async (comment: any) => {
          try {
            const commenter = await this.userModel.findOne({
              uid: comment.commenter_id,
            });
            if (!commenter) {
              throw new Error('commenter not found');
            }

            return new CommentWithCommenterInfo({
              comment: comment.getCommentInfo(),
              commenter: commenter.getInfoAsCommenter(),
            });
          } catch (e) {
            this.ctx.logger.error(
              'in comment.service, when getLimitedCommentsByPid: ',
              e
            );
            return new CommentWithCommenterInfo({
              comment: comment.getCommentInfo(),
              commenter: null,
            });
          }
        })
      );
      return commentsList;
    } catch (e) {
      this.ctx.logger.error(
        'in comment.service, when getLimitedCommentsByPid: ',
        e
      );
      return null;
    }
  }
  private static generateComid(
    pid: string,
    idx: number,
    time: Date,
    uid: string
  ): string {
    return pid + time.getTime().toString(36) + uid + '_' + idx;
  }
}
