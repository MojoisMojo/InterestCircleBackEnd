import {
  Inject,
  Controller,
  Get,
  Post,
  // Files,
  // Fields,
  Query,
  // Put,
  Body,
  // Param,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CommentService } from '../service/comment.service';
import { ICreateCommentOptions } from '../interface/comment.interface';

@Controller('/comments')
export class CommentController {
  @Inject()
  ctx: Context;

  @Inject()
  commentService: CommentService;

  @Post('/')
  async createComment(@Body() body: ICreateCommentOptions) {
    try {
      const { commenter_id, content, pid } = body;
      if (!commenter_id || !content || !pid) {
        return {
          status: 'failed',
          msg: "You didn't put a commenter_id Or content Or pid",
        };
      }
      const commentInfo = await this.commentService.createComment({
        commenter_id,
        content,
        pid,
      });
      if (!commentInfo) {
        return {
          status: 'failed',
          msg: '创建评论失败',
        };
      }
      return {
        status: 'success',
        msg: '创建评论成功',
        data: {
          commentInfo: commentInfo,
        },
      };
    } catch (e) {
      this.ctx.logger.error('in comment.controller, when createComment', e);
      return {
        status: 'failed',
        msg: '创建评论失败',
      };
    }
  }

  @Get('/')
  async getCommentsByPid(@Query('pid') pid: string) {
    try {
      if (!pid) {
        return {
          status: 'failed',
          msg: "You didn't put a pid",
        };
      }
      const comments = await this.commentService.getLimitedCommentsByPid(
        pid
      );
      if (!comments) {
        return {
          status: 'failed',
          msg: '获取评论失败',
        };
      }
      return {
        status: 'success',
        msg: '获取评论成功',
        data: {
          comments: comments,
        },
      };
    } catch (e) {
      this.ctx.logger.error('in comment.controller, when getCommentsByPid', e);
      return {
        status: 'failed',
        msg: '获取评论失败',
      };
    }
  }
}
