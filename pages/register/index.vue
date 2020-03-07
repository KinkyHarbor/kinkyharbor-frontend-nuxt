<template>
  <v-container fluid>
    <v-row v-if="generalError" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-alert type="error">
          {{ generalError }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-stepper :value="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1">
              Create account
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">Verify mail address</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Time to sail!</v-stepper-step>
          </v-stepper-header>

          <v-stepper-content step="1">
            <h2 class="title my-5">Do you dare to make an account?</h2>

            <v-form
              ref="form"
              v-model="valid"
              method="post"
              @submit.prevent="register"
            >
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                :error-messages="usernameErrors"
                label="Username"
                autofocus
                counter="40"
                maxlength="40"
                @keydown="resetUsernameErrors"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                :error-messages="emailErrors"
                type="email"
                label="Email"
                @keydown="resetEmailErrors"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                :rules="passwordRules"
                :error-messages="passwordErrors"
                name="password"
                label="Password"
                :hint="passwordHint"
                persistent-hint
                counter
                :success-messages="passwordSuccess"
                @click:append="showPass = !showPass"
                @keydown="resetPasswordErrors"
              ></v-text-field>

              <v-divider class="mt-5"></v-divider>

              <header class="mt-5">Legal stuff</header>
              <v-checkbox
                v-model="adult"
                label="I'm 18 or older"
                class="mx-2"
                :rules="mandatoryCheckbox"
              ></v-checkbox>

              <v-checkbox
                v-model="privacyAndTerms"
                class="mx-2"
                :rules="mandatoryCheckbox"
              >
                <template v-slot:label>
                  <div>
                    I agree with the
                    <nuxt-link to="/privacy">privacy policy</nuxt-link>
                    and
                    <nuxt-link to="/terms-and-conditions"
                      >terms and conditions</nuxt-link
                    >
                  </div>
                </template>
              </v-checkbox>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4 my-5"
                type="submit"
                block
                >Register</v-btn
              >
            </v-form>
          </v-stepper-content>

          <v-stepper-content step="2" class="text-center">
            <v-icon size="150px">mdi-pirate</v-icon>
            <p class="py-5">
              Registration successful. Please check your mailbox for a
              verification mail.
            </p>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>

    <v-row v-if="step === 1" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-alert color="grey darken-4">
          <strong>Password tip:</strong> Glue 4 or more words to each other.
          Simple to remember and hard to hack. For example,
          "IReallyLikeKinkyHarbor".
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
      valid: false,
      step: 1,
      generalError: '',
      serverError: false,
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
      passwordHint:
        'Min 8 char (lowercase, uppercase and digit) or 16 characters',
      passwordSuccess: '',
      passwordRules: [
        (password) => {
          this.passwordSuccess = ''

          if (password.length === 0) {
            return this.passwordHint
          }

          if (password.length >= 16) {
            // Password is passphrase
            this.passwordSuccess = 'Strong password'
            return true
          }

          if (password.length < 8) {
            return 'Password is too short. Minimum length is 8.'
          }

          if (!/[a-z]/.test(password)) {
            return 'Password should contain at least one lower case character.'
          }

          if (!/[A-Z]/.test(password)) {
            return 'Password should contain at least one upper case character.'
          }

          if (!/[0-9]/.test(password)) {
            return 'Password should contain at least one digit.'
          }

          // Password is valid
          this.passwordSuccess = 'Strong password'
          return true
        },
      ],
      passwordErrors: [],
      showPass: false,
      adult: false,
      privacyAndTerms: false,
      mandatoryCheckbox: [(v) => Boolean(v)],
    }
  },

  methods: {
    resetUsernameErrors() {
      if (this.serverError) {
        this.usernameErrors = []
        this.$refs.form.validate()
      }
    },

    resetEmailErrors() {
      if (this.serverError) {
        this.emailErrors = []
        this.$refs.form.validate()
      }
    },

    resetPasswordErrors() {
      if (this.serverError) {
        this.passwordErrors = []
        this.$refs.form.validate()
      }
    },

    async register() {
      // Reset errors
      this.generalError = ''
      this.serverError = false
      this.usernameErrors = []
      this.emailErrors = []
      this.passwordErrors = []

      try {
        await this.$axios.post('/auth/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirm: this.password,
        })

        this.step = 2
      } catch (e) {
        if (typeof e.response === 'undefined') {
          // General error
          this.generalError = e.message
        } else if (e.response.status === 409) {
          // Username taken
          this.usernameErrors = ['Username already taken']
          this.serverError = true
        } else {
          // Other error
          const { data } = e.response
          console.log(data)
          this.usernameErrors = data.username ? data.username : []
          this.emailErrors = data.email ? data.email : []
          this.passwordErrors = data.password ? data.password : []
          this.serverError = true
        }
      }
    },
  },

  head() {
    return { title: 'Register' }
  },
}
</script>

<style></style>
