<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model.lazy="searchQuery"
          hide-details
          append-outer-icon="mdi-magnify"
          single-line
          @keypress.enter.stop="newSearch"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tabs v-model="searchTab" centered show-arrows>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-all">
            <v-icon left>mdi-anchor</v-icon>
            {{ $t('All') }}
          </v-tab>

          <v-tab href="#tab-people">
            <v-icon>mdi-account</v-icon>
            {{ $t('People') }}
          </v-tab>

          <v-tab href="#tab-groups">
            <v-icon>mdi-account-multiple</v-icon>
            {{ $t('Groups') }}
          </v-tab>

          <v-tab href="#tab-pages">
            <v-icon>mdi-book</v-icon>
            {{ $t('Pages') }}
          </v-tab>

          <v-tab href="#tab-events">
            <v-icon>mdi-calendar</v-icon>
            {{ $t('Events') }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="searchTab">
          <v-tab-item value="tab-all">
            <v-row>
              <v-col cols="12" sm="6">
                <v-list subheader>
                  <v-subheader>{{ $t('People') }}</v-subheader>

                  <v-list-item
                    v-for="user in users"
                    :key="user.id"
                    :to="localePath('/profile/' + user.username + '/')"
                    nuxt
                  >
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="user.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list subheader>
                  <v-subheader>{{ $t('Groups') }}</v-subheader>

                  <v-list-item v-for="group in groups" :key="group.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="group.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-list subheader>
                  <v-subheader>{{ $t('Pages') }}</v-subheader>

                  <v-list-item v-for="page in pages" :key="page.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="page.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list subheader>
                  <v-subheader>{{ $t('Events') }}</v-subheader>

                  <v-list-item v-for="event in events" :key="event.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item value="tab-people">
            <v-row>
              <v-col cols="12">
                <v-list subheader>
                  <v-subheader>{{ $t('People') }}</v-subheader>

                  <v-list-item
                    v-for="user in users"
                    :key="user.id"
                    :to="localePath('/profile/' + user.username + '/')"
                    nuxt
                  >
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="user.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item value="tab-groups">
            <v-row>
              <v-col cols="12">
                <v-list subheader>
                  <v-subheader>{{ $t('Groups') }}</v-subheader>

                  <v-list-item v-for="group in groups" :key="group.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="group.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item value="tab-pages">
            <v-row>
              <v-col cols="12">
                <v-list subheader>
                  <v-subheader>{{ $t('Pages') }}</v-subheader>

                  <v-list-item v-for="page in pages" :key="page.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="page.display_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab-item value="tab-events">
            <v-row>
              <v-col cols="12">
                <v-list subheader>
                  <v-subheader>{{ $t('Events') }}</v-subheader>

                  <v-list-item v-for="event in events" :key="event.id">
                    <v-list-item-avatar>
                      <v-img src="https://i.pravatar.cc/64"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  watchQuery: ['q'],

  async fetch({ store, query }) {
    await store.dispatch('search/GET_ALL', query.q)
  },

  data() {
    return {
      searchQuery: this.$route.query.q,
      searchCat: this.$route.query.cat || 'all',
    }
  },

  computed: {
    searchTab: {
      get() {
        return 'tab-' + this.searchCat
      },
      set(v) {
        this.searchCat = v.substr(4)
        this.newSearch()
      },
    },

    queryObject() {
      if (this.searchCat === 'all') {
        return { q: this.searchQuery }
      }
      return { cat: this.searchCat, q: this.searchQuery }
    },

    ...mapState('search', ['users', 'groups', 'pages', 'events']),
  },

  methods: {
    newSearch() {
      this.$router.replace({ query: this.queryObject })
    },
  },

  head() {
    return { title: this.$t('Search') }
  },
}
</script>
