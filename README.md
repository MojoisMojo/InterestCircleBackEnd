# 兴趣圈后端项目

[仓库链接](https://github.com/MojoisMojo/InterestCircleBackEnd)

## 开发和运行环境

### 系统

Windows 11, Intel i7, 内存 16GB；

### npm & node 版本

npm ：10.7.0
node：v20.15.0

## 打包流程

1. 执行`npm install`安装依赖
2. 执行`npm run build`将源文件打包到 dist 文件夹
3. 将 dist, package.json, bootstrap.js, 以及`./public/avatar/avatar.svg` 打包即可。

## 部署和启用流程

1. 确保本地有 MongoDB 数据库，并已经启用服务。
2. 在项目根目录执行`npm install`安装依赖
3. 执行`npm run start`启动服务。

## 技术栈

`ts + midwayjs/koa + typegoose + mongoose`

照片存储：

- 文件系统

数据库：

- 本地 MongoDB

## 后端文件说明

### model 模式

model 的属性名和数据格式几乎是对应的前端的格式和属性名 （外模式）

### entity 实体

entity 的属性名和格式 和 数据库的格式一致 （内模式）

### Interface 接口

所有的 Interface 中，

后缀是 Info 的代表给前端的数据格式，
这里代表一个意思的属性名要和前端的名字一样，格式尽量保证一致

后缀是 Options 的代表是前端给后端的数据格式和名字

entity 实现的接口 是 数据库存储数据的属性名和格式

数据库的设计，这里我们虽然用的是非关系数据库，
但是对于点赞人、评论这种一个记录可能有大量的内容的"关系"，还是将其设置为一个集合中，而不是一个记录的属性
