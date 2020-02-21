<template>
  <v-container fluid>
    <v-row v-if="error">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="error">
            {{ error }}<br />
            Is your mail address already validated?
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

              <v-form @submit="login">
                <v-text-field
                  v-model="username"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  counter
                  @click:append="showPass = !showPass"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-4 my-5"
                  @click="login"
                  block
                >
                  Login
                </v-btn>
              </v-form>

              <p>
                Don't have an account?
                <nuxt-link to="/register">Register</nuxt-link>
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
      error: ''
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            login: this.username,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.detail
      }
    }
  },

  head() {
    return { title: 'Login' }
  }
}
</script>

<style></style>
