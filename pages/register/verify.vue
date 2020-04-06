<template>
  <h1>Verification failed</h1>
</template>

<script>
export default {
  auth: false,

  async asyncData(context) {
    try {
      await context.$axios.post('/auth/register/verify/', {
        token: context.route.query.token,
      })

      context.redirect({ path: '/login', query: { register: 'success' } })
    } catch (e) {
      const { data } = e.response
      const message = data.detail ? data.detail : JSON.stringify(data)
      console.log(message)

      context.error({
        statusCode: 400,
        message: 'Registration confirmation failed (' + message + ')',
      })
    }
  },
}
</script>
