<template>
  <v-container fluid>
    <v-row v-for="alert in alerts" :key="alert.message">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert :type="alert.type">
            {{ alert.message }}
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row align="center" justify="center">
          <v-card min-width="100%">
            <v-card-text class="text-center">
              <h2 class="my-5">Welcome back!</h2>

              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="username"
                  label="Username or email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  required
                  @click:append="showPass = !showPass"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-4 my-5"
                  type="submit"
                  block
                  >Login</v-btn
                >
              </v-form>

              <p>
                Don't have an account?
                <nuxt-link to="/register">Register</nuxt-link>
              </p>

              <p>
                Forgotten your password?
                <nuxt-link to="/login/request-reset">Reset</nuxt-link>
              </p>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const qs = require('querystring')

export default {
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      showPass: false,
      loginError: '',
      register: this.$route.query.register,
      reset: this.$route.query.reset,
    }
  },

  computed: {
    alerts() {
      const alerts = []

      if (this.register) {
        alerts.push({
          type: 'success',
          message: 'Please login to finalize registration.',
        })
      }

      if (this.reset) {
        alerts.push({
          type: 'success',
          message: 'Password changed successfully.',
        })
      }

      if (this.loginError) {
        alerts.push({
          type: 'error',
          message: this.loginError,
        })
      }

      return alerts
    },
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: qs.stringify({
            grant_type: 'password',
            username: this.username,
            password: this.password,
          }),
        })

        // Redirect to homepage
        this.$router.replace('/')
      } catch (e) {
        // Login failed
        if (typeof e.response === 'undefined') {
          // General error
          this.loginError = e.message
        } else {
          // Server reported error
          this.loginError = e.response.data.detail
        }
        this.register = ''
      }
    },
  },

  head() {
    return { title: 'Login' }
  },
}
</script>
