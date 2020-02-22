<template>
  <h1>Verification failed</h1>
</template>

<script>
export default {
  auth: false,

  async asyncData(context) {
    try {
      await context.$axios.post('/accounts/verify-registration/', {
        user_id: context.route.query.user_id,
        timestamp: context.route.query.timestamp,
        signature: context.route.query.signature,
      })

      context.redirect({ path: '/login', query: { register: 'success' } })
    } catch (e) {
      const { data } = e.response

      const message = data.detail ? data.detail : JSON.stringify(data)

      context.error({
        statusCode: 400,
        message: 'Registration confirmation failed (' + message + ')',
      })
    }
  },
}
</script>
