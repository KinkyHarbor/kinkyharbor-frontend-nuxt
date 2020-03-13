<template>
  <h1>Profile</h1>
</template>

<script>
export default {
  auth: false,

  asyncData(context) {
    context.redirect(context.app.localePath('/profile/me'))
  },
}
</script>
