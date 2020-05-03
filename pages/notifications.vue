<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <h1>{{ $t('Notifications') }}</h1>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <v-list two-line>
          <v-list-item
            v-for="notif in notifications"
            :key="notif.id"
            @click="goToNotification(notif)"
          >
            <v-list-item-avatar>
              <v-avatar>
                <img src="https://i.pravatar.cc/64" />
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content
              :class="{ 'font-weight-bold': !notif.is_read }"
            >
              <v-list-item-title v-text="notif.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="notif.description"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click.stop="setRead(notif.id, !notif.is_read)"
                  >
                    <v-icon v-if="!notif.is_read" color="grey lighten-1">
                      mdi-circle
                    </v-icon>
                    <v-icon v-else color="grey lighten-1">
                      mdi-circle-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span v-if="!notif.is_read">Mark as read</span>
                <span v-else>Mark as unread</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store, query }) {
    await store.dispatch('notifications/GET_RECENT')
  },

  computed: {
    ...mapState('notifications', ['notifications']),
  },

  methods: {
    async setRead(notifID, isRead) {
      await this.$store.dispatch('notifications/SET_READ', {
        id: notifID,
        isRead,
      })
    },

    async goToNotification(notif) {
      if (!notif.is_read) {
        await this.setRead(notif.id, true)
      }

      this.$router.push(notif.link)
    },
  },

  head() {
    return { title: this.$t('Notifications') }
  },
}
</script>
