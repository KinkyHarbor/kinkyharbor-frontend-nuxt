<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-stepper :value="step">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="step > 1"
                >Create account</v-stepper-step
              >
              <v-divider></v-divider>
              <v-stepper-step step="2">Verify mail address</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Time to sail!</v-stepper-step>
            </v-stepper-header>

            <v-stepper-content step="1">
              <h2 class="title my-5">Do you dare to make an account?</h2>

              <v-form method="post" @submit.prevent="register">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  :error-messages="usernameErrors"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :error-messages="emailErrors"
                  type="email"
                  label="Email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  :error-messages="passwordErrors"
                  name="password"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="showPass = !showPass"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-4 my-5"
                  type="submit"
                  block
                  >Register</v-btn
                >
              </v-form>

              <div style="margin-top: 20px">
                Already got an account?
                <nuxt-link to="/login">Login</nuxt-link>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2" class="text-center">
              <v-icon size="150px">mdi-pirate</v-icon>
              <p class="py-5">
                Registration successful. Please check your mailbox for a
                verification mail.
              </p>
            </v-stepper-content>
          </v-stepper>
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
      step: 1,
      username: '',
      usernameRules: [(v) => !!v || 'Name is required'],
      usernameErrors: [],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      emailErrors: [],
      password: '',
      passwordErrors: [],
      showPass: false,
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('/auth/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirm: this.password,
        })

        this.step = 2
      } catch (e) {
        const { data } = e.response
        this.usernameErrors = data.username ? data.username : []
        this.emailErrors = data.email ? data.email : []
        this.passwordErrors = data.password ? data.password : []
      }
    },
  },

  head() {
    return { title: 'Register' }
  },
}
</script>

<style></style>
