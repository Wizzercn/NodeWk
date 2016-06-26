/**
 * 发送EMAIL服务
 * Created by wizzer on 2015/9/6.
 */
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
module.exports = {
  sendEmail: function (options) {
    /**
     * 建立SMTP连接
     */
    var transporter= nodemailer.createTransport(smtpTransport({
      host: sails.config.email.HostName,
      secure: sails.config.email.SSLOnConnect,
      port: sails.config.email.SmtpPort,
      connectionTimeout:30*1000,
      auth: {
        user: sails.config.email.UserName,
        pass: sails.config.email.Password
      }
    }));
    var mailOptions = {
      from:sails.config.email.UserName,
      to: options.email, // 收件列表
      subject: options.title, // 标题
      html: options.html // html 内容
    };
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: ok");//response.message
      }
      transporter.close(); // 如果没用，关闭连接池
    });
  }
};
