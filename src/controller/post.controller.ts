import {
  Inject,
  Controller,
  Get,
  Post,
  Files,
  Fields,
  Query,
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
      this.ctx.logger.info('imgFiles & fileds', imgFiles, fileds);

      let { uid, cid, content } = fileds;
      this.ctx.logger.info('uid & cid & conten', uid, cid, content);
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
  async getPostsInfoByCid(@Query() cid: string) {
    try {
      console.log('getPostsInfoByCid: cid', cid);
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
          postsList: postsInfo,
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
}
