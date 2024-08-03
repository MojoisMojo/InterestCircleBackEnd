import { MidwayConfig } from '@midwayjs/core';
import { uploadWhiteList } from '@midwayjs/upload';
import { join } from 'path';
import { User } from '../entity/user.entity';
import { Circle } from '../entity/circle.entity';
import { CircleMember } from '../entity/circleMember.entity';
import { Mpost } from '../entity/post.entity';
import { Mcomment } from '../entity/comment.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '171999_mojo_0379385_8994',
  koa: {
    port: 7002,
    // host: '0.0.0.0',
  },

  webSocket: {},

  cors: {
    // origin: '/^(http://192.168.d{1,3}.d{1,3}(:d+)?|http://localhost(:d+)?)$/',
    // origin: p => {
    //   let { header } = p;
    //   const origin = header.origin;
    //   console.log('origin:', origin);
    //   return /^http:\/\/localhost(:\d+)?$/.test(origin) ? origin : false;
    // },
    origin: '*',
  },

  mongoose: {
    client: {
      uri: 'mongodb://localhost:27017/InterectCircle',
      options: {
        ssl: false,
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 60 * 1000,
        socketTimeoutMS: 60 * 1000,
      },
      entities: [User, Circle, CircleMember, Mpost, Mcomment],
    },
  },

  dirs: {
    public: {
      prefix: '/public',
      dir: join(__dirname, '../public'),
      dynamic: true, // 动态加载
      preload: false, // 不预加载
      buffer: false, // 不使用 buffer
      maxAge: 7 * 24 * 60 * 60, // 缓存时间 7 天
      extensions: false, // 不允许扩展
      index: false, // 不允许索引
      hidden: false, // 不允许隐藏文件
      gzip: true, // 启用 gzip
      setHeaders: (res, path, stat) => {
        res.set('Cache-Control', `public, max-age=${7 * 24 * 60 * 60}`);
        res.set('Content-Disposition', 'inline');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('X-Frame-Options', 'DENY');
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('Content-Security-Policy', "default-src 'self'");
      },
    },
  },

  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小
    fileSize: '5mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(__dirname, '../../tmp_dir/midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除(ms)
    cleanTimeout: 2 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /(\/api\/upload)|(\/circle)|(\/posts)/,
  },
} as MidwayConfig;
