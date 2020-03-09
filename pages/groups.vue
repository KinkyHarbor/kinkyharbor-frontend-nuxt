<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>{{ this.$t('Groups') }}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head() {
    return { title: this.$t('Groups') }
  },
}
</script>
