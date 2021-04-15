
//https://github.com/Phuks-co/throat-pwa/blob/625955c00a31b3785369c090548ef00b805ba9ea/src/store/modules/notifications.ts
import firebase from 'firebase/app'
import 'firebase/messaging'
import config from '../firebaseConfig'
import axiosInstance from "../../boot/axios";
// const firebaseConfig = config.config

// // console.log(firebaseConfig)

// // firebase.initializeApp(firebaseConfig)

export function getToken () {
  
  const messaging = firebase.messaging()
  // return messaging.getToken({ vapidKey: process.env.FCM_PUBKEY })
  return messaging.getToken({ vapidKey: config.fcmPubKey })
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
  commit('setLoading', true)
  return Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      return dispatch('getToken').then((token) => {
        axiosInstance.post('/fbpush', { token: token })
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
}

export function setNotificationCount ({ commit }, payload) {
  commit('setCount', payload)
}

export function setNotificationRead ({ commit }, payload) {
  commit('setRead', payload)
}