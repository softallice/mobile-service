import firebase from 'firebase/app'
import '@firebase/messaging'
// import 'firebase/messaging'
import config from '../store/firebaseConfig'


const firebaseConfig = config.config


firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
messaging.onMessage(function (payload) {
    const title = 'Title';
    const options = {
        body: payload.data.message,
    };
    const notification = new Notification(title, options);
    return notification;
})

export { messaging }
