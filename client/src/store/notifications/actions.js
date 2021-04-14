
//https://github.com/Phuks-co/throat-pwa/blob/625955c00a31b3785369c090548ef00b805ba9ea/src/store/modules/notifications.ts
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyBnU3j-MZkbIAFyOodVhcMzthFbruuDUlI",
  authDomain: "framework-quasar.firebaseapp.com",
  projectId: "framework-quasar",
  storageBucket: "framework-quasar.appspot.com",
  messagingSenderId: "586541369428",
  appId: "1:586541369428:web:e37c0836d4833acdb005c1",
  measurementId: "G-L4YS6V292Q"
}


firebase.initializeApp(firebaseConfig)

// navigator.serviceWorker.addEventListener('message', event => {
//   console.log('Push Notification Recieved', event.data) // refresh code goes here  
// });


// return messaging.getToken({ vapidKey: "BCyOnHzMBmyO7eRcYN7BbHMCIAM66PIoc0n6mqipfCfqK9L2-LgpJ5kE3liFWZrQK0Gm_K6WueeicsyNxh4jRCs" })
// console.log('action------');

export function getToken () {
  
  const messaging = firebase.messaging()
  // return messaging.getToken({ vapidKey: process.env.FCM_PUBKEY })
  return messaging.getToken({ vapidKey: "BCyOnHzMBmyO7eRcYN7BbHMCIAM66PIoc0n6mqipfCfqK9L2-LgpJ5kE3liFWZrQK0Gm_K6WueeicsyNxh4jRCs" })
    .then((currentToken) => {
      if (!currentToken) {
        return Promise.reject('Could not fetch token')
      }
      console.log('currentToken', currentToken)
      // return Promise.resolve(currentToken)
      return Promise.resolve(currentToken)
    })
}

export function disableNotifications ({ commit }) {
  const messaging = firebase.messaging()
  commit('setLoading', true)
  return messaging.deleteToken()
    .finally(() => {
      commit('setToken', null)
      commit('setLoading', false)
    })
}

export function enableNotifications ({ commit, dispatch }) {
  console.log('enableNotifications commit -------------------')
  commit('setLoading', true)
  enableNotifications ({ commit, dispatch }) {
    commit('setLoading', true)
    return Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        return dispatch('getToken').then((token) => {
          axios.post(process.env.API_URI + 'push', { token: token })
            .then(() => {
              commit('setToken', token)
              return Promise.resolve(true)
            }).finally(() => commit('setLoading', false))
        }).catch((e) => {
          console.log(e)
          commit('setLoading', false)
          return Promise.reject(e)
        })
      } else {
        console.log('Unable to get permission to notify.')
        commit('setLoading', false)
        return Promise.reject('Unable to get notification permission')
      }
    })
  },

export function setNotificationCount ({ commit }, payload) {
  commit('setCount', payload)
}