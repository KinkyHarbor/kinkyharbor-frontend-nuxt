<template>
  <h1>Logout</h1>
</template>

<script>
export default {
  auth: false,

  async asyncData(context) {
    await context.$auth.logout()
    context.redirect(context.app.localePath('/'))
  },
}
</script>
