NodeWk 1.0.4
======
基于Sails.js MVC开发，实现常用的系统、微信、CMS等功能

有基于 NodeWk 开发的B2C商城系统 PC+WAP 需要的联系作者QQ: 11624317

PS：如果对Java开发框架感兴趣，可以看这里：https://github.com/Wizzercn/NutzWk

在线演示地址
======

https://nutzwk.wizzer.cn       NodeWk 和 NutzWk-V4/V5 前端是一样的


======
基于Sailsjs的Node.js开源企业级开发框架

NodeWk 1.0.x 运行环境：
*   Node 最新版
*   Redis 最新版
*   MySql 5.x

NodeWk 1.0.x 特性：
*   集成Email服务(nodemailer)
*   集成定时任务(node-schedule)
*   集成验证码插件(captchapng)
*   集成微信api插件(wechat-oauth/wechat-api)
*   集成日志文件插件(winston)
*   集成图片处理插件(gm)
*   集成日期插件(moment)
*   集成数据库备份插件(mysqldump)
*   集成文件打包插件(jszip)
*   集成Ejs模板引擎
*   后台管理界面采用Pjax+Bootstrap
*   支持国际化字符串
*   支持动作链
*   自定义路由


使用说明：
*   搭建Node.js运行环境
*   创建空的数据库,使用nodewk.sql还原数据库
*   修改数据库连接配置 /config/custom/mysql.js
*   修改数Redis连接配置 /config/custom/redis.js
*   npm i 安装(hiredis报错或报 Error: Can't find Python executable都不影响项目运行)
*   node app.js 或 npm start 运行 (如果启动时项目根目录不能创建.tmp文件夹,请手动创建)
*   http://127.0.0.1/sysadmin 访问后台
*   用户名：superadmin  密码：1


其他说明：
*   /api/policies/sessionAuth.js        后台权限验证
*   /api/policies/oauthAuth.js      API TOKEN权限验证
*   解决grunt占用CPU过高问题,可以将 Gruntfile.js 重命名,或根目录增加 .sailsrc 文件,文件设置内容:

```
{
  "generators": {
    "modules": {}
  },
  "hooks": {
      "grunt": false
  },
  "paths": {
      "public": "assets"
  }
}

```
# 关于

*   本项目完全开源，商用完全免费
*   欢迎打赏，以资鼓励

![打赏](pay.jpg)


