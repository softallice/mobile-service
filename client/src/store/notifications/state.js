import firebase from 'firebase/app'
import { LocalStorage } from "quasar";

// console.log('state------')

export default function() {
  return {
    loading: false,
    pushToken: LocalStorage.getItem('pushToken'),
    available: firebase.messaging.isSupported(),
    newNotification: '',
    count: {
      notifications: 0,
      messages: 0,
      total: 0
    }
  };
}