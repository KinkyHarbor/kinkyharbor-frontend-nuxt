<template>
  <v-container>
    <v-row v-if="generalError" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-alert type="error">
          {{ generalError }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row align="center" justify="center">
          <v-card min-width="100%">
            <v-card-text class="text-center">
              <h2 class="my-5">{{ $t('resetPassword.resetPassword') }}</h2>

              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="resetPassword"
              >
                <v-text-field
                  v-model="password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  :rules="passwordRules"
                  name="password"
                  label="Password"
                  :hint="passwordHint"
                  persistent-hint
                  counter
                  :success-messages="passwordSuccess"
                  @click:append="showPass = !showPass"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-4 my-5"
                  type="submit"
                  block
                  >{{ $t('Reset') }}
                </v-btn>
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
      valid: false,
      password: '',
      passwordHint:
        'Min 8 char (lowercase, uppercase and digit) or 16 characters',
      passwordSuccess: '',
      passwordRules: [this.strongPasswordRule],
      showPass: false,
      generalError: '',
    }
  },

  methods: {
    async resetPassword() {
      try {
        await this.$axios.post('/auth/login/password-reset/', {
          user_id: this.$route.query.user,
          token: this.$route.query.token,
          password: this.password,
        })

        this.$router.replace(
          this.localePath({ path: '/login', query: { reset: 'success' } })
        )
      } catch (e) {
        if (typeof e.response === 'undefined') {
          // General error
          this.generalError = e.message
        } else {
          // Server reported error
          this.valid = false
          this.$refs.form.validate()
        }
      }
    },

    strongPasswordRule(password) {
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
  },

  head() {
    return { title: 'Reset password' }
  },
}
</script>

<style></style>
