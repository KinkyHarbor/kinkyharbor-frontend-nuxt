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
          :to="localePath(item.to)"
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
          <v-list-item :to="localePath('/about')" router exact>
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('About') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :to="localePath('/transparency')" router exact>
            <v-list-item-icon>
              <v-icon>mdi-magnify-scan</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('Transparency') }}</v-list-item-title>
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

      <nuxt-link :to="localePath(homeLink)" class="hidden-sm-and-up">
        <v-btn icon>
          <v-icon large>mdi-anchor</v-icon>
        </v-btn>
      </nuxt-link>

      <v-toolbar-title>
        <nuxt-link :to="localePath(homeLink)" class="hidden-xs-only">
          <v-btn text large>
            <v-icon large left>mdi-anchor</v-icon>
            {{ title }}
          </v-btn>
        </nuxt-link>
      </v-toolbar-title>

      <nuxt-link
        v-if="!loggedIn"
        :to="localePath('/about')"
        class="hidden-sm-and-down"
      >
        <v-btn text large>{{ $t('About') }}</v-btn>
      </nuxt-link>

      <nuxt-link
        v-if="!loggedIn"
        :to="localePath('/transparency')"
        class="hidden-sm-and-down"
      >
        <v-btn text large>{{ $t('Transparency') }}</v-btn>
      </nuxt-link>

      <v-spacer />

      <nuxt-link v-if="!loggedIn" :to="localePath('/login')">
        <v-btn text large>{{ $t('Login') }}</v-btn>
      </nuxt-link>

      <nuxt-link v-if="!loggedIn" :to="localePath('/register')">
        <v-btn text large>{{ $t('Register') }}</v-btn>
      </nuxt-link>

      <v-btn v-if="loggedIn" icon nuxt :to="localePath('/profile/me')">
        <v-icon :large="$vuetify.breakpoint.xsOnly">mdi-account-circle</v-icon>
      </v-btn>

      <v-btn v-if="loggedIn" icon @click="searchMode = !searchMode">
        <v-icon :large="$vuetify.breakpoint.xsOnly">mdi-magnify</v-icon>
      </v-btn>

      <v-menu v-if="loggedIn" :transition="false">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon :large="$vuetify.breakpoint.xsOnly">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="localePath('/settings')" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-tune</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('Settings') }}</v-list-item-title>
          </v-list-item>

          <v-list-item :to="localePath('/logout')" nuxt>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('Logout') }}</v-list-item-title>
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
        @click:prepend.stop="closeSearchMode"
        @click:append-outer="openSearchPage"
        @keydown.esc="closeSearchMode"
        @keydown.enter="openSearchPage"
      ></v-text-field>
      <v-spacer class="hidden-xs-only" />
    </v-app-bar>

    <v-content>
      <v-container v-if="demoMode">
        <v-alert type="warning" dismissible>
          {{ $t('demo.warning') }}
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
          title: this.$t('Home'),
          to: '/',
          public: true,
        },
        {
          icon: 'mdi-information-outline',
          title: this.$t('About'),
          to: '/about',
          public: true,
        },
        {
          icon: 'mdi-magnify-scan',
          title: this.$t('Transparency'),
          to: '/transparency',
          public: true,
        },
        {
          icon: 'mdi-format-list-bulleted-square',
          title: this.$t('Feed'),
          to: '/feed',
          private: true,
        },
        {
          icon: 'mdi-account-group',
          title: this.$t('Groups'),
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
      this.closeSearchMode()
      this.$router.push(
        this.localePath({
          path: '/search',
          query: { q: searchQuery },
        })
      )
    },

    closeSearchMode() {
      this.searchMode = false
      this.searchQuery = ''
    },
  },

  head() {
    return this.$nuxtI18nSeo()
  },
}
</script>
