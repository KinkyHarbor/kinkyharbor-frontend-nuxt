<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-icon v-if="error.statusCode === 404" size="300px">
            mdi-map-marker-remove-outline
          </v-icon>
          <v-icon v-else size="300px">mdi-pirate</v-icon>
        </v-row>

        <v-row align="center" justify="center">
          <h1 v-if="error.statusCode === 404">
            No treasure over here &hellip;
          </h1>
          <h1 v-else>
            Wanted: A bad pirate broke the website!
          </h1>
        </v-row>

        <v-row align="center" justify="center">
          <h2 class="my-5">{{ error.message }}</h2>
        </v-row>

        <v-row align="center" justify="center">
          <nuxt-link to="/">
            <v-btn class="my-5">Return Home</v-btn>
          </nuxt-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped></style>
