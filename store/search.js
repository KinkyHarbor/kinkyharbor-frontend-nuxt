export const state = () => ({
  users: [],
  groups: [],
  pages: [],
  events: [],
})

export const mutations = {
  set_users(state, users) {
    state.users = users
  },
  set_groups(state, groups) {
    state.groups = groups
  },
  set_pages(state, pages) {
    state.pages = pages
  },
  set_events(state, events) {
    state.events = events
  },
}

export const actions = {
  async GET_ALL({ commit }, searchQuery) {
    const data = await this.$axios.$get('/search/', {
      params: {
        q: searchQuery,
      },
    })

    commit('set_users', data.users)
    commit('set_groups', data.groups)
    commit('set_pages', data.pages)
    commit('set_events', data.events)
  },
}
