<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="d-flex justify-center">
        <v-avatar size="100">
          <v-img src="https://i.pravatar.cc/100">
            <template #placeholder>
              <v-skeleton-loader type="image"></v-skeleton-loader>
            </template>
          </v-img>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="text-center">
        <h1>{{ profile.user.display_name }}</h1>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="text-center">
        <p>{{ profile.user.gender || 'Unknown' }} - 20</p>
      </v-col>
    </v-row>

    <v-row v-if="profile.is_self">
      <v-col cols="12" class="text-center">
        <v-btn color="info" nuxt :to="localePath('/profile/edit')">
          EDIT PROFILE
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="isStranger">
      <v-col cols="12" class="text-center">
        <v-btn color="success" nuxt :to="localePath('/profile/edit')">
          BECOME FRIENDS
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!isStranger">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Bio
          </v-card-title>

          <v-card-text>
            {{ profile.user.bio || 'No bio yet' }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-row>
          <v-col class="pt-0">
            <v-card>
              <v-card-title>Photos</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="n in 5"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                    lg="2"
                  >
                    <nuxt-link
                      :to="
                        localePath(
                          '/profile/' +
                            profile.user.username +
                            '/photo/' +
                            String(n)
                        )
                      "
                    >
                      <v-img
                        :src="
                          `https://picsum.photos/500/300?image=${n * 5 + 10}`
                        "
                        :lazy-src="
                          `https://picsum.photos/10/6?image=${n * 5 + 10}`
                        "
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </nuxt-link>
                  </v-col>

                  <v-col cols="4" lg="2">
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-btn
                        icon
                        block
                        tile
                        height="100%"
                        nuxt
                        :to="
                          localePath(
                            '/profile/' + profile.user.username + '/photos/'
                          )
                        "
                        class="text-center"
                      >
                        <v-container fluid>
                          <v-row>
                            <v-col>
                              <v-icon block large>mdi-camera</v-icon>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <p>Show all</p>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Video&apos;s</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="n in 2"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                    lg="2"
                  >
                    <nuxt-link
                      :to="
                        localePath(
                          '/profile/' +
                            profile.user.username +
                            '/photo/' +
                            String(n)
                        )
                      "
                    >
                      <v-img
                        :src="
                          `https://picsum.photos/500/300?image=${n * 5 + 1}`
                        "
                        :lazy-src="
                          `https://picsum.photos/10/6?image=${n * 5 + 1}`
                        "
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </nuxt-link>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Albums</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="n in 3"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                    lg="2"
                  >
                    <nuxt-link
                      :to="
                        localePath(
                          '/profile/' +
                            profile.user.username +
                            '/photo/' +
                            String(n)
                        )
                      "
                    >
                      <v-img
                        :src="
                          `https://picsum.photos/500/300?image=${n * 5 + 7}`
                        "
                        :lazy-src="
                          `https://picsum.photos/10/6?image=${n * 5 + 7}`
                        "
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </nuxt-link>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  asyncData({ params, store, $axios, error }) {
    if (params.user === 'me') {
      return { profile: store.state.auth.user }
    }

    return $axios
      .$get(`/users/${params.user}/`)
      .then((data) => {
        return { profile: data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Profile not found' })
      })
  },

  computed: {
    isStranger() {
      return !this.profile.is_self && !this.profile.is_friend
    },

    title() {
      if (this.profile.is_self) {
        return 'My profile'
      }
      return this.profile.user.display_name
    },

    ...mapState('auth', ['user']),
  },

  head() {
    return { title: this.title }
  },
}
</script>
