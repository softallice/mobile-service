const webpush = require('web-push')

const triggerPushMsg = function(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend)
  .then(response=>{
      console.log ( 'msg sent' , response )
    })
  .catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      throw err;
    }
  });
};

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    context.app.service('notifications').get(context.data.notification).then(result=>{
      return result
    }).then(notification=>{
      const dataToSend = {
        "notification" : {
          "title" : notification.title,
          "body"  : notification.body,
          "image"  : notification.image ? notification.image : '', //context.app.settings.image ,
          "icon"  : '', // context.app.settings.logo,
          "data" : notification.url ? { "url" : notification.url } : ''
        }
      }
      const vapidKeys = {
        subject: context.app.settings.vapid.subject,
        publicKey: context.app.settings.vapid.publicKey,
        privateKey: context.app.settings.vapid.privateKey
      };
      // webpush.setGCMAPIKey('<Your GCM API Key Here>');
      webpush.setVapidDetails(
        vapidKeys.subject,
        vapidKeys.publicKey,
        vapidKeys.privateKey
      );
      // console.log('setVapidDetails')
      context.app.service('subscription').find().then(result=>{
        let promiseChain = Promise.resolve(result);
        for (let i = 0; i < result.data.length; i++) {
          const subscription = result.data[i];
          promiseChain = promiseChain.then(() => {
            return triggerPushMsg(subscription, JSON.stringify(dataToSend));
          });
        }
        return promiseChain;
      })

    })
    return context;
  };
};