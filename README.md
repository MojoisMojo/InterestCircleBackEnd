# InterestCircle BackEnd

## 开发环境

Windows 11, Intel i7, 内存 16GB；

照片存储：

- 文件系统

数据库：

- 本地 MongoDB

依赖：

- 见 [package.json](./package.json)

IDE：

- VSCode

## 技术栈

`ts + midwayjs/koa + typegoose + mongoose`

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

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[midway]: https://midwayjs.org
