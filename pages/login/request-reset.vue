<template>
  <v-container fluid>
    <v-row v-if="success">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert type="success">
            Password reset verification has been sent, if email exists.
          </v-alert>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card>
            <v-card-text class="text-center">
              <h2 class="my-5">Reset your password</h2>

              <v-form @submit.prevent="requestReset">
                <v-text-field
                  v-model="email"
                  :disabled="success"
                  type="email"
                  label="Email"
                  required
                ></v-text-field>
                <v-btn
                  :disabled="success"
                  color="primary"
                  class="mr-4 my-5"
                  type="submit"
                  block
                >
                  Reset password
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
      email: '',
      error: '',
      success: false,
    }
  },

  methods: {
    async requestReset() {
      try {
        await this.$axios.post('/auth/login/request-password-reset/', {
          email: this.email,
        })

        this.success = true
      } catch (e) {
        this.error = e.response.data.detail
      }
    },
  },

  head() {
    return { title: 'Reset password' }
  },
}
</script>

<style></style>
