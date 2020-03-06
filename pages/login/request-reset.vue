<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row align="center" justify="center">
          <v-card min-width="100%">
            <v-card-text class="text-center">
              <h2 class="my-5">Reset your password</h2>

              <v-form @submit.prevent="requestReset">
                <v-text-field
                  v-model="email"
                  type="email"
                  label="Email"
                  required
                ></v-text-field>
                <v-btn color="primary" class="mr-4 my-5" type="submit" block
                  >Reset password</v-btn
                >
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
    }
  },

  methods: {
    async requestReset() {
      try {
        await this.$axios.post('/accounts/send-reset-password-link/', {
          email: this.email,
        })
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
