importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBnU3j-MZkbIAFyOodVhcMzthFbruuDUlI",
    authDomain: "framework-quasar.firebaseapp.com",
    projectId: "framework-quasar",
    storageBucket: "framework-quasar.appspot.com",
    messagingSenderId: "586541369428",
    appId: "1:586541369428:web:e37c0836d4833acdb005c1",
    measurementId: "G-L4YS6V292Q"
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationData = payload.data
  if (notificationData.type !== 'notification') return
  const notificationTitle = notificationData.title
  const notificationOptions = JSON.parse(notificationData.notificationPayload)

  if (navigator.setAppBadge) {
    navigator.setAppBadge(notificationData.notificationCount.messages + notificationData.notificationCount.notifications)
  }
  return self.registration.showNotification(notificationTitle, notificationOptions)
})
