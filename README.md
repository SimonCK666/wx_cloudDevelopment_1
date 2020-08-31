# 扫码图书 APP

## 1. 个人中心

- 获取个人信息
- 微信登陆
- 获取openid
- 扫码 调用云函数

### 另外

1. 设备登陆的时候，显示登录按钮
2. 登录之后，显示微信头像 （用户openid为唯一标识）

## 首页

- 获取数据库列表
- 分页
    1. 一页三本
        - `.skip + limit` 实现分页
    2. 滚动加载
- 下拉刷新
    1. `enablePullDownRefresh`


# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

