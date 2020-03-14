<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            {{ profile.display_name }}
            <v-spacer></v-spacer>
            <v-card-actions v-if="profileIsMe">
              <v-btn text nuxt :to="localePath('/profile/edit')">EDIT</v-btn>
            </v-card-actions>
          </v-card-title>
          <v-card-subtitle>
            {{ profile.gender || 'Unknown' }} - 20
          </v-card-subtitle>
          <v-container fluid>
            <v-row>
              <v-col>
                <h2>Bio</h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>{{ profile.bio || 'No bio yet' }}</p>
              </v-col>
            </v-row>
          </v-container>
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
                          '/profile/' + profile.username + '/photo/' + String(n)
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
                            '/profile/' + profile.username + '/photos/'
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
                          '/profile/' + profile.username + '/photo/' + String(n)
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
                          '/profile/' + profile.username + '/photo/' + String(n)
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
        return { profile: data.user }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Profile not found' })
      })
  },

  computed: {
    profileIsMe() {
      return this.user.username === this.profile.username
    },

    title() {
      if (this.profileIsMe) {
        return 'My profile'
      }
      return this.profile.display_name
    },

    ...mapState('auth', ['user']),
  },

  head() {
    return { title: this.title }
  },
}
</script>
