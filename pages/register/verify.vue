<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card>
            <v-card-text class="text-center">
              <h1>Verification failed</h1>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="errors">
      <v-col cols="12">
        <v-row
          v-for="(fieldErrors, field) in errors"
          :key="field"
          align="center"
          justify="center"
        >
          <v-alert
            v-for="error in fieldErrors"
            :key="field + error"
            type="error"
          >
            {{ field }}: {{ error }}
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="detailError">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="error">{{ detailError }}</v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-btn to="/">Go home</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,

  async asyncData(context) {
    try {
      await context.$axios.post('/accounts/verify-registration/', {
        user_id: context.route.query.user_id,
        timestamp: context.route.query.timestamp,
        signature: context.route.query.signature
      })

      context.redirect('/login')
    } catch (e) {
      const { data } = e.response
      if (data.detail) {
        return {
          detailError: data.detail,
          errors: {}
        }
      }
      return {
        detailError: '',
        errors: data
      }
    }
  },

  head() {
    return { title: 'Verify mail address' }
  }
}
</script>

<style></style>
