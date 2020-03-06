<template>
  <v-container fluid>
    <v-row v-if="errors">
      <v-col cols="12" sm="8" md="6" lg="4">
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
            >{{ field }}: {{ error }}</v-alert
          >
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="detailError">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row align="center" justify="center">
          <v-alert type="error">{{ detailError }}</v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row align="center" justify="center">
          <v-card min-width="100%">
            <v-card-text class="text-center">
              <h2 class="my-5">Reset your password</h2>

              <v-form @submit.prevent="resetPassword">
                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showPass = !showPass"
                ></v-text-field>

                <v-btn type="submit">Reset password</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
      valid: true,
      password: '',
      showPass: false,
      errors: {},
      detailError: '',
    }
  },

  methods: {
    async resetPassword() {
      try {
        await this.$axios.post('/accounts/reset-password/', {
          user_id: this.$route.query.user_id,
          timestamp: this.$route.query.timestamp,
          signature: this.$route.query.signature,
          password: this.password,
        })

        this.$router.push({ path: '/login', query: { reset: 'success' } })
      } catch (e) {
        if (typeof e.response !== 'undefined') {
          // Server reported error
          const { data } = e.response
          if (data.detail) {
            this.detailError = data.detail
          } else {
            this.errors = data
          }
        } else {
          // General error
          this.detailError = e.message
        }
      }
    },
  },

  head() {
    return { title: 'Reset password' }
  },
}
</script>

<style></style>
