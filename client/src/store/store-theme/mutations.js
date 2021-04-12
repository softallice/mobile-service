export function changeTheme (state, payload) {
  for (const [key, value] of Object.entries(state.themes)) {
    state.themes[key].isActive = false
  }
  Object.assign(state.themes[payload.key], payload.updates)
}
