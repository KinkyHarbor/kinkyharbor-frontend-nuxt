<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :disable-resize-watcher="!loggedIn"
      app
      clipped
      mobile-break-point="960"
      :permanent="loggedIn && $vuetify.breakpoint.mdAndUp"
      :expand-on-hover="$vuetify.breakpoint.mdAndUp"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          :class="item.classes"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list v-if="loggedIn">
          <v-list-item to="/about" router exact>
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/transparency" router exact>
            <v-list-item-icon>
              <v-icon>mdi-magnify-scan</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Transparency</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar v-if="!searchMode" app clipped-left>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />

      <nuxt-link :to="homeLink" class="hidden-sm-and-up">
        <v-btn icon>
          <v-icon large>mdi-anchor</v-icon>
        </v-btn>
      </nuxt-link>

      <v-toolbar-title>
        <nuxt-link :to="homeLink" class="hidden-xs-only">
          <v-btn text large>
            <v-icon large left>mdi-anchor</v-icon>
            {{ title }}
          </v-btn>
        </nuxt-link>
      </v-toolbar-title>

      <nuxt-link v-if="!loggedIn" to="/about" class="hidden-sm-and-down">
        <v-btn text large>About</v-btn>
      </nuxt-link>

      <nuxt-link v-if="!loggedIn" to="/transparency" class="hidden-sm-and-down">
        <v-btn text large>Transparency</v-btn>
      </nuxt-link>

      <v-spacer />

      <nuxt-link v-if="!loggedIn" to="/login">
        <v-btn text large>Login</v-btn>
      </nuxt-link>

      <nuxt-link v-if="!loggedIn" to="/register">
        <v-btn text large>Register</v-btn>
      </nuxt-link>

      <v-btn v-if="loggedIn" icon nuxt to="/profile">
        <v-icon :large="$vuetify.breakpoint.xsOnly">mdi-account-circle</v-icon>
      </v-btn>

      <v-btn v-if="loggedIn" icon @click="searchMode = !searchMode">
        <v-icon :large="$vuetify.breakpoint.xsOnly">mdi-magnify</v-icon>
      </v-btn>

      <v-menu v-if="loggedIn" :transition="false">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon :large="$vuetify.breakpoint.xsOnly"
              >mdi-dots-vertical</v-icon
            >
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/settings" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-tune</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-list-item to="/logout" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-app-bar v-if="searchMode" app clipped-left>
      <v-spacer class="hidden-xs-only" />
      <v-text-field
        v-model="searchQuery"
        hide-details
        prepend-icon="mdi-close"
        append-outer-icon="mdi-magnify"
        single-line
        autofocus
        @click:prepend.stop="closeSearch"
        @click:append-outer="openSearchPage"
        @keydown.esc="closeSearch"
        @keydown.enter="openSearchPage"
      ></v-text-field>
      <v-spacer class="hidden-xs-only" />
    </v-app-bar>

    <v-content>
      <v-container v-if="demoMode">
        <v-alert type="warning" dismissible>
          This is a demo instance. Don't use any private information. Database
          might be wiped as we see fit.
        </v-alert>
      </v-container>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      demoMode: process.env.demoMode,
      searchMode: false,
      searchQuery: '',
      drawer: Boolean(this.loggedIn),
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
          public: true,
        },
        {
          icon: 'mdi-information-outline',
          title: 'About',
          to: '/about',
          public: true,
        },
        {
          icon: 'mdi-magnify-scan',
          title: 'Transparency',
          to: '/transparency',
          public: true,
        },
        {
          icon: 'mdi-format-list-bulleted-square',
          title: 'Feed',
          to: '/feed',
          private: true,
        },
        {
          icon: 'mdi-account-group',
          title: 'Groups',
          to: '/groups',
          private: true,
        },
      ],
      title: 'Harbor',
    }
  },

  computed: {
    homeLink() {
      return this.loggedIn ? '/feed' : '/'
    },

    navItems() {
      return this.items.filter((i) => {
        return (i.private && this.loggedIn) || (i.public && !this.loggedIn)
      })
    },

    ...mapState('auth', ['loggedIn', 'user']),
  },

  watch: {
    loggedIn(loggedIn) {
      if (!loggedIn) {
        // Force close drawer on logout
        this.drawer = false
      }
    },
  },

  methods: {
    openSearchPage() {
      const searchQuery = this.searchQuery
      this.closeSearch()
      this.$router.push({ path: '/search', query: { q: searchQuery } })
    },

    closeSearch() {
      this.searchMode = false
      this.searchQuery = ''
    },
  },
}
</script>
