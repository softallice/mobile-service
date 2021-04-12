import { colors } from 'quasar'
const { setBrand } = colors

export function activeTheme (state) {
  let activeTheme = {}

  for (const KEY in state.themes) {
    if (state.themes[KEY].isActive) {
      activeTheme = state.themes[KEY]
    }
  }

  setBrand('primary', activeTheme.primary)
  setBrand('secondary', activeTheme.secondary)
  setBrand('dark', activeTheme.dark)
  setBrand('info', activeTheme.info)

  return activeTheme
}

export function themes (state) {
  let filteredThemes = {}

  for (const KEY in state.themes) {
    if (!state.themes[KEY].isActive) {
      filteredThemes[KEY] = state.themes[KEY]
    }
  }

  return filteredThemes
}
