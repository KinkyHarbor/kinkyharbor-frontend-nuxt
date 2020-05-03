export const state = () => ({
  notifications: [],
})

export const mutations = {
  set_notifications(state, notifications) {
    state.notifications = notifications
  },

  set_read(state, { id, isRead }) {
    state.notifications = state.notifications.map((notif) => {
      if (notif.id === id) {
        notif.is_read = isRead
        return notif
      }
      return notif
    })
  },
}

export const actions = {
  async GET_RECENT({ commit }) {
    const data = await this.$axios.$get('/notifications/')
    commit('set_notifications', data)
  },

  async SET_READ({ commit }, { id, isRead }) {
    await this.$axios.$post('/notifications/mark-as-read/', {
      notification_ids: [id],
      unread: !isRead,
    })
    commit('set_read', { id, isRead })
  },
}
