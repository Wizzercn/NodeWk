CREATE TABLE IF NOT EXISTS `cms_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shopid` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `info` varchar(500) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `client` varchar(10) DEFAULT NULL,
  `publishAt` int(11) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `picurl` varchar(255) DEFAULT NULL,
  `seo_title` varchar(100) DEFAULT NULL,
  `seo_keywords` varchar(100) DEFAULT NULL,
  `seo_description` varchar(100) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `channelId` int(11) DEFAULT NULL,
  `contentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `channelId` (`channelId`),
  KEY `contentId` (`contentId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_article_content` (
  `content` longtext,
  `articleId` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_channel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shopid` int(11) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `seo_title` varchar(100) DEFAULT NULL,
  `seo_keywords` varchar(100) DEFAULT NULL,
  `seo_description` varchar(100) DEFAULT NULL,
  `homepage` tinyint(1) DEFAULT NULL,
  `content` longtext,
  `disabled` tinyint(1) DEFAULT NULL,
  `hasChildren` tinyint(1) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `picurl` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_linkclass` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `content` longtext,
  `ip` varchar(20) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `passAt` int(11) DEFAULT NULL,
  `passed` tinyint(1) DEFAULT NULL,
  `channelId` int(11) DEFAULT NULL,
  `menuId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `channelId` (`channelId`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cms_site` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shopid` int(11) DEFAULT NULL,
  `site_name` varchar(100) DEFAULT NULL,
  `site_domain` varchar(255) DEFAULT NULL,
  `site_icp` varchar(50) DEFAULT NULL,
  `site_logo` varchar(255) DEFAULT NULL,
  `site_wap_logo` varchar(255) DEFAULT NULL,
  `site_qq` varchar(20) DEFAULT NULL,
  `site_email` varchar(255) DEFAULT NULL,
  `site_tel` varchar(20) DEFAULT NULL,
  `weibo_name` varchar(100) DEFAULT NULL,
  `weibo_url` varchar(100) DEFAULT NULL,
  `weibo_qrcode` varchar(255) DEFAULT NULL,
  `wechat_name` varchar(100) DEFAULT NULL,
  `wechat_id` varchar(100) DEFAULT NULL,
  `wechat_qrcode` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_keywords` varchar(255) DEFAULT NULL,
  `seo_description` varchar(255) DEFAULT NULL,
  `footer_content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `img_config` (
  `id` varchar(255) NOT NULL,
  `s_width` int(11) DEFAULT NULL,
  `s_height` int(11) DEFAULT NULL,
  `m_width` int(11) DEFAULT NULL,
  `m_height` int(11) DEFAULT NULL,
  `wk_url` varchar(255) DEFAULT NULL,
  `wk_type` int(11) DEFAULT NULL,
  `wk_txt` varchar(255) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `img_image` (
  `id` varchar(50) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `m_src` varchar(255) DEFAULT NULL,
  `s_src` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `watermark` tinyint(1) DEFAULT NULL,
  `updatedAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `sys_backup` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `createdBy` (`createdBy`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `config_key` varchar(100) DEFAULT NULL,
  `config_val` varchar(100) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_ip` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_job` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `cron` varchar(50) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `updateTxt` varchar(255) DEFAULT NULL,
  `updateStatus` tinyint(1) DEFAULT NULL,
  `updateAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdByName` varchar(50) DEFAULT NULL,
  `createdIp` varchar(20) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=607 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `target` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `permission` varchar(100) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `hasChildren` tinyint(1) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `path` (`path`),
  KEY `url` (`url`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_menu_roles__sys_role_menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sys_menu_roles` int(11) DEFAULT NULL,
  `sys_role_menus` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=824 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unitid` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_role_users__sys_user_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sys_role_users` int(11) DEFAULT NULL,
  `sys_user_roles` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_unit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `hasChildren` tinyint(1) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `loginname` varchar(100) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL,
  `lastIp` varchar(20) DEFAULT NULL,
  `loginAt` int(11) DEFAULT NULL,
  `loginCount` int(11) DEFAULT NULL,
  `loginTheme` varchar(20) DEFAULT NULL,
  `loginSidebar` tinyint(1) DEFAULT NULL,
  `loginScroll` tinyint(1) DEFAULT NULL,
  `loginBoxed` tinyint(1) DEFAULT NULL,
  `customMenus` longtext,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `unitid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginname` (`loginname`),
  KEY `nickname` (`nickname`),
  KEY `unitid` (`unitid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `appname` varchar(255) DEFAULT NULL,
  `ghid` varchar(50) DEFAULT NULL,
  `appid` varchar(50) DEFAULT NULL,
  `appsecret` varchar(255) DEFAULT NULL,
  `encodingAESKey` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `expire_time` int(11) DEFAULT NULL,
  `jsapi_ticket` varchar(255) DEFAULT NULL,
  `jsapi_time` int(11) DEFAULT NULL,
  `qrcode` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ghid` (`ghid`),
  UNIQUE KEY `appid` (`appid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_mass` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `media_id` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `scope` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_mass_news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `thumb_media_id` varchar(255) DEFAULT NULL,
  `author` varchar(30) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content_source_url` varchar(255) DEFAULT NULL,
  `content` longtext,
  `digest` longtext,
  `show_cover_pic` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_mass_send` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `massId` int(11) DEFAULT NULL,
  `receivers` longtext,
  `status` int(11) DEFAULT NULL,
  `msg_id` varchar(20) DEFAULT NULL,
  `errcode` varchar(20) DEFAULT NULL,
  `errmsg` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `hasChildren` tinyint(1) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_msg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `openid` varchar(50) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `content` longtext,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  `replyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_msg_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `msgid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `openid` varchar(50) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `content` longtext,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picUrl` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `msgtype` varchar(10) DEFAULT NULL,
  `keyword` varchar(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_txt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `wx_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) DEFAULT NULL,
  `unionid` varchar(50) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `subscribe` int(11) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `createdAt` int(11) DEFAULT NULL,
  `wxid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (2,0,'有机会员的日常生活：策马奔腾！','策马奔腾，是一项极需要气场的运动，而且在城市中，想要参加这一运动，也不是一件像骑自行车那样随便的。至少对于小编来说，在草原，扬鞭、奔驰，是一件非常非常令人神往的事！但就是这样的好事，却是我们尚作有机会员的日常！','超级管理员',NULL,1457339797,0,'/upload/image/20160307/479f164a-2824-4880-b5a3-b5e1e3ac3564.jpg','','','',1,1457339823,16,2);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (3,0,'我不推广产品 我推广健康','进入食品行业，对曾杨来说并不是偶然。在生活中，曾杨虽然和其他二十多岁的小伙子一样，喜欢运动，爱玩爱闹，但曾杨也和其他的年轻男孩不一样——他更关注生活，关注食品。','超级管理员',NULL,1457339853,0,'/upload/image/20160307/e8def416-c655-486e-9fac-bdecf7a00c25.jpg','','','',1,1457339891,16,3);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (4,0,'家庭环保：小厨房的大环保','在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。','超级管理员',NULL,1457339896,0,'/upload/image/20160307/4d4106db-aa82-4b94-bbcb-5ab83e691676.jpg','','','',1,1457339927,16,4);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (5,0,'农产品行业解决方案','特别是新农业，例如褚橙、柳桃，这些高品质、高价位的生态农产品无法通过传统批发渠道销售，一定要直接面向终端客户销售，唯一能连接生产基地与终端客户的纽带就是线上电商平台。','超级管理员',NULL,1462765361,0,'/open/image/file/c926ae8f3ed2400d8b19fc888f1f7a35.jpg','','','',1,1462765395,21,5);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (6,0,'鲜花行业解决方案','特别是新农业，例如褚橙、柳桃，这些高品质、高价位的生态农产品无法通过传统批发渠道销售，一定要直接面向终端客户销售，唯一能连接生产基地与终端客户的纽带就是线上电商平台。','超级管理员',NULL,1462765419,0,'/open/image/file/5b3aafbe3aa248ff8f3ddffed6f0960e.jpg','','','',1,1462765446,21,6);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (7,0,'酒水行业解决方案','特别是新农业，例如褚橙、柳桃，这些高品质、高价位的生态农产品无法通过传统批发渠道销售，一定要直接面向终端客户销售，唯一能连接生产基地与终端客户的纽带就是线上电商平台。','超级管理员',NULL,1462765419,0,'/open/image/file/b944cffe7ebd4bc3b1616f3eb1f86a1a.jpg','','','',1,1462765470,21,7);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (8,0,'购物型企业网站解决方案','企业官网＋网上商城”融合一体，打造PC网站+手机网站+微信全终端覆盖的三合一网站。提升品牌和产品形象的同时，一站式解决商品在线订购，为企业量身打造最优质、最实用的网站建设解决方案','超级管理员',NULL,1462765419,0,'/open/image/file/d35de07b0e274632a2dce865968bcbb7.jpg','','','',1,1462765526,21,8);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (9,0,'服务类预定业务解决方案','专门为酒店、餐饮、生活消费等服务预订类商户提供的电商解决方案，以场地、档期等业务元素为商品形态，解决服务类电商难题，更多的为没有实物销售的企业商户提供广泛的网络传播。','超级管理员',NULL,1462765419,0,'/open/image/file/12debc170fee40a4b346e56329724c27.jpg','','','',1,1462765566,21,9);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (10,0,'O2O业务解决方案','电商不在是新鲜名词，已成为经营常态。随着中国电子商务的不断发展，线上线下的边界越来越模糊，线上线下融合打造“电商+店商”的新业务模式，成为企业提升服务和营销的关键所在。','超级管理员',NULL,1462765419,0,'/open/image/file/74ca298fc6f64c6ea876212194e78d9b.jpg','','','',1,1462765591,21,10);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (14,0,'商秀','超轻量级电商平台','超级管理员',NULL,1463621423,0,'/upload/image/20160517/d3129cd4-f31a-44c4-ba66-99d08eb93a46.jpg','','','',1,1462778149,25,14);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (16,0,'价格体系','价格体系','超级管理员',NULL,1462781654,0,'','','','',1,1462781717,25,16);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (17,0,'价格体系价格体系价格体系价格体系','价格体系价格体系价格体系价格体系价格体系价格体系价格体系价格体系价格体系价格体系价格体系价格体系','超级管理员',NULL,1462781722,0,'','','','',1,1462781738,25,17);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (18,0,'123','函数传递是如何让HTTP服务器工作的\r\n\r\n带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：\r\n\r\nvar http = require(\"http\");\r\n\r\nhttp.createServer(function(request, response) {\r\n  response.writeHead(200, {\"Content-Type\": \"text/plain\"});\r\n  response.write(\"Hello World\");\r\n  response.end();\r\n}).listen(8888);\r\n现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。\r\n\r\n用这样的代码也可以达到同样的目的：\r\n\r\nvar http = require(\"http\");\r\n\r\nfunction onRequest(request, response) {\r\n  response.writeHead(200, {\"Content-Type\": \"text/plain\"});\r\n  response.write(\"Hello World\");\r','超级管理员',NULL,1463465850,0,'/open/image/file/072647a1418642e4b105d3be1e67afe9.png','','','',1,1463465892,26,18);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (19,0,'123','函数传递是如何让HTTP服务器工作的\r\n\r\n带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：\r\n\r\nvar http = require(\"http\");\r\n\r\nhttp.createServer(function(request, response) {\r\n  response.writeHead(200, {\"Content-Type\": \"text/plain\"});\r\n  response.write(\"Hello World\");\r\n  response.end();\r\n}).listen(8888);\r\n现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。\r\n\r\n用这样的代码也可以达到同样的目的：\r\n\r\nvar http = require(\"http\");\r\n\r\nfunction onRequest(request, response) {\r\n  response.writeHead(200, {\"Content-Type\": \"text/plain\"});\r\n  response.write(\"Hello World\");\r','超级管理员',NULL,1463465850,0,'/open/image/file/072647a1418642e4b105d3be1e67afe9.png','','','',1,1463465904,26,19);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (21,0,'1','1','超级管理员',NULL,1463651533,0,'','','','',1,1463651545,26,21);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (22,0,'一家食府','店铺介绍','超级管理员',NULL,1466365991,1,'/open/image/file/c0e10c71ecad4b06ace56753f9901a50.png','','','',1,1466366062,30,22);
INSERT INTO `cms_article` (`id`,`shopid`,`title`,`info`,`author`,`client`,`publishAt`,`disabled`,`picurl`,`seo_title`,`seo_keywords`,`seo_description`,`createdBy`,`createdAt`,`channelId`,`contentId`) VALUES (23,0,'regdfg','gfdbfgbfgbfb反动的发布','超级管理员',NULL,1466648814,0,'','','','',1,1466648830,24,23);

INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">策马奔腾，是一项极需要气场的运动，而且在城市中，想要参加这一运动，也不是一件像骑自行车那样随便的。至少对于小编来说，在草原，扬鞭、奔驰，是一件非常非常令人神往的事！但就是这样的好事，却是我们尚作有机会员的日常！</span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">策马奔腾，是一项极需要气场的运动，而且在城市中，想要参加这一运动，也不是一件像骑自行车那样随便的。至少对于小编来说，在草原，扬鞭、奔驰，是一件非常非常令人神往的事！但就是这样的好事，却是我们尚作有机会员的日常！</span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">策马奔腾，是一项极需要气场的运动，而且在城市中，想要参加这一运动，也不是一件像骑自行车那样随便的。至少对于小编来说，在草原，扬鞭、奔驰，是一件非常非常令人神往的事！但就是这样的好事，却是我们尚作有机会员的日常！</span></span></span></p>',2,2);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">进入食品行业，对曾杨来说并不是偶然。在生活中，曾杨虽然和其他二十多岁的小伙子一样，喜欢运动，爱玩爱闹，但曾杨也和其他的年轻男孩不一样——他更关注生活，关注食品。</span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">进入食品行业，对曾杨来说并不是偶然。在生活中，曾杨虽然和其他二十多岁的小伙子一样，喜欢运动，爱玩爱闹，但曾杨也和其他的年轻男孩不一样——他更关注生活，关注食品。</span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">进入食品行业，对曾杨来说并不是偶然。在生活中，曾杨虽然和其他二十多岁的小伙子一样，喜欢运动，爱玩爱闹，但曾杨也和其他的年轻男孩不一样——他更关注生活，关注食品。</span></span></span></p>',3,3);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。</span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><br/></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。</span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><br/></span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。</span></span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><br/></span></span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。</span></span></span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><br/></span></span></span></span></p><p><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><span style=\"color: rgb(34, 34, 34); font-family: Consolas, &#39;Lucida Console&#39;, monospace; font-size: 12px; white-space: pre-wrap; background-color: rgb(255, 255, 255);\">在很多人的观念里，环保可能是很宏大很遥远的东西，它需要花费你无数的时间精力去努力，得到的效果可能还是微不足道的。但对尚作的会员周丽来说，环保其实就是很简单小事，做好厨房垃圾的处理，将那些湿哒哒的垃圾处理好，就是环保。</span></span></span></span></span></p>',4,4);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',5,5);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',6,6);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',7,7);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',8,8);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',9,9);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p>如果</p>',10,10);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">三站商品同步、会员同步、订单同步通过统一的系统平台，同时管理PC商城、手机商城、微信商城快捷操作实现高效管理</span></p>',14,14);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span></p>',16,16);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<p><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span><span style=\"color: rgb(153, 153, 153); font-family: &#39;Microsoft YaHei&#39;, Arial, 宋体; font-size: 14px; line-height: 26px; background-color: rgb(255, 255, 255);\">价格体系价格体系价格体系价格体系</span></p>',17,17);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',18,18);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('<h3 style=\"font-size: 25.6px; margin-top: 36px; color: rgb(119, 0, 0); margin-bottom: 36px; font-family: Georgia, serif; white-space: normal;\">函数传递是如何让HTTP服务器工作的</h3><p style=\"font-size: 17.6px; line-height: 26.4px; margin-bottom: 48px; margin-top: -22px; font-family: Georgia, serif; white-space: normal;\">带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：</p><pre class=\"prettyprint lang-js\" style=\"border: 1px solid rgb(238, 238, 238); padding: 16px; margin-bottom: 64px; margin-top: -24px; font-size: 14px; background-color: rgb(247, 247, 247);\"><span class=\"kwd\" style=\"color: rgb(0, 0, 136);\">var</span><span class=\"pln\"> http </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">=</span><span class=\"pln\"> require</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;http&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span><span class=\"pln\"><br/><br/>http</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">createServer</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"kwd\" style=\"color: rgb(0, 0, 136);\">function</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"pln\">request</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">,</span><span class=\"pln\"> response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">)</span><span class=\"pln\"> </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">{</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">writeHead</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"lit\" style=\"color: rgb(0, 102, 102);\">200</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">,</span><span class=\"pln\"> </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">{</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;Content-Type&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">:</span><span class=\"pln\"> </span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;text/plain&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">});</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">write</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;Hello World&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">end</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">();</span><span class=\"pln\"><br/></span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">}).</span><span class=\"pln\">listen</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"lit\" style=\"color: rgb(0, 102, 102);\">8888</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span></pre><p style=\"font-size: 17.6px; line-height: 26.4px; margin-bottom: 48px; margin-top: -22px; font-family: Georgia, serif; white-space: normal;\">现在它看上去应该清晰了很多：我们向&nbsp;<em>createServer</em>&nbsp;函数传递了一个匿名函数。</p><p style=\"font-size: 17.6px; line-height: 26.4px; margin-bottom: 48px; margin-top: -22px; font-family: Georgia, serif; white-space: normal;\">用这样的代码也可以达到同样的目的：</p><pre class=\"prettyprint lang-js\" style=\"border: 1px solid rgb(238, 238, 238); padding: 16px; margin-bottom: 64px; margin-top: -24px; font-size: 14px; background-color: rgb(247, 247, 247);\"><span class=\"kwd\" style=\"color: rgb(0, 0, 136);\">var</span><span class=\"pln\"> http </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">=</span><span class=\"pln\"> require</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;http&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span><span class=\"pln\"><br/><br/></span><span class=\"kwd\" style=\"color: rgb(0, 0, 136);\">function</span><span class=\"pln\"> onRequest</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"pln\">request</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">,</span><span class=\"pln\"> response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">)</span><span class=\"pln\"> </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">{</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">writeHead</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"lit\" style=\"color: rgb(0, 102, 102);\">200</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">,</span><span class=\"pln\"> </span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">{</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;Content-Type&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">:</span><span class=\"pln\"> </span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;text/plain&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">});</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">write</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"str\" style=\"color: rgb(0, 136, 0);\">&quot;Hello World&quot;</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span><span class=\"pln\"><br/>&nbsp; response</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">end</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">();</span><span class=\"pln\"><br/></span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">}</span><span class=\"pln\"><br/><br/>http</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">.</span><span class=\"pln\">createServer</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"pln\">onRequest</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">).</span><span class=\"pln\">listen</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">(</span><span class=\"lit\" style=\"color: rgb(0, 102, 102);\">8888</span><span class=\"pun\" style=\"color: rgb(102, 102, 0);\">);</span></pre><p style=\"font-size: 17.6px; line-height: 26.4px; margin-bottom: 48px; margin-top: -22px; font-family: Georgia, serif; white-space: normal;\">也许现在我们该问这个问题了：我们为什么要用这种方式呢？</p><p><br/></p>',19,19);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',21,21);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',22,22);
INSERT INTO `cms_article_content` (`content`,`articleId`,`id`) VALUES ('',23,23);

INSERT INTO `cms_channel` (`id`,`shopid`,`parentId`,`path`,`name`,`url`,`seo_title`,`seo_keywords`,`seo_description`,`homepage`,`content`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (21,0,0,'0005','解决方案','/solution',NULL,NULL,NULL,0,'',0,0,2,1,1462765212);
INSERT INTO `cms_channel` (`id`,`shopid`,`parentId`,`path`,`name`,`url`,`seo_title`,`seo_keywords`,`seo_description`,`homepage`,`content`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (24,0,0,'0006','关于我们','/about',NULL,NULL,NULL,0,'',0,0,5,1,1462778117);
INSERT INTO `cms_channel` (`id`,`shopid`,`parentId`,`path`,`name`,`url`,`seo_title`,`seo_keywords`,`seo_description`,`homepage`,`content`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (25,0,0,'0007','价格体系','/sale',NULL,NULL,NULL,0,'',0,0,4,1,1462781647);
INSERT INTO `cms_channel` (`id`,`shopid`,`parentId`,`path`,`name`,`url`,`seo_title`,`seo_keywords`,`seo_description`,`homepage`,`content`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (26,0,0,'0008','样板展示','/sample',NULL,NULL,NULL,0,'',0,0,3,1,1462782102);
INSERT INTO `cms_channel` (`id`,`shopid`,`parentId`,`path`,`name`,`url`,`seo_title`,`seo_keywords`,`seo_description`,`homepage`,`content`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (27,0,0,'0009','功能规划','/project',NULL,NULL,NULL,1,'',0,0,1,1,1462929881);

INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (5,'功能规划','img','/upload/image/20160509/e3f07e31-ddf9-4997-9eec-e2edd576892b.jpg','javascript:;','_blank',1,1462761907,3);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (6,'关于我们','img','/upload/image/20160509/01419665-89d9-4330-89dc-69062d1481af.jpg','javascript:;','_blank',1,1462763697,4);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (8,'解决方案','img','/upload/image/20160509/3542151c-76d7-403f-9123-f7df0acbc7c9.jpg','javascript:;','_blank',1,1462764989,6);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (10,'banner大图','img','/upload/image/20160510/a0bfe267-89e5-4afc-b15c-4eac7600da11.png','javascript:;','_blank',1,1462863261,1);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (23,'手机banner','img','/upload/image/20160512/d11b7d6e-f53a-4ae7-a22f-da189cf059b4.png','javascript:;','_blank',1,1463018803,9);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (24,'首页价格','img','/upload/image/20160512/271a917d-114e-4e20-83b2-f58671a755bd.png','javascript:;','_blank',1,1463019783,10);
INSERT INTO `cms_link` (`id`,`name`,`type`,`picurl`,`url`,`target`,`createdBy`,`createdAt`,`classId`) VALUES (25,'dsfsf','txt','','javascript:;','_blank',1,1464959635,1);

INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (1,'PC首页banner大图',1,1462525045);
INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (3,'功能规划页面banner',1,1462761873);
INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (4,'关于我们页面banner',1,1462763672);
INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (6,'解决方案页面banner',1,1462764926);
INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (9,'手机首页banner大图',1,1463018747);
INSERT INTO `cms_linkclass` (`id`,`name`,`createdBy`,`createdAt`) VALUES (10,'手机首页价格显示',1,1463019746);

INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (17,NULL,'15705607895',NULL,NULL,NULL,'::ffff:127.0.0.1',1462937993,1462937993,0,NULL,NULL);
INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (7,NULL,'13705607564',NULL,NULL,NULL,'::ffff:192.168.1.104',1462860060,1462860060,0,NULL,NULL);
INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (16,NULL,'15705607680',NULL,NULL,NULL,'::ffff:192.168.1.107',1463035858,1462933160,0,NULL,NULL);
INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (18,NULL,'13359011952',NULL,NULL,NULL,'::ffff:127.0.0.1',1463045650,1463045650,0,NULL,NULL);
INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (19,NULL,'11111111111',NULL,NULL,NULL,'::ffff:127.0.0.1',1463045658,1463045658,0,NULL,NULL);
INSERT INTO `cms_message` (`id`,`name`,`phone`,`address`,`email`,`content`,`ip`,`createdAt`,`passAt`,`passed`,`channelId`,`menuId`) VALUES (20,NULL,'12333333333',NULL,NULL,NULL,'::ffff:127.0.0.1',1463045668,1463045668,0,NULL,NULL);

INSERT INTO `cms_site` (`id`,`shopid`,`site_name`,`site_domain`,`site_icp`,`site_logo`,`site_wap_logo`,`site_qq`,`site_email`,`site_tel`,`weibo_name`,`weibo_url`,`weibo_qrcode`,`wechat_name`,`wechat_id`,`wechat_qrcode`,`seo_title`,`seo_keywords`,`seo_description`,`footer_content`) VALUES (1,NULL,'Wizzer','','','','','11624317','','','','','','','','','','node商城,node.js商城,商城系统,开发框架,node开发框架,node.js框架','Node.js商城系统和Node.js企业级开发框架','©Wizzer.cn');

INSERT INTO `img_config` (`id`,`s_width`,`s_height`,`m_width`,`m_height`,`wk_url`,`wk_type`,`wk_txt`,`updatedAt`) VALUES ('1',200,200,420,4200,'',0,'',1463462365);

INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('03b0ac3e7d664c9ab77419ee9fa029c0','QQ图片20160415104809.jpg','/upload/image/20160418/08040c03-bc27-4fc2-9494-27fd69470d75.jpg','/open/image/file/03b0ac3e7d664c9ab77419ee9fa029c0.jpg','/upload/image/20160418/08040c03-bc27-4fc2-9494-27fd69470d75_m.jpg','/upload/image/20160418/08040c03-bc27-4fc2-9494-27fd69470d75_s.jpg',2448,3264,0,1460945609);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('072647a1418642e4b105d3be1e67afe9','134295.png','/upload/image/20160517/be98809e-8cb1-4ae9-8f51-a3de20b9d683.png','/open/image/file/072647a1418642e4b105d3be1e67afe9.png','/upload/image/20160517/be98809e-8cb1-4ae9-8f51-a3de20b9d683_m.png','/upload/image/20160517/be98809e-8cb1-4ae9-8f51-a3de20b9d683_s.png',1024,768,0,1463465878);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('0a7b520b43774ac699a70387698ca757','3.jpg','/upload/image/20160307/fbd83541-4261-463a-962e-e3ba120f0d99.jpg','/open/image/file/0a7b520b43774ac699a70387698ca757.jpg','/upload/image/20160307/fbd83541-4261-463a-962e-e3ba120f0d99_m.jpg','/upload/image/20160307/fbd83541-4261-463a-962e-e3ba120f0d99_s.jpg',800,800,0,1457403551);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('0f5daea9c0b94f3bb89b3d9798ad432a','i1.jpg','/upload/image/20160306/8893169b-d010-413c-a884-64c26a2898af.jpg','/open/image/file/0f5daea9c0b94f3bb89b3d9798ad432a.jpg','/upload/image/20160306/8893169b-d010-413c-a884-64c26a2898af_m.jpg','/upload/image/20160306/8893169b-d010-413c-a884-64c26a2898af_s.jpg',430,430,0,1457334101);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('11ff343dbeda4ff3a9b0e2d962c7766b','5.jpg','/upload/image/20160307/b81bf1de-75bf-47b2-8841-f4e20a3910ad.jpg','/open/image/file/11ff343dbeda4ff3a9b0e2d962c7766b.jpg','/upload/image/20160307/b81bf1de-75bf-47b2-8841-f4e20a3910ad_m.jpg','/upload/image/20160307/b81bf1de-75bf-47b2-8841-f4e20a3910ad_s.jpg',800,800,0,1457403551);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('12debc170fee40a4b346e56329724c27','solut_e.jpg','/upload/image/20160509/0d28d21b-e13a-40c5-93e4-336e01fccfe7.jpg','/open/image/file/12debc170fee40a4b346e56329724c27.jpg','/upload/image/20160509/0d28d21b-e13a-40c5-93e4-336e01fccfe7_m.jpg','/upload/image/20160509/0d28d21b-e13a-40c5-93e4-336e01fccfe7_s.jpg',340,140,0,1462765564);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('134fafc0094e4da8ac9deaa728791ac0','QQ截图20160222103945.jpg','/upload/image/20160623/e997efad-4df9-4d94-8774-e244a5fdc67b.jpg','/open/image/file/134fafc0094e4da8ac9deaa728791ac0.jpg','/upload/image/20160623/e997efad-4df9-4d94-8774-e244a5fdc67b_m.jpg','/upload/image/20160623/e997efad-4df9-4d94-8774-e244a5fdc67b_s.jpg',130,160,0,1466659138);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('17274ea8a11e46b88c6d8a7967c7a976','3.jpg','/upload/image/20160307/268b67c9-49b1-4c12-aca6-630f69959528.jpg','/open/image/file/17274ea8a11e46b88c6d8a7967c7a976.jpg','/upload/image/20160307/268b67c9-49b1-4c12-aca6-630f69959528_m.jpg','/upload/image/20160307/268b67c9-49b1-4c12-aca6-630f69959528_s.jpg',720,720,0,1457404284);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('1adf897439cc424d8ee1f1766eb7bce9','20160413112300.jpg','/upload/image/20160414/280530e8-208a-4153-96bf-e214927c0e4d.jpg','/open/image/file/1adf897439cc424d8ee1f1766eb7bce9.jpg','/upload/image/20160414/280530e8-208a-4153-96bf-e214927c0e4d_m.jpg','/upload/image/20160414/280530e8-208a-4153-96bf-e214927c0e4d_s.jpg',640,480,0,1460622072);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('1c2799a956154059a826f06c230cd967','5.jpg','/upload/image/20160306/78338fbe-2c28-40e1-94eb-9ab111883ba4.jpg','/open/image/file/1c2799a956154059a826f06c230cd967.jpg','/upload/image/20160306/78338fbe-2c28-40e1-94eb-9ab111883ba4_m.jpg','/upload/image/20160306/78338fbe-2c28-40e1-94eb-9ab111883ba4_s.jpg',350,350,0,1457333832);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('1d43676202dc425b8f1e58e7b38ae6aa','adv_2.png','/upload/image/20160620/db1bd745-984d-4ed3-a28e-6e276c571f46.png','/open/image/file/1d43676202dc425b8f1e58e7b38ae6aa.png','/upload/image/20160620/db1bd745-984d-4ed3-a28e-6e276c571f46_m.png','/upload/image/20160620/db1bd745-984d-4ed3-a28e-6e276c571f46_s.png',720,576,0,1466365887);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('20f16a08b4684d5cad73749001bcbb65','201602122052502802.jpg','/upload/image/20160310/7c629022-0a0f-4707-bec0-4ed4fc579dca.jpg','/open/image/file/20f16a08b4684d5cad73749001bcbb65.jpg','/upload/image/20160310/7c629022-0a0f-4707-bec0-4ed4fc579dca_m.jpg','/upload/image/20160310/7c629022-0a0f-4707-bec0-4ed4fc579dca_s.jpg',600,600,0,1457598090);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('24aa7d9a50694693a5387fe66a92383a','04.jpg','/upload/image/20160307/6e5082bb-b106-476f-9128-cf19030c777b.jpg','/open/image/file/24aa7d9a50694693a5387fe66a92383a.jpg','/upload/image/20160307/6e5082bb-b106-476f-9128-cf19030c777b_m.jpg','/upload/image/20160307/6e5082bb-b106-476f-9128-cf19030c777b_s.jpg',600,600,0,1457403271);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('2a16c0a6e63a4d95bcf07ed1180595c9','5.jpg','/upload/image/20160307/e4f7ec06-9830-4992-9c73-fe2534ddb351.jpg','/open/image/file/2a16c0a6e63a4d95bcf07ed1180595c9.jpg','/upload/image/20160307/e4f7ec06-9830-4992-9c73-fe2534ddb351_m.jpg','/upload/image/20160307/e4f7ec06-9830-4992-9c73-fe2534ddb351_s.jpg',500,500,0,1457405268);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('2cb01917077741a18fa9f9aed511a244','1.jpg','/upload/image/20160307/fbbe587e-96c7-44b2-a90d-6508a9a8d5de.jpg','/open/image/file/2cb01917077741a18fa9f9aed511a244.jpg','/upload/image/20160307/fbbe587e-96c7-44b2-a90d-6508a9a8d5de_m.jpg','/upload/image/20160307/fbbe587e-96c7-44b2-a90d-6508a9a8d5de_s.jpg',800,800,0,1457403550);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('2f4bdf8a0d884426ac9440cb7b446fdb','01.jpg','/upload/image/20160307/db581a46-6e39-45c7-b9ab-b32615aad266.jpg','/open/image/file/2f4bdf8a0d884426ac9440cb7b446fdb.jpg','/upload/image/20160307/db581a46-6e39-45c7-b9ab-b32615aad266_m.jpg','/upload/image/20160307/db581a46-6e39-45c7-b9ab-b32615aad266_s.jpg',640,640,0,1457403270);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('38b675d5ad904792aaa9bfc37a38ca09','03.jpg','/upload/image/20160307/41ecf475-006e-4a53-896f-c6c5f5bd6c59.jpg','/open/image/file/38b675d5ad904792aaa9bfc37a38ca09.jpg','/upload/image/20160307/41ecf475-006e-4a53-896f-c6c5f5bd6c59_m.jpg','/upload/image/20160307/41ecf475-006e-4a53-896f-c6c5f5bd6c59_s.jpg',600,600,0,1457403270);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('3d6f05162ae8493da3ea0f0dd9c447ae','solut_e.jpg','/upload/image/20160509/a3d0e951-28b0-4faf-9df8-af35fc97f605.jpg','/open/image/file/3d6f05162ae8493da3ea0f0dd9c447ae.jpg','/upload/image/20160509/a3d0e951-28b0-4faf-9df8-af35fc97f605_m.jpg','/upload/image/20160509/a3d0e951-28b0-4faf-9df8-af35fc97f605_s.jpg',340,140,0,1462782157);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('44ef4c06af124317915e2b8c4d371483','4.jpg','/upload/image/20160307/9ebbd16e-a4ab-42e8-9f81-f4ddb3959a8f.jpg','/open/image/file/44ef4c06af124317915e2b8c4d371483.jpg','/upload/image/20160307/9ebbd16e-a4ab-42e8-9f81-f4ddb3959a8f_m.jpg','/upload/image/20160307/9ebbd16e-a4ab-42e8-9f81-f4ddb3959a8f_s.jpg',800,800,0,1457403550);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('49898d94c8244b5c94534dd3bc3911c9','4.jpg','/upload/image/20160306/78138fab-4ef5-4851-a4c4-74bda1be31e2.jpg','/open/image/file/49898d94c8244b5c94534dd3bc3911c9.jpg','/upload/image/20160306/78138fab-4ef5-4851-a4c4-74bda1be31e2_m.jpg','/upload/image/20160306/78138fab-4ef5-4851-a4c4-74bda1be31e2_s.jpg',350,350,0,1457333832);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('4a799a201c7245c095e6d96f5c967bd8','3.jpg','/upload/image/20160331/0368c028-7785-4115-a4d9-3ab0192a7147.jpg','/open/image/file/4a799a201c7245c095e6d96f5c967bd8.jpg','/upload/image/20160331/0368c028-7785-4115-a4d9-3ab0192a7147_m.jpg','/upload/image/20160331/0368c028-7785-4115-a4d9-3ab0192a7147_s.jpg',3652,3648,0,1459492178);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('52ce1880b3384aec89a854394cb68978','pic_m.jpg','/upload/image/20160119/a1e61e1f-d652-430f-afef-38100cb2dc6b.jpg','/open/image/52ce1880b3384aec89a854394cb68978.jpg',NULL,NULL,180,72,0,1453190985);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('551860e3ef97462ca2f2bc27d1c79533','1.jpg','/upload/image/20160306/64c880b9-b38d-43da-8068-92571c437d59.jpg','/open/image/file/551860e3ef97462ca2f2bc27d1c79533.jpg','/upload/image/20160306/64c880b9-b38d-43da-8068-92571c437d59_m.jpg','/upload/image/20160306/64c880b9-b38d-43da-8068-92571c437d59_s.jpg',350,350,0,1457333832);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('5b3aafbe3aa248ff8f3ddffed6f0960e','solut_b.jpg','/upload/image/20160509/3da3bc93-3ee8-42a2-97a5-79c14049707f.jpg','/open/image/file/5b3aafbe3aa248ff8f3ddffed6f0960e.jpg','/upload/image/20160509/3da3bc93-3ee8-42a2-97a5-79c14049707f_m.jpg','/upload/image/20160509/3da3bc93-3ee8-42a2-97a5-79c14049707f_s.jpg',340,140,0,1462765441);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('5c7e75fc65524649bc35a6cba507b291','1.jpg','/upload/image/20160307/4903a57e-6563-438a-8730-f2ea759e2150.jpg','/open/image/file/5c7e75fc65524649bc35a6cba507b291.jpg','/upload/image/20160307/4903a57e-6563-438a-8730-f2ea759e2150_m.jpg','/upload/image/20160307/4903a57e-6563-438a-8730-f2ea759e2150_s.jpg',400,400,0,1457404968);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('5feaec11631b4a1c82a0cd6c327d1018','solut_a.jpg','/upload/image/20160509/1a1dabe6-b7f2-445c-91d1-9998a6334bb7.jpg','/open/image/file/5feaec11631b4a1c82a0cd6c327d1018.jpg',NULL,NULL,340,140,0,1462765304);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('60d2d6e0b5564f91888efebd3f184218','solut_b.jpg','/upload/image/20160509/c6de586d-e852-43d3-a999-e32925e3b451.jpg','/open/image/file/60d2d6e0b5564f91888efebd3f184218.jpg','/upload/image/20160509/c6de586d-e852-43d3-a999-e32925e3b451_m.jpg','/upload/image/20160509/c6de586d-e852-43d3-a999-e32925e3b451_s.jpg',340,140,0,1462782223);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('64c03356c56a4681b3660c8b0ad1d1ba','1.jpg','/upload/image/20160331/2baafc2d-23c0-4e51-a2ec-3177c18f12fd.jpg','/open/image/file/64c03356c56a4681b3660c8b0ad1d1ba.jpg','/upload/image/20160331/2baafc2d-23c0-4e51-a2ec-3177c18f12fd_m.jpg','/upload/image/20160331/2baafc2d-23c0-4e51-a2ec-3177c18f12fd_s.jpg',3646,3648,0,1459492178);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('699ed33635164f8cb101e787d1d7d774','2.jpg','/upload/image/20160306/5b07be69-4a28-4e6b-b049-b603e5a26ef5.jpg','/open/image/file/699ed33635164f8cb101e787d1d7d774.jpg','/upload/image/20160306/5b07be69-4a28-4e6b-b049-b603e5a26ef5_m.jpg','/upload/image/20160306/5b07be69-4a28-4e6b-b049-b603e5a26ef5_s.jpg',350,350,0,1457333152);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('6cac523104ac4737a7a9ce937b3c09f7','6.jpg','/upload/image/20160306/89e51030-9a06-4bc9-b180-2d7591855939.jpg','/open/image/file/6cac523104ac4737a7a9ce937b3c09f7.jpg','/upload/image/20160306/89e51030-9a06-4bc9-b180-2d7591855939_m.jpg','/upload/image/20160306/89e51030-9a06-4bc9-b180-2d7591855939_s.jpg',800,1200,0,1457333153);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('6f963b00383449ae87e674fdba40be29','201601051454487968.png','/upload/image/20160310/1c20835b-fb13-4a29-a1d6-a6524b42e6bd.png','/open/image/file/6f963b00383449ae87e674fdba40be29.png','/upload/image/20160310/1c20835b-fb13-4a29-a1d6-a6524b42e6bd_m.png','/upload/image/20160310/1c20835b-fb13-4a29-a1d6-a6524b42e6bd_s.png',418,418,0,1457598009);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('7245859fe5e74edd9bfc63043b097eef','3.jpg','/upload/image/20160307/bc3b041b-df43-486e-9af7-6fa067f3a300.jpg','/open/image/file/7245859fe5e74edd9bfc63043b097eef.jpg','/upload/image/20160307/bc3b041b-df43-486e-9af7-6fa067f3a300_m.jpg','/upload/image/20160307/bc3b041b-df43-486e-9af7-6fa067f3a300_s.jpg',600,600,0,1457403758);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('74ca298fc6f64c6ea876212194e78d9b','solut_f.jpg','/upload/image/20160509/d833e9d9-6cfe-4ed6-b965-472addfbc9f2.jpg','/open/image/file/74ca298fc6f64c6ea876212194e78d9b.jpg','/upload/image/20160509/d833e9d9-6cfe-4ed6-b965-472addfbc9f2_m.jpg','/upload/image/20160509/d833e9d9-6cfe-4ed6-b965-472addfbc9f2_s.jpg',340,140,0,1462765589);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('771880c741d24fa1bcc08b986f7844b5','2.jpg','/upload/image/20160307/38198d4c-d48d-48d2-87da-e078cfa7c77c.jpg','/open/image/file/771880c741d24fa1bcc08b986f7844b5.jpg','/upload/image/20160307/38198d4c-d48d-48d2-87da-e078cfa7c77c_m.jpg','/upload/image/20160307/38198d4c-d48d-48d2-87da-e078cfa7c77c_s.jpg',800,800,0,1457403551);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('7871160e5eb14b46a3f5c3db4491e48e','3.jpg','/upload/image/20160307/f0ac123f-bb06-4cc7-8932-f71c0f8e0e97.jpg','/open/image/file/7871160e5eb14b46a3f5c3db4491e48e.jpg','/upload/image/20160307/f0ac123f-bb06-4cc7-8932-f71c0f8e0e97_m.jpg','/upload/image/20160307/f0ac123f-bb06-4cc7-8932-f71c0f8e0e97_s.jpg',500,500,0,1457405268);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('7ae441f3add44b488d50277b8ec23abf','1.jpg','/upload/image/20160307/a5074408-4d77-489c-8bd1-bf20baeb2e48.jpg','/open/image/file/7ae441f3add44b488d50277b8ec23abf.jpg','/upload/image/20160307/a5074408-4d77-489c-8bd1-bf20baeb2e48_m.jpg','/upload/image/20160307/a5074408-4d77-489c-8bd1-bf20baeb2e48_s.jpg',400,400,0,1457404361);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('7d8f312e85d44e47a4729039adc9db16','1.jpg','/upload/image/20160307/2075e0a5-c7ab-4b63-8d80-6418f37242b0.jpg','/open/image/file/7d8f312e85d44e47a4729039adc9db16.jpg','/upload/image/20160307/2075e0a5-c7ab-4b63-8d80-6418f37242b0_m.jpg','/upload/image/20160307/2075e0a5-c7ab-4b63-8d80-6418f37242b0_s.jpg',500,500,0,1457405268);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('8050f2cf794b438d8c62e12c7a1d945a','3.jpg','/upload/image/20160307/42c7660f-dcfc-4b07-8d4b-61a71aa14658.jpg','/open/image/file/8050f2cf794b438d8c62e12c7a1d945a.jpg','/upload/image/20160307/42c7660f-dcfc-4b07-8d4b-61a71aa14658_m.jpg','/upload/image/20160307/42c7660f-dcfc-4b07-8d4b-61a71aa14658_s.jpg',640,640,0,1457405118);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('841edfe99779427b845caabfaea581d2','banner.png','/upload/image/20160517/d57d6303-b78b-457c-8134-b07564390ff6.png','/open/image/file/841edfe99779427b845caabfaea581d2.png','/upload/image/20160517/d57d6303-b78b-457c-8134-b07564390ff6_m.png','/upload/image/20160517/d57d6303-b78b-457c-8134-b07564390ff6_s.png',641,260,0,1463455491);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('854830f165c54850bea26f9e6ac9f26f','20151010092555.jpg','/upload/image/20160310/ef098d4d-aac9-4a44-859a-d05d527b4da1.jpg','/open/image/file/854830f165c54850bea26f9e6ac9f26f.jpg','/upload/image/20160310/ef098d4d-aac9-4a44-859a-d05d527b4da1_m.jpg','/upload/image/20160310/ef098d4d-aac9-4a44-859a-d05d527b4da1_s.jpg',600,600,0,1457598082);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('86c23bacfe2d459d9f54332ffd41714c','solut_a.jpg','/upload/image/20160509/fa0f05fe-7164-4268-84db-b0a749c6380e.jpg','/open/image/file/86c23bacfe2d459d9f54332ffd41714c.jpg','/upload/image/20160509/fa0f05fe-7164-4268-84db-b0a749c6380e_m.jpg','/upload/image/20160509/fa0f05fe-7164-4268-84db-b0a749c6380e_s.jpg',340,140,0,1462782177);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('896723809b9449f481fd2e8ba87eeaf1','2.jpg','/upload/image/20160307/4b615f01-9e6d-46fa-a94d-f3d13c628325.jpg','/open/image/file/896723809b9449f481fd2e8ba87eeaf1.jpg','/upload/image/20160307/4b615f01-9e6d-46fa-a94d-f3d13c628325_m.jpg','/upload/image/20160307/4b615f01-9e6d-46fa-a94d-f3d13c628325_s.jpg',640,640,0,1457405118);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('8eaeb2535ee44f62abfdff085d43322b','adv_2.png','/upload/image/20160620/f8b802c0-911f-4c7f-9603-dab59cdc41ac.png','/open/image/file/8eaeb2535ee44f62abfdff085d43322b.png','/upload/image/20160620/f8b802c0-911f-4c7f-9603-dab59cdc41ac_m.png','/upload/image/20160620/f8b802c0-911f-4c7f-9603-dab59cdc41ac_s.png',720,576,0,1466366045);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('9145518ce21d418db8aef27665cba657','pic_m.jpg','/upload/image/20160119/754ad334-4de5-44ad-98cf-d1fd4fb0648c.jpg','/open/image/file/9145518ce21d418db8aef27665cba657.jpg',NULL,NULL,180,72,0,1453191632);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('a26cfc8100274e9099bf7632f40878bb','1295091_142854791478_2.jpg','/upload/image/20160517/8a1476e2-07ed-437e-a91e-f6448b1119f8.jpg','/open/image/file/a26cfc8100274e9099bf7632f40878bb.jpg','/upload/image/20160517/8a1476e2-07ed-437e-a91e-f6448b1119f8_m.jpg','/upload/image/20160517/8a1476e2-07ed-437e-a91e-f6448b1119f8_s.jpg',1024,640,0,1463478274);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('b0bb22f526dc4a65a005b975a248ba57','61064212.jpg','/upload/image/20160607/51d1fbaa-7801-400b-8662-6f37f6974c9f.jpg','/open/image/file/b0bb22f526dc4a65a005b975a248ba57.jpg','/upload/image/20160607/51d1fbaa-7801-400b-8662-6f37f6974c9f_m.jpg','/upload/image/20160607/51d1fbaa-7801-400b-8662-6f37f6974c9f_s.jpg',1920,1080,0,1465305572);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('b1a0c948eceb402ca54e9c1652164550','OA2-列表页.png','/upload/image/20160519/797d3635-4dda-4ab3-a6e4-427fac7e50ba.png','/open/image/file/b1a0c948eceb402ca54e9c1652164550.png','/upload/image/20160519/797d3635-4dda-4ab3-a6e4-427fac7e50ba_m.png','/upload/image/20160519/797d3635-4dda-4ab3-a6e4-427fac7e50ba_s.png',1024,768,0,1463650658);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('b86f7fda3a584fe6a04b062fb8e109aa','QQ图片20160413164338.png','/upload/image/20160418/8ca3a730-abc2-4635-bb16-1f8d83dcb9be.png','/open/image/file/b86f7fda3a584fe6a04b062fb8e109aa.png','/upload/image/20160418/8ca3a730-abc2-4635-bb16-1f8d83dcb9be_m.png','/upload/image/20160418/8ca3a730-abc2-4635-bb16-1f8d83dcb9be_s.png',608,777,0,1460978444);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('b944cffe7ebd4bc3b1616f3eb1f86a1a','solut_c.jpg','/upload/image/20160509/9f5e6c2c-429a-4afc-9e4a-0b5bee268b41.jpg','/open/image/file/b944cffe7ebd4bc3b1616f3eb1f86a1a.jpg','/upload/image/20160509/9f5e6c2c-429a-4afc-9e4a-0b5bee268b41_m.jpg','/upload/image/20160509/9f5e6c2c-429a-4afc-9e4a-0b5bee268b41_s.jpg',340,140,0,1462765466);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('bb7ed5ffa7e74b5ea5f1d3b88a05956e','solut_d.jpg','/upload/image/20160509/cc7b076c-be4a-4423-90f7-56ef4bd32c77.jpg','/open/image/file/bb7ed5ffa7e74b5ea5f1d3b88a05956e.jpg','/upload/image/20160509/cc7b076c-be4a-4423-90f7-56ef4bd32c77_m.jpg','/upload/image/20160509/cc7b076c-be4a-4423-90f7-56ef4bd32c77_s.jpg',340,140,0,1462782198);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('c0e10c71ecad4b06ace56753f9901a50','adv_2.png','/upload/image/20160620/2f2074fb-1c48-4913-aa58-1317cd6670f8.png','/open/image/file/c0e10c71ecad4b06ace56753f9901a50.png','/upload/image/20160620/2f2074fb-1c48-4913-aa58-1317cd6670f8_m.png','/upload/image/20160620/2f2074fb-1c48-4913-aa58-1317cd6670f8_s.png',720,576,0,1466366054);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('c695921e777a480fb5a4e480b05a613f','/storage/emulated/0/sina/weibo/weibo/img-9f8f9bf6775e36ba7d6d28001f7b4743.jpg','/upload/image/20160624/d97c08e4-713e-4a71-8da0-e60383757e74.jpg','/open/image/file/c695921e777a480fb5a4e480b05a613f.jpg','/upload/image/20160624/d97c08e4-713e-4a71-8da0-e60383757e74_m.jpg','/upload/image/20160624/d97c08e4-713e-4a71-8da0-e60383757e74_s.jpg',2048,1992,0,1466776467);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('c90bc590f6954a4994f991466e6ba9f5','20160413112300.jpg','/upload/image/20160414\\b4288d3b-0910-42d7-934b-3d798a3bc17a.jpg','/open/image/file/c90bc590f6954a4994f991466e6ba9f5.jpg','/upload/image/20160414\\b4288d3b-0910-42d7-934b-3d798a3bc17a_m.jpg','/upload/image/20160414\\b4288d3b-0910-42d7-934b-3d798a3bc17a_s.jpg',640,480,0,1460621756);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('c926ae8f3ed2400d8b19fc888f1f7a35','solut_a.jpg','/upload/image/20160509/7d164121-9afb-4824-b740-6c1e463d3b97.jpg','/open/image/file/c926ae8f3ed2400d8b19fc888f1f7a35.jpg','/upload/image/20160509/7d164121-9afb-4824-b740-6c1e463d3b97_m.jpg','/upload/image/20160509/7d164121-9afb-4824-b740-6c1e463d3b97_s.jpg',340,140,0,1462765391);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('d35de07b0e274632a2dce865968bcbb7','solut_d.jpg','/upload/image/20160509/cb35e67d-3b71-4026-aac9-059b52fd2e9a.jpg','/open/image/file/d35de07b0e274632a2dce865968bcbb7.jpg','/upload/image/20160509/cb35e67d-3b71-4026-aac9-059b52fd2e9a_m.jpg','/upload/image/20160509/cb35e67d-3b71-4026-aac9-059b52fd2e9a_s.jpg',340,140,0,1462765522);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('d43a0d4a9ba9440593346fd1e71fb962','QQ图片20160413164338.png','/upload/image/20160414\\6c41c704-82f0-4a53-85c2-d27c20ff05a2.png','/open/image/file/d43a0d4a9ba9440593346fd1e71fb962.png','/upload/image/20160414\\6c41c704-82f0-4a53-85c2-d27c20ff05a2_m.png','/upload/image/20160414\\6c41c704-82f0-4a53-85c2-d27c20ff05a2_s.png',608,777,0,1460621873);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('d6e7767307764869b8ac1284cb650578','2.jpg','/upload/image/20160331/aacbe499-7519-435a-9669-237cb285822d.jpg','/open/image/file/d6e7767307764869b8ac1284cb650578.jpg','/upload/image/20160331/aacbe499-7519-435a-9669-237cb285822d_m.jpg','/upload/image/20160331/aacbe499-7519-435a-9669-237cb285822d_s.jpg',3652,3648,0,1459492178);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('e7742eb9e093496385ab8cdfd429793d','20160413111630.png','/upload/image/20160414\\4ad6f4d8-0140-449d-ac2f-9fae85b9d5a8.png','/open/image/file/e7742eb9e093496385ab8cdfd429793d.png','/upload/image/20160414\\4ad6f4d8-0140-449d-ac2f-9fae85b9d5a8_m.png','/upload/image/20160414\\4ad6f4d8-0140-449d-ac2f-9fae85b9d5a8_s.png',500,500,0,1460621678);
INSERT INTO `img_image` (`id`,`filename`,`src`,`url`,`m_src`,`s_src`,`width`,`height`,`watermark`,`updatedAt`) VALUES ('eaef3cc8c59e489ab0ab3dfbe02a2007','201601051454487968.png','/upload/image/20160310/ac0259b2-35dc-4230-956f-d4ecd32aa103.png','/open/image/file/eaef3cc8c59e489ab0ab3dfbe02a2007.png','/upload/image/20160310/ac0259b2-35dc-4230-956f-d4ecd32aa103_m.png','/upload/image/20160310/ac0259b2-35dc-4230-956f-d4ecd32aa103_s.png',418,418,0,1457598085);


INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (1,'system.AppName','CMS',NULL);
INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (2,'system.AppDomain','www.wizzer.cn',NULL);
INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (3,'system.AppShrotName','CMS',NULL);
INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (4,'system.AppCopyright','Wizzer.cn',NULL);
INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (5,'system.AppIp','127.0.0.1',1458703898);
INSERT INTO `sys_config` (`id`,`config_key`,`config_val`,`createdAt`) VALUES (6,'1','1',1464230029);

INSERT INTO `sys_ip` (`id`,`ip`,`disabled`,`createdBy`,`createdAt`) VALUES (1,'127.0.0.1',1,1,1463462173);

INSERT INTO `sys_job` (`id`,`name`,`cron`,`note`,`disabled`,`updateTxt`,`updateStatus`,`updateAt`) VALUES (1,'backupDb','10 2 * * *','数据库备份',1,'',1,1463508600);


INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (1,0,'0001','系统',NULL,'',NULL,'','system',0,0,1,3,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (2,1,'00010001','系统管理',NULL,'',NULL,'ti-settings','system:sys',0,0,1,9,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (3,2,'000100010001','单位管理',NULL,'/private/sys/unit','data-pjax','','system:sys:unit',0,0,0,13,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (4,2,'000100010002','用户管理',NULL,'/private/sys/user','data-pjax','','system:sys:user',0,0,0,14,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (5,2,'000100010003','角色管理',NULL,'/private/sys/role','data-pjax','','system:sys:role',0,0,0,15,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (6,2,'000100010004','菜单管理',NULL,'/private/sys/menu','data-pjax','','system:sys:menu',0,0,0,16,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (9,1,'00010003','系统安全',NULL,'',NULL,'ti-user','system:safe',0,0,1,10,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (10,9,'000100030001','登录日志',NULL,'/private/sys/log','','','system:safe:log',0,0,0,22,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (44,0,'0006','CMS',NULL,'','','','site',0,0,1,1,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (45,44,'00060001','站点管理',NULL,'','','ti-world','site:manage',0,0,1,1,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (47,45,'000600010002','站点配置',NULL,'/private/cms/site','data-pjax','','site:manage:setting',0,0,0,1,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (48,44,'00060002','内容管理',NULL,'','','ti-pencil-alt','site:cms',0,0,1,2,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (49,48,'000600020001','栏目管理',NULL,'/private/cms/channel','data-pjax','','site:cms:channel',0,0,0,2,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (50,48,'000600020002','文章管理',NULL,'/private/cms/article','data-pjax','','site:cms:article',0,0,0,3,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (51,44,'00060003','广告链接',NULL,'','','ti-link','site:link',0,0,1,3,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (52,51,'000600030001','链接管理',NULL,'/private/cms/link','data-pjax','','site:link:list',0,0,0,11,1,NULL);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (53,0,'0007','微信',NULL,'',NULL,'','weixin',0,0,1,2,1,1445825925);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (54,53,'00070001','微信配置',NULL,'',NULL,'fa fa-weixin','weixin:manage',0,0,1,8,1,1445826142);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (55,54,'000700010001','帐号配置',NULL,'/private/wx/config','data-pjax','','weixin:manage:config',0,0,0,8,1,1445826178);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (56,54,'000700010002','菜单配置',NULL,'/private/wx/menu','data-pjax','','weixin:manage:menu',0,0,0,9,1,1445830074);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (57,53,'00070002','消息管理',NULL,'','','ti-pencil-alt','weixin:msg',0,0,1,6,1,1445843697);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (58,57,'000700020001','会员消息',NULL,'/private/wx/msg/user','data-pjax','','weixin:msg:user',0,0,0,4,1,1445843720);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (59,57,'000700020002','群发消息',NULL,'/private/wx/msg/mass','data-pjax','','weixin:msg:mass',0,0,0,5,1,1445843889);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (60,53,'00070003','自动回复',NULL,'',NULL,'ti-back-left','weixin:reply',0,0,1,7,1,1445929792);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (61,60,'000700030001','关注自动回复',NULL,'/private/wx/reply?type=follow','data-pjax','','weixin:reply:follow',0,0,0,17,1,1445929848);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (62,60,'000700030002','关键词回复',NULL,'/private/wx/reply?type=keyword','data-pjax','','weixin:reply:keyword',0,0,0,18,1,1445929868);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (63,51,'000600030002','链接分类',NULL,'/private/cms/linkclass','data-pjax','','site:link:class',0,0,0,10,1,1446788018);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (68,53,'00070005','微信会员',NULL,'','data-pjax','fa fa-user','weixin:user',0,0,1,5,1,1451986421);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (69,68,'000700050001','会员列表',NULL,'/private/wx/user','data-pjax','','weixin:user:list',0,0,0,6,1,1451986453);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (91,2,'000100010005','系统参数',NULL,'/private/sys/conf','data-pjax','','system:sys:conf',0,0,0,12,1,1458703756);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (92,44,'00060004','图片管理',NULL,'','','ti-image','site:img',0,0,1,4,1,1460621384);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (93,92,'000600040001','图片配置',NULL,'/private/conf/img','data-pjax','','site:img:conf',0,0,0,7,1,1460621591);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (94,9,'000100030002','数据备份',NULL,'/private/sys/backup','data-pjax','','system:safe:backup',0,0,0,19,1,1461309293);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (95,9,'000100030003','访问控制',NULL,'/private/sys/ip','data-pjax','','system:safe:ip',0,0,0,21,1,1461309336);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (96,9,'000100030004','定时任务',NULL,'/private/sys/job','data-pjax','','system:safe:job',0,0,0,20,1,1461309358);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (101,60,'000700030003','文字内容',NULL,'/private/wx/txt','data-pjax','','weixin:reply:txt',0,0,0,0,1,1463452045);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (102,60,'000700030004','图文内容',NULL,'/private/wx/news','data-pjax','','\tweixin:reply:news',0,0,0,0,1,1463452065);
INSERT INTO `sys_menu` (`id`,`parentId`,`path`,`name`,`type`,`url`,`target`,`icon`,`permission`,`hidden`,`disabled`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (103,44,'00060005','呵呵',NULL,'sys/dfd','sdf','','1',0,0,0,0,1,1466647252);

INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (290,1,20);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (291,2,20);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (292,9,20);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (437,60,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (438,53,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (439,68,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (440,69,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (444,57,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (445,58,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (446,59,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (447,61,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (448,62,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (449,54,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (450,55,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (451,56,19);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (784,92,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (785,44,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (786,45,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (787,47,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (788,48,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (789,49,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (790,50,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (791,51,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (792,63,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (793,52,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (794,93,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (795,59,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (796,60,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (797,53,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (798,68,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (799,69,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (800,57,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (801,58,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (802,102,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (803,61,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (804,101,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (805,62,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (806,91,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (807,3,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (808,4,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (809,5,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (810,54,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (811,55,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (812,56,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (813,1,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (814,2,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (815,6,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (816,9,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (817,94,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (818,96,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (819,95,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (820,10,2);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (821,1,3);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (822,9,3);
INSERT INTO `sys_menu_roles__sys_role_menus` (`id`,`sys_menu_roles`,`sys_role_menus`) VALUES (823,2,3);

INSERT INTO `sys_role` (`id`,`unitid`,`name`,`code`,`disabled`,`location`,`createdBy`,`createdAt`) VALUES (1,0,'公共角色','public',0,1,1,NULL);
INSERT INTO `sys_role` (`id`,`unitid`,`name`,`code`,`disabled`,`location`,`createdBy`,`createdAt`) VALUES (2,0,'系统管理','sysadmin',0,2,1,NULL);

INSERT INTO `sys_role_users__sys_user_roles` (`id`,`sys_role_users`,`sys_user_roles`) VALUES (10,2,10);
INSERT INTO `sys_role_users__sys_user_roles` (`id`,`sys_role_users`,`sys_user_roles`) VALUES (28,2,1);
INSERT INTO `sys_role_users__sys_user_roles` (`id`,`sys_role_users`,`sys_user_roles`) VALUES (32,1,1);
INSERT INTO `sys_role_users__sys_user_roles` (`id`,`sys_role_users`,`sys_user_roles`) VALUES (33,3,3);

INSERT INTO `sys_unit` (`id`,`parentId`,`path`,`name`,`description`,`address`,`mobile`,`tel`,`hasChildren`,`location`,`createdBy`,`createdAt`) VALUES (1,0,'0001','系统管理','请勿删除','安徽省合肥市蜀山区','','',1,1,1,1442391167);

INSERT INTO `sys_user` (`id`,`loginname`,`nickname`,`email`,`password`,`disabled`,`online`,`lastIp`,`loginAt`,`loginCount`,`loginTheme`,`loginSidebar`,`loginScroll`,`loginBoxed`,`customMenus`,`createdBy`,`createdAt`,`unitid`) VALUES (1,'superadmin','超级管理员','wizzer@qq.com','w308aa01db0f163e8f0eb82df40590e2',0,1,'114.97.199.10',1466897773,998,'palette.2.css',1,0,0,'[\"69\",\"58\",\"59\",\"101\",\"102\"]',1,1452828989,1);





INSERT INTO `wx_reply` (`id`,`type`,`msgtype`,`keyword`,`content`,`createdBy`,`createdAt`,`wxid`) VALUES (9,'keyword','txt','MENU_CLICK_1','4',1,1446106371,2);

INSERT INTO `wx_txt` (`id`,`title`,`content`,`createdBy`,`createdAt`) VALUES (4,'关注自动回复','Node.js Test...',1,1446020591);

INSERT INTO `wx_user` (`id`,`openid`,`unionid`,`nickname`,`subscribe`,`sex`,`city`,`province`,`country`,`headimgurl`,`createdAt`,`wxid`) VALUES (49,'oFTcHj6Mz7YNtl1BGt3YgsqsdIsc',NULL,'Wizzer',1,1,'合肥','安徽','中国','http://wx.qlogo.cn/mmopen/PiajxSqBRaELnuBaNQyQqyG4P96pepKUnN69HxsK9x4BdufWEJmbGoMYLI2icibiaViaTdpV0yfgIicQC4vKLjO9FRZQ/0',1459845051,2);