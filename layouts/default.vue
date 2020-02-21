<template>
  <v-app dark>
    <v-navigation-drawer v-if="loggedIn" v-model="drawer" app clipped>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon v-if="loggedIn" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link :to="loggedIn ? '/feed' : '/'">
          <v-btn text large>
            <v-icon left large>mdi-anchor</v-icon> {{ title }}
          </v-btn>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <nuxt-link v-if="!loggedIn" to="/login">
        <v-btn text>Login</v-btn>
      </nuxt-link>
      <nuxt-link v-if="!loggedIn" to="/register">
        <v-btn text>Register</v-btn>
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-format-list-bulleted-square',
          title: 'Feed',
          to: '/feed'
        },
        {
          icon: 'mdi-account-group',
          title: 'Groups',
          to: '/groups'
        }
      ],
      title: 'Harbor'
    }
  },

  computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
