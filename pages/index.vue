<template>
  <v-container id="home-container" fluid fill-height>
    <v-row justify="center" align="start">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-icon size="200px">mdi-anchor</v-icon>
        <h1 class="pb-5">Welcome to Harbor!</h1>
        <p class="mb-0">
          Feel free to roam around in our
          <nuxt-link :to="localePath('/about')">about</nuxt-link>
          and
          <nuxt-link :to="localePath('/transparency')">transparency</nuxt-link>
          page.
        </p>
        <p>
          Or jump right in and
          <nuxt-link :to="localePath('/register')">
            create your account</nuxt-link
          >!
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  head() {
    return { title: this.$t('Home') }
  },
  middleware({ app, store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect(app.localePath('/feed'))
    }
  },
}
</script>

<style>
#home-container {
  background-image: url('~assets/harbor.jpg');
  background-size: cover;
  background-position: center bottom;
}
</style>
