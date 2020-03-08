const localeDomains = require('~~/config/locale-domains')

export const state = () => ({
  localeDomains,
})

export const getters = {
  isLoggedIn(state) {
    return state.auth.loggedIn
  },

  user(state) {
    return state.auth.user
  },
}
