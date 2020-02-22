<template>
  <v-container fluid>
    <v-row v-if="register">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="success">
            Email validated successfully. <br />
            Please login to finalize registration.
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="reset">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="success">
            Password resetted successfully.
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="error">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="error">
            {{ error }}
            <br />Is your mail address already validated?
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card>
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
export default {
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      showPass: false,
      error: '',
      register: this.$route.query.register,
      reset: this.$route.query.reset,
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            login: this.username,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.detail
        this.register = ''
      }
    },
  },

  head() {
    return { title: 'Login' }
  },
}
</script>

<style></style>
