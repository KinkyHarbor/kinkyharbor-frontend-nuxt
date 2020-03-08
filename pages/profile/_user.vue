<template>
  <h1>View user {{ user_name }}</h1>
</template>

<script>
export default {
  data() {
    return {
      user_name: this.$route.params.user,
    }
  },

  head() {
    return { title: this.user_name }
  },
}
</script>
