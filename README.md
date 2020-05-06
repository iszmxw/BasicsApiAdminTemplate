<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>

简体中文 

## 简介

后台采用vue-element-admin进行二次开发

- [使用vue-element-admin文档](https://panjiachen.github.io/vue-element-admin-site/zh/)


**后台界面**

![avatar](/public/images/ht01.png)
![avatar](/public/images/ht02.png)
![avatar](/public/images/ht03.png)
![avatar](/public/images/ht04.png)

**Author Wechat**

![avatar](/public/images/wechat.png)

## 功能

```
- 登录 / 注销

- 首页
  - 登录日志
  - 操作日志

- 系统管理
  - 修改密码
  - 角色管理

- 合作商户
  - 创建商户
  - 商户列表
  - 设备列表

- 财务管理
  - 商户结算列表
  - 商户审核记录

- 消息管理
  - 合作列表
  - 客户反馈
  - 平台反馈
```


## 开发

```bash
# 克隆项目
git clone https://github.com/iszmxw/BasicsApiTemplate.git
# 进入项目目录
cd BasicsApiTemplate
# 安装依赖
npm install
# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用vue-element-admin文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## License

[MIT](https://github.com/iszmxw/BasicsApiTemplate/blob/master/LICENSE)

Copyright (c) 2020-present Iszmxw
