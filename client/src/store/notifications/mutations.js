export function setLoading(state, payload) {
    state.loading = payload
  }
  
export function setToken (state, payload) {
state.pushToken = payload
if (payload === null) {
    localStorage.removeItem('pushToken')
} else {
    localStorage.setItem('pushToken', payload)
}
}

export function setCount (state, payload) {
    console.log(payload)
    state.count = {
        notifications: payload.notifications,
        messages: payload.messages,
        total: payload.notifications + payload.messages
    }

    if (navigator.setAppBadge) {
        navigator.setAppBadge(state.count.total)
    }
}

export function setRead (state, payload) {
    console.log(payload)
    if ( payload.readNotification === 'new') {
        state.newNotification = 'new'
    } else {
        state.newNotification = ''
    }
    
}
