<template>
  <div class="text-center">
    <h1>{{ $t('Privacy Policy') }}</h1>
    <h2>Coming soon</h2>
  </div>
</template>

<script>
export default {
  auth: false,

  head() {
    return { title: this.$t('Privacy Policy') }
  },
}
</script>
