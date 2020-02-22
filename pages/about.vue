<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-icon size="100px">mdi-anchor</v-icon>
      </div>
      <v-card>
        <v-card-title class="headline">About</v-card-title>
        <v-card-text>
          <p>&hellip;</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  head() {
    return { title: 'About' }
  },
}
</script>
