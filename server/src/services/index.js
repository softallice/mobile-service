const users = require('./users/users.service.js');
const account = require('./account/account.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const messages = require('./messages/messages.service.js');
const notifications = require('./notifications/notifications.service.js');
const push = require('./push/push.service.js');
const subscription = require('./subscription/subscription.service.js');
const consent = require('./consent/consent.service.js');
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
};
