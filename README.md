# my_midway_project

## 后端API

## model

## Interface

所有的Interface中，

后缀是Info的代表给前端的数据格式，
这里代表一个意思的属性名要和前端的名字一样，格式尽量保证一致

后缀是Options的代表是前端给后端的数据格式和名字

entity实现的接口 是 数据库存储数据的属性名和格式

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
