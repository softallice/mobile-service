const users = require('./users/users.service.js');
const account = require('./account/account.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const messages = require('./messages/messages.service.js');
const notifications = require('./notifications/notifications.service.js');
const push = require('./push/push.service.js');
const subscription = require('./subscription/subscription.service.js');
const consent = require('./consent/consent.service.js');
const fbpush = require('./fbpush/fbpush.service.js');
const qrauth = require('./qrauth/qrauth.service.js');
const uploads = require('./uploads/uploads.service.js');
const fileReference = require('./file-reference/file-reference.service.js');
const blogEntry = require('./blog-entry/blog-entry.service.js');

const board = require('./board/board.service.js');

const comment = require('./comment/comment.service.js');

const notice = require('./notice/notice.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(account);
  app.configure(email);
  app.configure(authManagement);
  app.configure(messages);
  app.configure(notifications);
  app.configure(push);
  app.configure(subscription);
  app.configure(consent);
  app.configure(fbpush);
  app.configure(qrauth);
  app.configure(uploads);
  app.configure(fileReference);
  app.configure(blogEntry);
  app.configure(board);
  app.configure(comment);
  app.configure(notice);
};
