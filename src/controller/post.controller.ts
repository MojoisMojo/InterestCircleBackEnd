import {
  Inject,
  Controller,
  Get,
  Post,
  Files,
  Fields,
  Query,
  Put,
  // Param,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PostService } from '../service/post.service';

@Controller('/posts')
export class PostController {
  @Inject()
  ctx: Context;

  @Inject()
  postService: PostService;

  @Post('/')
  async createPost(@Files() imgFiles: any, @Fields() fileds: any) {
    try {
      // this.ctx.logger.info('imgFiles & fileds', imgFiles, fileds);

      let { uid, cid, content } = fileds;
      this.ctx.logger.info('uid & cid', uid, cid);
      if (!uid || !cid || !content) {
        return {
          status: 'failed',
          msg: "You didn't put a uid Or cid Or content",
        };
      }
      const postContentInfo = await this.postService.createPost({
        uid,
        cid,
        content,
        imgFiles,
      });
      if (!postContentInfo) {
        return {
          status: 'failed',
          msg: '创建动态失败',
        };
      }
      return {
        status: 'success',
        msg: '创建动态成功',
        data: {
          post: postContentInfo,
        },
      };
    } catch (e) {
      this.ctx.logger.error('in post.controller, when createPost', e);
      return {
        status: 'failed',
        msg: '创建动态失败',
      };
    }
  }

  @Get('/')
  async getPostsInfoByCid(@Query('cid') cid: string) {
    try {
      // console.log('getPostsInfoByCid: cid', cid);
      const postsInfo = await this.postService.getLimitedPostsInfoByCid(cid);
      if (!postsInfo) {
        return {
          status: 'failed',
          msg: '获取动态失败',
        };
      }
      return {
        status: 'success',
        msg: '获取动态成功',
        data: {
          posts: postsInfo,
        },
      };
    } catch (e) {
      this.ctx.logger.error('in post.controller, when getPostsInfoByCid', e);
      return {
        status: 'failed',
        msg: '抱歉，获取动态时发生了一些错误',
      };
    }
  }

  @Put('/like')
  async likesAct(
    @Query('pid') pid: string,
    @Query('uid') uid: string,
    @Query('type') type?: string // TODO: 接口类型，点赞或取消点赞
  ) {
    try {
      // console.log('likesAct: pid & uid', pid, uid);
      const postInfo = await this.postService.likePostAct(pid, uid);
      if (!postInfo) {
        return {
          status: 'failed',
          msg: '点赞失败',
        };
      }
      return {
        status: 'success',
        msg: '点赞成功',
        data: {
          type: type || 'like',
        },
      };
    } catch (e) {
      this.ctx.logger.error('in post.controller, when likesAct', e);
      return {
        status: 'failed',
        msg: '抱歉，点赞时发生了一些错误',
      };
    }
  }
}
