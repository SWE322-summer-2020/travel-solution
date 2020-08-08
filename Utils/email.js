const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text"); // have to install later

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `Travel Solution <${process.env.EMAIL}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid", // CREATE SENDGRID ACCOUNT later
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    let html = pug.renderFile(`${__dirname}/../Views/emails/${template}.pug`, {
      url: this.url,
      subject,
    });

    const mailOptions = {
      to: this.to,
      from: this.from,
      html,
      subject,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async verifyEmailAddress() {
    await this.send(
      "verificationEmail",
      "Travel Solution account verification"
    );
  }
  async passwordReset() {
    await this.send("passwordReset", "Your password reset token");
  }
};
