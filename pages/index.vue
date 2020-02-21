<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-icon size="100px">mdi-anchor</v-icon>
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to Harbor
        </v-card-title>
        <v-card-text>
          <p>
            Your socially safe heaven &hellip;
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  head() {
    return { title: 'Home' }
  },
  middleware({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect('/feed')
    }
  }
}
</script>
